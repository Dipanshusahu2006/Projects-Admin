import React, { useEffect, useState } from "react";
import "../../App.css";

function Ordertable() {
  const [Orderlist, setOrderlist] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await fetch("https://main-projectnode.vercel.app/order/Get");
        const data = await res.json();
        const Ordersdatas = data.Data || [];

        // Flatten the order structure to get all products with username
        const allProducts = Ordersdatas.flatMap(order =>
          (order.products || []).map(product => ({
            ...product,
            username: order.username, // attach buyer username
          }))
        );

        setOrderlist(allProducts);
      } catch (err) {
        console.error("Error fetching orders:", err);
      }
    };

    fetchOrders();
  }, []);

  return (
    <>
      <div className="Productstable">
        <div className="Products">
          <h1>All Orders List</h1>
          <div className="ProductsList">
            <table>
              <thead>
                <tr>
                  <th>Sr No.</th>
                 
                  <th>Username</th>
                  <th>Product Name</th>
                  <th>Product Image</th>
                  <th>Price</th>
                  <th>Category</th>
                  <th>Quantity</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {Orderlist.length > 0 ? (
                  Orderlist.map((order, index) => (
                    <tr key={order._id || index}>
                      <td>{index + 1}</td>
                     
                      <td>{order.username || "Guest"}</td>
                      <td>{order.ProductName}</td>
                      <td>
                        <img
                          src={order.ProductImage}
                          alt={order.ProductName}
                          style={{ width: "50px", height: "50px", borderRadius: "5px" }}
                        />
                      </td>
                      <td>₹{order.ProductPrice}</td>
                      <td>{order.ProductCategory}</td>
                      <td>{order.ProductQuantity}</td>
                      <td>
                        <i
                          className={
                            order.Status === "Pending"
                              ? "fa-solid fa-hourglass-half text-warning"
                              : "fa-solid fa-check text-success"
                          }
                        ></i>{" "}
                        {order.Status || "Pending"}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="9" style={{ textAlign: "center", padding: "20px" }}>
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
