import { Outlet } from "react-router-dom";
import AppNavbar from "../components/AppNavbar";

export default function AdminLayout() {
  return (
    <>
      <AppNavbar />
      <main className="container py-4">
        <Outlet />
      </main>
    </>
  );
}
