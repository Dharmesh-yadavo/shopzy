import ChatClient from "@/components/user/ChatClient";
import { getCurrentUser } from "@/features/auth/auth.queries";
import { getSupportUsers } from "@/features/user/user.query";
import { redirect } from "next/navigation";

const page = async () => {
  const user = await getCurrentUser();

  if (!user) return redirect("/login");

  const data = await getSupportUsers(user?.id, user?.role);

  if (!data) return [];

  console.log("DATA", data);

  return (
    <div>
      <ChatClient supportUsers={data} currentUserId={user?.id} />
    </div>
  );
};

export default page;
