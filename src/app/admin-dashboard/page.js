import dynamic from "next/dynamic";

const AdminApp = dynamic(() => import("@/pages/adminDashboard/AdminApp"), {
  ssr: false,
  loading: () => <p>Loading...</p>
});

const AdminDashboard = () => {
  return <AdminApp />;
}

export default AdminDashboard;
