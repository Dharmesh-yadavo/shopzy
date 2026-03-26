"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { useState } from "react";
import { updateOrderStatus } from "@/features/vendor/vendor.action";

export const OrdersStatusUpdater = ({
  orderId,
  currentStatus,
}: {
  orderId: string;
  currentStatus: string;
}) => {
  const [loading, setLoading] = useState(false);

  const handleUpdate = async (
    value: "pending" | "confirmed" | "shipped" | "delivered" | "returned",
  ) => {
    setLoading(true);
    const res = await updateOrderStatus(orderId, value);
    if (res.success) {
      toast.success(`Order set to ${value}`);
    } else {
      toast.error("Failed to update status");
    }
    setLoading(false);
  };

  return (
    <Select
      disabled={loading}
      onValueChange={handleUpdate}
      defaultValue={currentStatus}
    >
      <SelectTrigger className="w-32 bg-zinc-900 border-zinc-800 rounded-xl text-zinc-400 font-bold text-[10px] uppercase">
        <SelectValue placeholder="Update" />
      </SelectTrigger>
      <SelectContent className="bg-zinc-900 border-zinc-800 text-white font-bold">
        <SelectItem value="pending">PENDING</SelectItem>
        <SelectItem value="confirmed">CONFIRMED</SelectItem>
        <SelectItem value="shipped">SHIPPED</SelectItem>
        <SelectItem value="delivered">DELIVERED</SelectItem>
      </SelectContent>
    </Select>
  );
};
