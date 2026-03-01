import { getCurrentUser } from "@/features/auth/server/auth.queries";

export default async function Home() {
  const user = await getCurrentUser();

  console.log("Current User:", user);
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <h1>Hello everyone</h1>
    </div>
  );
}
