import { OrdersComp } from "@/components/user/OrdersComp";
import { getAllOrders } from "@/features/user/user.query";

const Orderspage = async () => {
  const orders = await getAllOrders();

  console.log("Orders: ", orders);

  if (!orders) return null;

  const flattenedOrders = orders.flatMap((order) =>
    order.items.map((item) => ({
      ...item,
      order,
    })),
  );

  return <OrdersComp orders={flattenedOrders} />;
};

export default Orderspage;
