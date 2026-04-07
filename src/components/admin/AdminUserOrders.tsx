"use client";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

// 1. Updated Interface to match your actual JSX usage
interface OrderDataType {
  id: string;
  actualOrderId: string;
  buyer: { name: string; phone: string };
  vendor: {
    name: string;
    email: string;
  };
  buyerId: string;
  product: string;
  total: number;
  payment: "stripe" | "cod";
  status:
    | "pending"
    | "confirmed"
    | "shipped"
    | "delivered"
    | "returned"
    | "cancelled";
  date: Date;
}

export const AdminUserOrders = ({
  orderData,
}: {
  orderData: OrderDataType[];
}) => {
  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "returned":
        return "text-orange-500";
      case "shipped":
        return "text-blue-500";
      case "pending":
        return "text-amber-500";
      case "delivered":
        return "text-emerald-500";
      case "cancelled":
        return "text-red-500";
      case "confirmed":
        return "text-yellow-300";
      default:
        return "text-zinc-400";
    }
  };

  return (
    <div className="flex flex-col w-full h-fit bg-[#000000] text-white p-8 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold tracking-tight">All Orders</h1>
        <span className="text-zinc-400 text-sm">{orderData.length} orders</span>
      </div>

      <div className="rounded-xl border border-zinc-800 bg-zinc-900/20 overflow-hidden shadow-2xl">
        <Table className="w-full">
          <TableHeader className="bg-zinc-900/40">
            <TableRow className="border-zinc-800 hover:bg-transparent">
              {[
                "Order ID",
                "Buyer",
                "Vendor",
                "Products",
                "Amount",
                "Payment",
                "Status",
                "Date",
              ].map((head) => (
                <TableHead
                  key={head}
                  className="text-zinc-400 font-bold py-5 px-6 text-[12px]"
                >
                  {head}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>

          <TableBody>
            {orderData.map((order) => (
              <TableRow
                key={order.id}
                className="border-zinc-800/50 hover:bg-zinc-800/20 transition-all"
              >
                <TableCell className="py-6 px-6 font-medium text-zinc-300">
                  #{order.id.slice(-6)} {/* Shorten ID for cleaner UI */}
                </TableCell>

                <TableCell className="py-6">
                  <div className="flex flex-col">
                    <span className="font-bold text-zinc-100">
                      {order.buyer.name}
                    </span>
                    <span className="text-[10px] text-zinc-500">
                      {order.buyer.phone}
                    </span>
                  </div>
                </TableCell>

                <TableCell className="py-6">
                  <div className="flex flex-col">
                    <span className="font-bold text-zinc-100">
                      {order.vendor.name}
                    </span>
                    <span className="text-[10px] text-zinc-500">
                      {order.vendor.email}
                    </span>
                  </div>
                </TableCell>

                <TableCell className="py-6 max-w-62.5">
                  <span className="text-xs text-zinc-300 leading-relaxed line-clamp-2">
                    {order.product.length > 20
                      ? order.product.slice(0, 20) + "..."
                      : order.product}
                  </span>
                </TableCell>

                <TableCell className="py-6 font-bold text-emerald-400">
                  ₹{order.total.toLocaleString()}
                </TableCell>

                <TableCell className="py-6">
                  <span className="font-bold text-zinc-100 text-[15px] uppercase">
                    {order.payment}
                  </span>
                </TableCell>

                <TableCell
                  className={`py-6 font-bold text-xs uppercase ${getStatusColor(
                    order.status,
                  )}`}
                >
                  {order.status}
                </TableCell>

                <TableCell className="py-6 text-zinc-400 text-xs">
                  {/* Handle Date formatting if it's a string or Date object */}
                  {new Date(order.date).toLocaleDateString()}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};
