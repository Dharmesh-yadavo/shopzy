import EditPhoneAndRole from "@/components/auth/EditPhoneAndRole";
import {
  getCurrentUser,
  isAdminExist,
} from "@/features/auth/server/auth.queries";

export default async function Home() {
  const user = await getCurrentUser();

  console.log("Current User:", user);

  const isAdmin = await isAdminExist();

  if (!user?.phone || !user?.role || (user.role === "user" && !user?.phone)) {
    return <EditPhoneAndRole isAdmin={isAdmin} />;
  }
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <h1>Hello everyone</h1>
      <h2>{user?.name}</h2>
    </div>
  );
}
