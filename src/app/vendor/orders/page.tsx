import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Clock, CheckCircle2, Filter, ArrowUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const OrdersPage = () => {
  const orders = [
    {
      id: "#bc88c154",
      buyer: "Ankush Sahu",
      phone: "9876543210",
      product: "LG Smart Choice, Washing Machine × 1",
      payment: "STRIPE",
      payStatus: "PAID",
      status: "PENDING",
    },
    {
      id: "#44c22cf2",
      buyer: "Ankush Sahu",
      phone: "9876432108",
      product: "LG 4K Ultra HD Smart QNED AI TV × 2",
      payment: "STRIPE",
      payStatus: "PAID",
      status: "SHIPPED",
    },
  ];

  return (
    // CHANGE: Use h-fit to make the container only as tall as its content
    <div className="flex flex-col w-full h-fit bg-[#09090b] text-white p-8 space-y-6">
      {/* Header section remains shrink-0 */}
      <div className="flex justify-between items-center shrink-0">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-white">
            Vendor Orders
          </h1>
          <p className="text-zinc-500 text-sm">
            Track and manage your customer fulfillments.
          </p>
        </div>
      </div>

      {/* Filter Bar matching the reference UI */}
      <div className="flex items-center justify-between p-4 bg-zinc-900/40 border border-zinc-800 rounded-xl">
        <div className="flex gap-2">
          <Button
            variant="outline"
            className="bg-zinc-800 border-zinc-700 text-white hover:bg-zinc-700"
          >
            <Filter className="mr-2 h-4 w-4" /> Filter
          </Button>
          <Button
            variant="outline"
            className="bg-zinc-800 border-zinc-700 text-white hover:bg-zinc-700"
          >
            <ArrowUpDown className="mr-2 h-4 w-4" /> Sort: Newest
          </Button>
        </div>
        <span className="text-zinc-500 text-xs font-medium">
          Showing <span className="text-white">24</span> of{" "}
          <span className="text-white">128</span> products
        </span>
      </div>

      <div className="h-fit rounded-2xl border border-zinc-800 bg-zinc-900/20 overflow-hidden shadow-2xl">
        <Table className="w-full border-collapse">
          <TableHeader className="bg-zinc-900/60">
            <TableRow className="border-zinc-800 hover:bg-transparent">
              <TableHead className="text-zinc-500 font-bold py-6 px-8 uppercase text-[10px] tracking-widest">
                Order
              </TableHead>
              <TableHead className="text-zinc-500 font-bold py-6 uppercase text-[10px] tracking-widest">
                Buyer
              </TableHead>
              <TableHead className="text-zinc-500 font-bold py-6 uppercase text-[10px] tracking-widest">
                Products
              </TableHead>
              <TableHead className="text-zinc-500 font-bold py-6 uppercase text-[10px] tracking-widest text-center">
                Payment
              </TableHead>
              <TableHead className="text-zinc-500 font-bold py-6 uppercase text-[10px] tracking-widest text-center">
                Status
              </TableHead>
              <TableHead className="text-zinc-500 font-bold py-6 uppercase text-[10px] tracking-widest text-center">
                Update
              </TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {orders.map((order) => (
              <TableRow
                key={order.id}
                className="border-zinc-800/50 hover:bg-zinc-800/40 transition-all group"
              >
                <TableCell className="py-8 px-8 font-mono text-amber-400 font-bold">
                  {order.id}
                </TableCell>

                <TableCell className="py-8">
                  <div className="flex flex-col">
                    <span className="font-bold text-zinc-100 group-hover:text-amber-400 transition-colors">
                      {order.buyer}
                    </span>
                    <span className="text-xs text-zinc-500 mt-1">
                      {order.phone}
                    </span>
                  </div>
                </TableCell>

                <TableCell className="py-8 max-w-[320px]">
                  <span className="text-sm text-zinc-300 font-medium leading-relaxed">
                    {order.product}
                  </span>
                </TableCell>

                <TableCell className="py-8 text-center">
                  <div className="flex flex-col items-center gap-1">
                    <span className="text-[11px] font-black text-white">
                      {order.payment}
                    </span>
                    <span className="text-[10px] text-green-500 font-black tracking-tighter">
                      PAID
                    </span>
                  </div>
                </TableCell>

                <TableCell className="py-8 text-center">
                  <Badge
                    variant="outline"
                    className={cn(
                      "px-4 py-1.5 font-bold text-[10px] tracking-widest rounded-full border",
                      order.status === "PENDING"
                        ? "bg-amber-400/5 text-amber-400 border-amber-400/30"
                        : "bg-green-500/5 text-green-500 border-green-500/30",
                    )}
                  >
                    {order.status === "PENDING" ? (
                      <Clock className="h-3 w-3 mr-2" />
                    ) : (
                      <CheckCircle2 className="h-3 w-3 mr-2" />
                    )}
                    {order.status}
                  </Badge>
                </TableCell>

                <TableCell className="py-8">
                  <div className="flex justify-center">
                    <Select defaultValue="pending">
                      <SelectTrigger className="w-28">
                        <SelectValue placeholder="Status" />
                      </SelectTrigger>
                      <SelectContent className="bg-zinc-900 border-zinc-800 text-white">
                        <SelectGroup>
                          <SelectItem value="pending">Pending</SelectItem>
                          <SelectItem value="shipped">Shipped</SelectItem>
                          <SelectItem value="delivered">Delivered</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
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
