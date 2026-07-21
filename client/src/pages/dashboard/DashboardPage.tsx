import AppLayout from "@/layout/AppLayout";
import PageHeader from "@/components/common/PageHeader";
import RecentUploadsTable from "@/components/dashboard/RecentUploadsTable";
import StatCard from "@/components/dashboard/StatCard";

import {
  FileSpreadsheet,
  Wallet,
  Brain,
  Clock3,
} from "lucide-react";

function DashboardPage() {
  return (
    <AppLayout>
      <div className="space-y-8">
        <PageHeader
          title="Dashboard"
          subtitle="Monitor your accounting activities and AI processing."
        />

        <div className="grid grid-cols-4 gap-6">
          <StatCard
            title="Statements"
            value={25}
            icon={<FileSpreadsheet size={28} />}
          />

          <StatCard
            title="Transactions"
            value="18,532"
            icon={<Wallet size={28} />}
            color="bg-green-500"
          />

          <StatCard
            title="AI Accuracy"
            value="98.6%"
            icon={<Brain size={28} />}
            color="bg-purple-500"
          />

          <StatCard
            title="Pending Review"
            value={12}
            icon={<Clock3 size={28} />}
            color="bg-orange-500"
          />
        </div>

        <RecentUploadsTable />
      </div>
    </AppLayout>
  );
}

export default DashboardPage;