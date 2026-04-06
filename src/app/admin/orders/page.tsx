import { AdminUserOrders } from "@/components/admin/AdminUserOrders";
import { getAdminAllOrders } from "@/features/admin/admin.query";

const AdminOrdersPage = async () => {
  // const orderData = [
  //   {
  //     id: "bc88c154",
  //     buyer: { name: "Ankush Sahu", phone: "9876543210" },
  //     vendor: { name: "LG Electronics", email: "Problemgamer2502@Gmail.Com" },
  //     products: "LG Smart Choice, Washing Machine × 1",
  //     amount: 38030,
  //     payment: { method: "STRIPE", status: "Paid" },
  //     status: "Returned",
  //     date: "28 Dec 2025",
  //   },
  //   {
  //     id: "44c22cf2",
  //     buyer: { name: "Ankush Sahu", phone: "9876432108" },
  //     vendor: { name: "LG Electronics", email: "Problemgamer2502@Gmail.Com" },
  //     products: "LG 4K Ultra HD Smart QNED AI TV, QNED82T ( 65 inch ) × 2",
  //     amount: 142830,
  //     payment: { method: "STRIPE", status: "Paid" },
  //     status: "Shipped",
  //     date: "28 Dec 2025",
  //   },
  //   {
  //     id: "a5a406f1",
  //     buyer: { name: "Ankush Sahu", phone: "98765432110" },
  //     vendor: { name: "LG Electronics", email: "Problemgamer2502@Gmail.Com" },
  //     products: "LG 4K Ultra HD Smart QNED AI TV, QNED82T ( 65 inch ) × 2",
  //     amount: 142830,
  //     payment: { method: "STRIPE", status: "Pending" },
  //     status: "Pending",
  //     date: "28 Dec 2025",
  //   },
  //   {
  //     id: "4e00f825",
  //     buyer: { name: "Ankush Sahu", phone: "1234567890" },
  //     vendor: { name: "SAMSUNG", email: "Samsung@Gmail.Com" },
  //     products: "Samsung Galaxy S25 Ultra 5G × 1",
  //     amount: 142029,
  //     payment: { method: "STRIPE", status: "Paid" },
  //     status: "Pending",
  //     date: "22 Dec 2025",
  //   },
  // ];

  // Helper for status colors

  const orders = await getAdminAllOrders();

  console.log("Admin Orders: ", orders);

  if (!orders) return [];

  return <AdminUserOrders orderData={orders} />;
};

export default AdminOrdersPage;
