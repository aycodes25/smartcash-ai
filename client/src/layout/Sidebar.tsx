function Sidebar() {
  return (
    <aside className="w-64 bg-slate-900 text-white h-screen p-5">
      <h1 className="text-2xl font-bold">
        SmartCash AI
      </h1>

      <nav className="mt-10">
        <ul className="space-y-4">
          <li>Dashboard</li>
          <li>Upload Statement</li>
          <li>History</li>
          <li>Categories</li>
          <li>Reports</li>
          <li>Settings</li>
        </ul>
      </nav>
    </aside>
  );
}

export default Sidebar;