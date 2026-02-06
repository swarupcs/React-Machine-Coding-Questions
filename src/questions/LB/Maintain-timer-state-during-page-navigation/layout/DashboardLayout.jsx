import { NavLink, Outlet } from "react-router-dom";
import "../styles/dashboard.css";

export default function DashboardLayout() {
  return (
    <div className="dashboard">
      {/* Sidebar */}
      <aside className="sidebar">
        <h2 className="logo">MyApp</h2>

        <NavLink to="/" end className="nav-item">
          Home
        </NavLink>

        <NavLink to="/about" className="nav-item">
          About
        </NavLink>

        <NavLink to="/settings" className="nav-item">
          Settings
        </NavLink>
      </aside>

      {/* Main Content */}
      <main className="content">
        <Outlet />
      </main>
    </div>
  );
}
