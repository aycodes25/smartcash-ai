import { BrowserRouter, Routes, Route } from "react-router-dom";

import LoginPage from "@/pages/auth/LoginPage";
import DashboardPage from "@/pages/dashboard/DashboardPage";
import UploadPage from "@/pages/upload/UploadPage";
import HistoryPage from "@/pages/history/HistoryPage";
import ReportsPage from "@/pages/reports/ReportsPage";
import SettingsPage from "@/pages/settings/SettingsPage";
import CategoriesPage from "@/pages/categories/CategoriesPage";

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />

        <Route
          path="/dashboard"
          element={<DashboardPage />}
        />

        <Route
          path="/upload"
          element={<UploadPage />}
        />

        <Route
          path="/history"
          element={<HistoryPage />}
        />

        <Route
          path="/reports"
          element={<ReportsPage />}
        />

        <Route
          path="/settings"
          element={<SettingsPage />}
        />

        <Route
          path="/categories"
          element={<CategoriesPage />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;