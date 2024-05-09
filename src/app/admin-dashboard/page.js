import { NextPage } from "next";
import dynamic from "next/dynamic";
const AdminApp = dynamic(() => import("@/pages/adminDashboard/AdminApp"), { ssr: false });

export default function AdminDashboard() {
  return <AdminApp />;
}
