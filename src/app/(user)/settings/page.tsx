import { SecuritySettings } from "@/components/user/SecuritySettings";
import { seetingPageAction } from "@/features/user/user.action";
import { getCurrentUser } from "@/features/auth/auth.queries";
import { redirect } from "next/navigation";
import NotificationSettings from "@/components/user/NotificationSettings";

export default async function SettingsPage() {
  const user = await getCurrentUser();

  if (!user) redirect("/login");

  const res = await seetingPageAction(user.id);

  if (!res) return null;

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-10 text-white">
      <header>
        <h1 className="text-3xl font-black uppercase italic tracking-tighter">
          Settings<span className="text-yellow-400">.</span>
        </h1>
        <p className="text-zinc-500 text-sm">
          Manage your account preferences and security.
        </p>
      </header>

      <div className="grid gap-8">
        {/* Section: Security */}
        <SecuritySettings password={res?.password ?? null} user={user} />

        {/* Section: Notifications */}
        <NotificationSettings user={user} />
      </div>
    </div>
  );
}
