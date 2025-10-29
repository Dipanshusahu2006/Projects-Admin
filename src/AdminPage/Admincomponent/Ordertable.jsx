import React, { useEffect, useState } from "react";
import "../../App.css";
import { Link } from "react-router-dom";

function Ordertable() {
  const [Orderlist, setOrderlist] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await fetch("https://main-projectnode.vercel.app/order/Get");
        const data = await res.json();
        const Ordersdatas = data.Data || [];
        setOrderlist(Ordersdatas);
      } catch (err) {
        console.error("Error fetching orders:", err);
      }
    };

    fetchOrders();
  }, []);

  return (
    <>
      <div className="Orderstable">
        <div className="Products">
          <h1>All Orders List</h1>
          <div className="OrdersList">
            <table>
              <thead>
                <tr>
                  <th>Sr No.</th>
                  <th>Username</th>
                  <th>Date & Time</th>
                  <th>Product Quantity</th>
                  <th>Total Price</th>
                   <th>Action</th>
                  <th>Order Status</th>
                </tr>
              </thead>

              <tbody>
                {Orderlist.length > 0 ? (
                  Orderlist.map((order, index) => {
                    const itemCount = order.products?.length || 0;

                    return (
                      <tr key={order._id || index}>
                        <td>

                            {index + 1}
                         
                        </td>
                        <td>
                          
                            {order.username || "Guest"}
                         
                        </td>
                        <td>
                          {order.createdAt
                            ? new Date(order.createdAt).toLocaleString("en-IN", {
                                dateStyle: "medium",
                                timeStyle: "short",
                              })
                            : "N/A"}
                        </td>
                        <td>{itemCount}</td>
                        <td>₹{order.TotalAmount}</td>

                        <td className="action-icons">
                  {/* View */}
            <Link to={`/Orderdetalais/${order.userId}`}>
             <i className="fa-solid fa-eye"></i>
             </Link>
                     </td>


                        <td>
                          <span
                            className={`status-badge ${
                              order.orderStatus === "Processed"
                                ? "status-processed"
                                : order.orderStatus === "Delivered"
                                ? "status-delivered"
                                : order.orderStatus === "Pending"
                                ? "status-pending"
                                : "status-cancelled"
                            }`}
                          >
                            {order.orderStatus}
                          </span>
                        </td>
                        
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td
                      colSpan="9"
                      style={{ textAlign: "center", padding: "20px" }}
                    >
                      No orders found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}

export default Ordertable;
