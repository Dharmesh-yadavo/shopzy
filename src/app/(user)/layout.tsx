import EditPhoneAndRole from "@/components/auth/EditPhoneAndRole";
import { getCurrentUser, isAdminExist } from "@/features/auth/auth.queries";
import { redirect } from "next/navigation";

export default async function UserLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = await getCurrentUser();

  console.log("New Auth.js User", user);

  if (!user) {
    redirect("/login");
  }

  const isAdmin = await isAdminExist();

  if (!user?.phone || !user?.role || (user.role === "user" && !user?.phone)) {
    return <EditPhoneAndRole isAdmin={isAdmin} />;
  }

  return (
    <>
      <section className="">{children}</section>
    </>
  );
}
