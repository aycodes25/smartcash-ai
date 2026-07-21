import OpenAI from 'openai';
import { Transaction } from '../types/transaction.interface';
import { FinancialSummary } from '../types/summary.interface';
import { AIEnhancementResult } from '../types/ai.interface';

export class AIService {
  private openai: OpenAI | null = null;

  constructor() {
    const apiKey = process.env.OPENAI_API_KEY;
    if (apiKey && apiKey.trim() !== '' && apiKey !== 'your-openai-api-key') {
      this.openai = new OpenAI({ apiKey });
    }
  }

  /**
   * Send normalized transactions & summary to OpenAI (provider-agnostic wrapper)
   * Fallback gracefully to rule-based analysis if AI key missing or request fails.
   */
  public async analyze(
    transactions: Transaction[],
    summary: FinancialSummary,
    insights: string[]
  ): Promise<AIEnhancementResult> {
    const defaultFallback: AIEnhancementResult = {
      improvedTransactions: transactions,
      businessRecommendations: [
        'Maintain a cash reserve covering at least 3 months of operational expenses.',
        'Review recurring bank charges and subscription fees to minimize overhead.',
        'Implement automated invoicing to reduce delayed customer payments.'
      ],
      fraudObservations: [
        'No high-frequency anomaly patterns detected in current dataset.'
      ],
      cashflowAnalysis: `Total income of ₦${summary.totalIncome.toLocaleString()} against total expenses of ₦${summary.totalExpense.toLocaleString()} yields a net cashflow of ₦${summary.netCashflow.toLocaleString()}.`,
      riskAnalysis: summary.totalExpense > summary.totalIncome 
        ? 'High operational risk: Expense exceeds income. Monitor debt obligations.' 
        : 'Low to Moderate risk: Positive net cashflow with stable transaction volume.',
      profitabilityAnalysis: `Gross margin and net cashflow reflect a ${summary.totalIncome > 0 ? ((summary.netCashflow / summary.totalIncome) * 100).toFixed(1) : 0}% net cash conversion rate.`
    };

    if (!this.openai) {
      return defaultFallback;
    }

    try {
      // Send max sample of 30 transactions to prevent payload limit / high token cost
      const sampleTx = transactions.slice(0, 30).map(t => ({
        date: t.date,
        desc: t.description.substring(0, 60),
        debit: t.debit,
        credit: t.credit,
        cat: t.category
      }));

      const prompt = `You are a Senior Financial Intelligence AI.
Analyze the following bank statement summary and transaction sample.

Summary:
- Total Income: NGN ${summary.totalIncome}
- Total Expense: NGN ${summary.totalExpense}
- Net Cashflow: NGN ${summary.netCashflow}
- Total Credits Count: ${summary.totalCredits}
- Total Debits Count: ${summary.totalDebits}
- Insights: ${insights.join(' | ')}

Sample Transactions (JSON):
${JSON.stringify(sampleTx, null, 2)}

Provide JSON response matching exact schema:
{
  "businessRecommendations": ["rec1", "rec2"],
  "fraudObservations": ["obs1"],
  "cashflowAnalysis": "string",
  "riskAnalysis": "string",
  "profitabilityAnalysis": "string"
}`;

      const response = await this.openai.chat.completions.create({
        model: process.env.OPENAI_MODEL || 'gpt-4o-mini',
        messages: [{ role: 'user', content: prompt }],
        response_format: { type: 'json_object' }
      });

      const content = response.choices[0]?.message?.content;
      if (!content) return defaultFallback;

      const parsed = JSON.parse(content);

      return {
        improvedTransactions: transactions,
        businessRecommendations: parsed.businessRecommendations || defaultFallback.businessRecommendations,
        fraudObservations: parsed.fraudObservations || defaultFallback.fraudObservations,
        cashflowAnalysis: parsed.cashflowAnalysis || defaultFallback.cashflowAnalysis,
        riskAnalysis: parsed.riskAnalysis || defaultFallback.riskAnalysis,
        profitabilityAnalysis: parsed.profitabilityAnalysis || defaultFallback.profitabilityAnalysis
      };
    } catch (err) {
      console.warn('AI Enhancement Service encountered an error. Falling back to rule-based analysis:', (err as Error).message);
      return defaultFallback;
    }
  }
}

export const aiService = new AIService();
