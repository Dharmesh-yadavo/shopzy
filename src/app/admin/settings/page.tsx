import AdminSettings from "@/components/admin/AdminSettings";
import { getCurrentUser } from "@/features/auth/auth.queries";
import { redirect } from "next/navigation";

const AdminSettingsPage = async () => {
  const user = await getCurrentUser();

  if (!user) redirect("/login");

  return <AdminSettings user={user} />;
};

export default AdminSettingsPage;
