import type { ReactNode } from "react";

interface StatCardProps {
  title: string;
  value: string | number;
  icon: ReactNode;
  color?: string;
}

function StatCard({
  title,
  value,
  icon,
  color = "bg-blue-500",
}: StatCardProps) {
  return (
    <div className="bg-white rounded-xl shadow-sm border p-5">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-500 text-sm">
            {title}
          </p>

          <h2 className="text-3xl font-bold mt-2">
            {value}
          </h2>
        </div>

        <div
          className={`${color} p-4 rounded-lg text-white`}
        >
          {icon}
        </div>
      </div>
    </div>
  );
}

export default StatCard;