import React from 'react';
import type { AIEnhancementResult } from '../../types';
import { Bot, AlertTriangle, Lightbulb, TrendingUp, ShieldAlert } from 'lucide-react';

interface AIInsightsPanelProps {
  aiEnhancements: AIEnhancementResult | null;
  insights: string[];
}

export const AIInsightsPanel: React.FC<AIInsightsPanelProps> = ({ aiEnhancements, insights }) => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-purple-500/10 border border-purple-500/20 text-purple-400">
            <Bot className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white">AI Executive Intelligence & Observations</h3>
            <p className="text-xs text-slate-400">Financial recommendations and risk observations</p>
          </div>
        </div>
      </div>

      {/* Human Insights */}
      {insights && insights.length > 0 && (
        <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800">
          <h4 className="text-xs font-semibold text-indigo-400 uppercase tracking-wider mb-3 flex items-center gap-2">
            <Lightbulb className="w-4 h-4" />
            Key Statement Highlights
          </h4>
          <ul className="space-y-2 text-sm text-slate-300">
            {insights.map((item, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="text-indigo-400 font-bold">•</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* AI Recommendations */}
      {aiEnhancements && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800">
            <h4 className="text-xs font-semibold text-emerald-400 uppercase tracking-wider mb-3 flex items-center gap-2">
              <TrendingUp className="w-4 h-4" />
              Strategic Business Recommendations
            </h4>
            <ul className="space-y-2 text-sm text-slate-300">
              {aiEnhancements.businessRecommendations.map((rec, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold">✓</span>
                  <span>{rec}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800">
            <h4 className="text-xs font-semibold text-amber-400 uppercase tracking-wider mb-3 flex items-center gap-2">
              <ShieldAlert className="w-4 h-4" />
              Fraud & Risk Observations
            </h4>
            <ul className="space-y-2 text-sm text-slate-300">
              {aiEnhancements.fraudObservations.map((obs, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <span>{obs}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};
