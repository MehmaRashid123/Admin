"use client";
import { client } from "@/sanity/lib/client";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";

interface Order {
  _id: string;
  firstName: string;
  lastName: string;
  phone: number;
  email: string;
  address: string;
  zipCode: string;
  city: string;
  total: number;
  discount: number;
  orderData: string;
  status: string | null;
  cartItems: { name: string; image: string }[];
}

export default function AdminDashboard() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [filteredOrders, setFilteredOrders] = useState<Order[]>([]);
  const [filter, setFilter] = useState<string>("All");
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const data = await client.fetch(
          `*[_type == "order"]{
            _id,
            firstName,
            lastName,
            phone,
            email,
            address,
            city,
            zipCode,
            total,
            discount,
            orderData,
            status,
            cartItems[] {
              name,
              image
            }
          }`
        );
        setOrders(data);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    fetchOrders();
  }, []);

  useEffect(() => {
    if (filter === "All") {
      setFilteredOrders(orders);
    } else {
      setFilteredOrders(
        orders.filter((order) => order.status?.toLowerCase() === filter.toLowerCase())
      );
    }
  }, [filter, orders]);

  const updateOrderStatus = async (orderId: string, newStatus: string) => {
    try {
      await client.patch(orderId).set({ status: newStatus }).commit();

      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order._id === orderId ? { ...order, status: newStatus } : order
        )
      );

      Swal.fire("Success!", "Order status updated!", "success");
    } catch (error) {
      Swal.fire("Error", "Failed to update order status", "error");
      console.error("Error updating order status:", error);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <h1 className="text-4xl font-bold text-center mb-8">Admin Dashboard</h1>

      {/* Filter Section */}
      <div className="flex justify-center mb-6">
        <label htmlFor="filter" className="mr-3 text-lg font-semibold">Filter Orders:</label>
        <select
          id="filter"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="px-4 py-2 border rounded-md shadow-sm bg-gray-800 text-white"
        >
          <option value="All">All</option>
          <option value="pending">Pending</option>
          <option value="shipped">Shipped</option>
          <option value="delivered">Delivered</option>
        </select>
      </div>

      {/* Orders Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-gray-900 border border-gray-700 rounded-lg shadow-lg">
          <thead>
            <tr className="bg-gray-800 text-gray-300 text-left">
              <th className="px-4 py-3 border border-gray-700">Customer</th>
              <th className="px-4 py-3 border border-gray-700">Email</th>
              <th className="px-4 py-3 border border-gray-700">Total</th>
              <th className="px-4 py-3 border border-gray-700">Status</th>
              <th className="px-4 py-3 border border-gray-700">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredOrders.length > 0 ? (
              filteredOrders.map((order) => (
                <tr key={order._id} className="border-b border-gray-700 hover:bg-gray-800 transition">
                  <td className="px-4 py-3 border border-gray-700">{`${order.firstName} ${order.lastName}`}</td>
                  <td className="px-4 py-3 border border-gray-700">{order.email}</td>
                  <td className="px-4 py-3 border border-gray-700 font-semibold">${order.total}</td>
                  <td className="px-4 py-3 border border-gray-700 font-semibold">
                    <span
                      className={`px-3 py-1 rounded-md text-black text-sm ${
                        order.status?.toLowerCase() === "pending"
                          ? "bg-yellow-400"
                          : order.status?.toLowerCase() === "shipped"
                          ? "bg-red-500"
                          : order.status?.toLowerCase() === "delivered"
                          ? "bg-green-500"
                          : "bg-gray-400"
                      }`}
                    >
                      {order.status || "No status"}
                    </span>
                  </td>
                  <td className="px-4 py-3 border border-gray-700 space-x-2">
                    <button
                      className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition"
                      onClick={() => setSelectedOrder(order)}
                    >
                      View
                    </button>
                    <select
                      className="bg-gray-800 text-white px-2 py-1 rounded-md"
                      value={order.status || "pending"}
                      onChange={(e) => updateOrderStatus(order._id, e.target.value)}
                    >
                      <option value="pending">Pending</option>
                      <option value="shipped">Shipped</option>
                      <option value="delivered">Delivered</option>
                    </select>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="text-center text-gray-400 py-6">
                  No orders found for the selected filter.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Order Details Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 bg-black bg-opacity-80 flex justify-center items-center">
          <div className="bg-gray-900 p-6 rounded-lg shadow-lg w-1/2 border border-gray-700">
            <h2 className="text-2xl font-bold text-white mb-4">{`${selectedOrder.firstName} ${selectedOrder.lastName}`}</h2>
            <p>Email: {selectedOrder.email}</p>
            <p>Phone: {selectedOrder.phone}</p>
            <p>Address: {selectedOrder.address}, {selectedOrder.city}, {selectedOrder.zipCode}</p>
            <p>Total: <span className="font-semibold">${selectedOrder.total}</span></p>

            <h3 className="text-xl font-bold mt-4 text-white">Items:</h3>
            <div className="flex space-x-2 mt-2">
              {selectedOrder.cartItems.map((item, index) => (
                <div key={index} className="p-2 border border-gray-700 rounded-md bg-gray-800">
                  <img src={item.image} alt={item.name} className="w-16 h-16 rounded-md" />
                  <p className="text-center text-gray-300">{item.name}</p>
                </div>
              ))}
            </div>

            <button
              className="mt-6 bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition"
              onClick={() => setSelectedOrder(null)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
