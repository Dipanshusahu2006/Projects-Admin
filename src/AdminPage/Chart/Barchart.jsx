import React, { useEffect, useState } from "react";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

function BarChart() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
      const fetchOrdersdetalaies = async () => {
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
  
          setProducts(allProducts);
        } catch (err) {
          console.error("Error fetching orders:", err);
        }
      };
  
      fetchOrdersdetalaies();
    }, []);
  
  const data = {
    labels: products.map((product) => product.ProductCategory), 
    datasets: [
      {
        label: "Product Quantity",
        data: products.map((product) => product.ProductQuantity),
        backgroundColor: "rgba(75,192,192,0.6)",
        borderRadius: 5,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
    },
  };

  return (
    <div style={{ width: "540px",height:"450px",margin: "auto" }}>
      <Bar data={data} options={options} />
    </div>
  );
}

export default BarChart;
