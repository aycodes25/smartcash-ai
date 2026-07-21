import { Eye } from "lucide-react";

const uploads = [
  {
    id: 1,
    file: "Zenith_May_2026.xlsx",
    status: "Completed",
    date: "Today",
  },
  {
    id: 2,
    file: "GTBank_April_2026.xlsx",
    status: "Processing",
    date: "Yesterday",
  },
  {
    id: 3,
    file: "Access_March_2026.xlsx",
    status: "Completed",
    date: "2 days ago",
  },
];

function RecentUploadsTable() {
  return (
    <div className="bg-white rounded-xl border shadow-sm">
      <div className="border-b p-5">
        <h2 className="text-lg font-semibold">
          Recent Uploads
        </h2>
      </div>

      <table className="w-full">
        <thead className="bg-gray-50">
          <tr>
            <th className="text-left p-4">
              File Name
            </th>

            <th className="text-left p-4">
              Status
            </th>

            <th className="text-left p-4">
              Date
            </th>

            <th className="text-left p-4">
              Action
            </th>
          </tr>
        </thead>

        <tbody>
          {uploads.map((upload) => (
            <tr
              key={upload.id}
              className="border-t"
            >
              <td className="p-4">
                {upload.file}
              </td>

              <td className="p-4">
                {upload.status}
              </td>

              <td className="p-4">
                {upload.date}
              </td>

              <td className="p-4">
                <button className="flex items-center gap-2 text-blue-600 hover:text-blue-800">
                  <Eye size={18} />
                  View
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default RecentUploadsTable;