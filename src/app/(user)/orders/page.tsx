import { OrdersComp } from "@/components/user/OrdersComp";
import { getAllOrders } from "@/features/user/user.query";

const Orderspage = async () => {
  const orders = await getAllOrders();

  //   console.log("Orders: ", orders);

  if (!orders) return null;
  //
  return <OrdersComp orders={orders} />;
};

export default Orderspage;
