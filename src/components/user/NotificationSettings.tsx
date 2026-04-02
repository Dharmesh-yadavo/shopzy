"use client";
import { useState } from "react";
import { Switch } from "../ui/switch";
import { Bell, Loader2 } from "lucide-react";
import { updateUserNotifications } from "@/features/user/user.action";
import { toast } from "sonner";

interface UserType {
  id: string;
  orderNotification: boolean | null;
  promotionalEmails: boolean | null;
}

const NotificationSettings = ({ user }: { user: UserType }) => {
  const [order, setOrder] = useState(user.orderNotification || false);
  const [promotions, setPromotions] = useState(user.promotionalEmails || false);
  const [loading, setLoading] = useState<string | null>(null);

  const handleToggle = async (
    type: "order" | "promo",
    currentValue: boolean,
  ) => {
    const newValue = !currentValue;

    // Optimistic UI update
    if (type === "order") setOrder(newValue);
    else setPromotions(newValue);

    setLoading(type);

    const res = await updateUserNotifications(
      user.id,
      type === "order" ? newValue : undefined,
      type === "promo" ? newValue : undefined,
    );

    if (!res) {
      // Revert if failed
      if (type === "order") setOrder(currentValue);
      else setPromotions(currentValue);
    }

    setLoading(null);
  };

  return (
    <section className="bg-zinc-900/10 border border-zinc-800/60 rounded-[2rem] p-8 space-y-6">
      <div className="flex items-center gap-3 border-b border-zinc-800 pb-4">
        <Bell className="text-yellow-400" size={20} />
        <h2 className="font-bold uppercase tracking-widest text-[10px]">
          Notifications
        </h2>
      </div>

      <div className="space-y-6">
        {/* Order Status */}
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <p className="text-sm font-bold">Order Status</p>
            <p className="text-xs text-zinc-500 max-w-65">
              Get notified when your order is confirmed or shipped.
            </p>
          </div>
          <div className="flex items-center gap-3">
            {loading === "order" && (
              <Loader2 size={14} className="animate-spin text-zinc-500" />
            )}
            <Switch
              checked={order}
              onCheckedChange={() => handleToggle("order", order)}
              disabled={!!loading}
              className="data-[state=checked]:bg-yellow-400"
            />
          </div>
        </div>

        {/* Promotional Emails */}
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <p className="text-sm font-bold">Promotional Emails</p>
            <p className="text-xs text-zinc-500 max-w-[250px]">
              Stay updated on Shopzy Elite sales and events.
            </p>
          </div>
          <div className="flex items-center gap-3">
            {loading === "promo" && (
              <Loader2 size={14} className="animate-spin text-zinc-500" />
            )}
            <Switch
              checked={promotions}
              onCheckedChange={() => handleToggle("promo", promotions)}
              disabled={!!loading}
              className="data-[state=checked]:bg-yellow-400"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default NotificationSettings;
