import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const AdminOrdersPage = () => {
  const orderData = [
    {
      id: "bc88c154",
      buyer: { name: "Ankush Sahu", phone: "9876543210" },
      vendor: { name: "LG Electronics", email: "Problemgamer2502@Gmail.Com" },
      products: "LG Smart Choice, Washing Machine × 1",
      amount: 38030,
      payment: { method: "STRIPE", status: "Paid" },
      status: "Returned",
      date: "28 Dec 2025",
    },
    {
      id: "44c22cf2",
      buyer: { name: "Ankush Sahu", phone: "9876432108" },
      vendor: { name: "LG Electronics", email: "Problemgamer2502@Gmail.Com" },
      products: "LG 4K Ultra HD Smart QNED AI TV, QNED82T ( 65 inch ) × 2",
      amount: 142830,
      payment: { method: "STRIPE", status: "Paid" },
      status: "Shipped",
      date: "28 Dec 2025",
    },
    {
      id: "a5a406f1",
      buyer: { name: "Ankush Sahu", phone: "98765432110" },
      vendor: { name: "LG Electronics", email: "Problemgamer2502@Gmail.Com" },
      products: "LG 4K Ultra HD Smart QNED AI TV, QNED82T ( 65 inch ) × 2",
      amount: 142830,
      payment: { method: "STRIPE", status: "Pending" },
      status: "Pending",
      date: "28 Dec 2025",
    },
    {
      id: "4e00f825",
      buyer: { name: "Ankush Sahu", phone: "1234567890" },
      vendor: { name: "SAMSUNG", email: "Samsung@Gmail.Com" },
      products: "Samsung Galaxy S25 Ultra 5G × 1",
      amount: 142029,
      payment: { method: "STRIPE", status: "Paid" },
      status: "Pending",
      date: "22 Dec 2025",
    },
  ];

  // Helper for status colors
  const getStatusColor = (status: string) => {
    switch (status) {
      case "Returned":
        return "text-orange-500";
      case "Shipped":
        return "text-blue-500";
      case "Pending":
        return "text-amber-500";
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
                {/* Order ID */}
                <TableCell className="py-6 px-6 font-medium text-zinc-300">
                  #{order.id}
                </TableCell>

                {/* Buyer */}
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

                {/* Vendor */}
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

                {/* Products */}
                <TableCell className="py-6 max-w-63">
                  <span className="text-xs text-zinc-300 leading-relaxed">
                    {order.products}
                  </span>
                </TableCell>

                {/* Amount */}
                <TableCell className="py-6 font-bold text-emerald-400">
                  ₹ {order.amount}
                </TableCell>

                {/* Payment */}
                <TableCell className="py-6">
                  <div className="flex flex-col">
                    <span className="font-bold text-zinc-100 text-[11px]">
                      {order.payment.method}
                    </span>
                    <span
                      className={`text-[10px] ${order.payment.status === "Paid" ? "text-emerald-500" : "text-amber-500"}`}
                    >
                      {order.payment.status}
                    </span>
                  </div>
                </TableCell>

                {/* Status */}
                <TableCell
                  className={`py-6 font-bold text-xs ${getStatusColor(order.status)}`}
                >
                  {order.status}
                </TableCell>

                {/* Date */}
                <TableCell className="py-6 text-zinc-400 text-xs">
                  {order.date}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default AdminOrdersPage;
