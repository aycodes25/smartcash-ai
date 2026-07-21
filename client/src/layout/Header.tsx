import { useNavigate } from "react-router-dom";

import { logout } from "@/services/auth.service";
import { useAuth } from "@/auth/AuthContext";

function Header() {
  const navigate = useNavigate();

  const { session } = useAuth();

  async function handleLogout() {
    const { error } = await logout();

    if (!error) {
      navigate("/login");
    }
  }

  return (
    <header className="flex h-16 items-center justify-between border-b bg-white px-8">
      <h2 className="text-xl font-semibold">
        Dashboard
      </h2>

      <div className="flex items-center gap-4">
        <span className="text-sm text-slate-600">
          {session?.user.email}
        </span>

        <button
          onClick={handleLogout}
          className="rounded-md bg-red-500 px-4 py-2 text-white hover:bg-red-600"
        >
          Logout
        </button>
      </div>
    </header>
  );
}

export default Header;