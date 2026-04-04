import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Clock, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { getVendorsOrders } from "@/features/vendor/vendor.queries";
import { OrdersStatusUpdater } from "@/components/vendor/OrdersStatusUpdater";

const OrdersPage = async () => {
  const orders = await getVendorsOrders();

  console.log("Total Orders: ", orders);

  return (
    <div className="flex flex-col w-full h-fit bg-[#09090b] text-white p-6 md:p-10 space-y-8">
      {/* Header Section */}
      <div className="flex flex-col  md:flex-row items-start md:items-center gap-4">
        <div>
          <h1 className="text-4xl font-black uppercase italic tracking-tighter text-amber-400">
            Vendor <span className="text-white">Orders</span>
          </h1>
          <p className="text-zinc-500 text-sm font-medium uppercase tracking-widest mt-1">
            Fulfillment Dashboard • {orders?.length || 0} active requests
          </p>
        </div>
      </div>

      <div className="rounded-[32px] border border-zinc-800 bg-[#111113] overflow-hidden shadow-2xl">
        <Table>
          <TableHeader className="bg-zinc-900/60">
            <TableRow className="border-zinc-800 hover:bg-transparent">
              <TableHead className="text-zinc-500 font-bold py-6 px-8 uppercase text-[10px] tracking-[2px]">
                Order Ref
              </TableHead>
              <TableHead className="text-zinc-500 font-bold py-6 uppercase text-[10px] tracking-[2px]">
                Buyer Details
              </TableHead>
              <TableHead className="text-zinc-500 font-bold py-6 uppercase text-[10px] tracking-[2px]">
                Product Summary
              </TableHead>
              <TableHead className="text-zinc-500 font-bold py-6 uppercase text-[10px] tracking-[2px] text-center">
                Earnings
              </TableHead>
              <TableHead className="text-zinc-500 font-bold py-6 uppercase text-[10px] tracking-[2px] text-center">
                Live Status
              </TableHead>
              <TableHead className="text-zinc-500 font-bold py-6 uppercase text-[10px] tracking-[2px] text-center">
                Actions
              </TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {orders?.map((order) => (
              <TableRow
                key={order.id}
                className="border-zinc-800/50 hover:bg-zinc-800/20 transition-all group"
              >
                <TableCell className="py-8 px-8 font-mono text-amber-400/70 font-bold text-xs">
                  #{order.id.slice(-8).toUpperCase()}
                </TableCell>

                <TableCell className="py-8">
                  <div className="flex flex-col">
                    <span className="font-bold text-zinc-100 group-hover:text-amber-400 transition-colors">
                      {order.buyer}
                    </span>
                    <span className="text-[10px] font-black text-zinc-600 mt-1 uppercase tracking-tighter">
                      PH: {order.phone}
                    </span>
                  </div>
                </TableCell>

                <TableCell className="py-8 max-w-70">
                  <div className="flex items-start gap-3">
                    <span className="text-xs text-zinc-300 font-bold leading-tight line-clamp-2">
                      {order.product}
                    </span>
                  </div>
                </TableCell>

                <TableCell className="py-8 text-center">
                  <p className="text-lg font-black text-green-400 italic">
                    ₹{order.total.toLocaleString()}
                  </p>
                  <p className="text-[9px] text-zinc-600 font-black uppercase">
                    {order.payment}
                  </p>
                </TableCell>

                <TableCell className="py-8 text-center">
                  <Badge
                    variant="outline"
                    className={cn(
                      "px-4 py-1.5 font-black text-[9px] tracking-[1.5px] rounded-full border italic uppercase",
                      order.status === "pending"
                        ? "bg-amber-400/5 text-amber-400 border-amber-400/20"
                        : "bg-green-500/5 text-green-500 border-green-500/20",
                    )}
                  >
                    {order.status === "pending" ? (
                      <Clock className="h-3 w-3 mr-2" />
                    ) : (
                      <CheckCircle2 className="h-3 w-3 mr-2" />
                    )}
                    {order.status}
                  </Badge>
                </TableCell>

                <TableCell className="py-8">
                  <div className="flex justify-center">
                    <OrdersStatusUpdater
                      orderId={order.actualOrderId}
                      currentStatus={order.status.toLowerCase()}
                    />
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default OrdersPage;
