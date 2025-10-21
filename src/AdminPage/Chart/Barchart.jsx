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

  async function Barproductsquantity() {
    try {
      const response = await fetch("https://main-projectnode.vercel.app/cart/Get");
      const data = await response.json();
      setProducts(data?.Data || []);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  }

  useEffect(() => {
    Barproductsquantity();
  }, []);

  const data = {
    labels: products.map((product) => product.ProductCategory), // dynamic labels
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
