"use client";
import React, { useState } from "react";
import { Lock, Loader2 } from "lucide-react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { toast } from "sonner";
import { updatePasswordAction } from "@/features/user/user.action";

interface UserType {
  id: string;
}

export const SecuritySettings = ({
  password,
  user,
}: {
  password: string | null;
  user: UserType;
}) => {
  const [loading, setLoading] = useState(false);
  const hasPassword = !!password;

  const handlePasswordSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const oldPassword = formData.get("oldPassword") as string;
    const newPassword = formData.get("newPassword") as string;
    const confirmPassword = formData.get("confirmPassword") as string;

    if (newPassword !== confirmPassword) {
      return toast.error("Passwords do not match");
    }

    setLoading(true);
    const res = await updatePasswordAction({
      userId: user.id,
      oldPassword,
      newPassword,
    });

    if (res?.status === "success") {
      toast.success(res.message);
      (e.target as HTMLFormElement).reset();
    } else {
      toast.error(res?.message);
    }
    setLoading(false);
  };

  return (
    <section className="bg-zinc-900/10 border border-zinc-800/60 rounded-[2rem] p-6 md:p-8 space-y-6">
      <div className="flex items-center justify-between border-b border-zinc-800/50 pb-4">
        <div className="flex items-center gap-3">
          <Lock className="text-yellow-400" size={20} />
          <h2 className="font-bold uppercase tracking-widest text-[10px]">
            {hasPassword ? "Change Password" : "Create Password"}
          </h2>
        </div>
        {!hasPassword && (
          <span className="text-[9px] bg-yellow-400/10 text-yellow-500 px-2 py-1 rounded-md font-bold uppercase tracking-tighter">
            Linked via Google
          </span>
        )}
      </div>

      <form onSubmit={handlePasswordSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Only show Old Password if user already has one */}
          {hasPassword && (
            <div className="space-y-2 md:col-span-2">
              <label className="text-[9px] font-black text-zinc-500 uppercase tracking-widest px-1">
                Current Password
              </label>
              <Input
                name="oldPassword"
                type="password"
                required
                placeholder="••••••••"
                className="bg-zinc-950/50 border-zinc-800 focus:border-yellow-400/50 h-12 rounded-xl"
              />
            </div>
          )}

          <div className="space-y-2">
            <label className="text-[9px] font-black text-zinc-500 uppercase tracking-widest px-1">
              New Password
            </label>
            <Input
              name="newPassword"
              type="password"
              required
              placeholder="••••••••"
              className="bg-zinc-950/50 border-zinc-800 focus:border-yellow-400/50 h-12 rounded-xl"
            />
          </div>

          <div className="space-y-2">
            <label className="text-[9px] font-black text-zinc-500 uppercase tracking-widest px-1">
              Confirm New Password
            </label>
            <Input
              name="confirmPassword"
              type="password"
              required
              placeholder="••••••••"
              className="bg-zinc-950/50 border-zinc-800 focus:border-yellow-400/50 h-12 rounded-xl"
            />
          </div>
        </div>

        <div className="flex justify-end">
          <Button
            disabled={loading}
            className="bg-yellow-400 hover:bg-yellow-500 text-black font-black uppercase tracking-widest text-[10px] px-8 py-6 rounded-xl transition-all"
          >
            {loading ? (
              <Loader2 className="animate-spin" />
            ) : hasPassword ? (
              "Update Password"
            ) : (
              "Set Password"
            )}
          </Button>
        </div>
      </form>
    </section>
  );
};
