import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Pie } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function PieChartCard() {
  const chartRef = useRef(null);
  const [products, setProducts] = useState([]);

  async function Pieproductsquantity() {
    try {
      const Piedata = await fetch("http://localhost:3000/Cart");
      const Pieurl = await Piedata.json();
      setProducts(Pieurl);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  }

  useEffect(() => {
    Pieproductsquantity();
  }, []);

  // ✅ Correct mapping
  const labels = products.map((product) => product.ProductCategory);
  const values = products.map((product) => product.ProductQuantity);

  const colors = [
    "rgba(75, 192, 192, 0.8)",
    "rgba(255, 99, 132, 0.8)",
    "rgba(255, 205, 86, 0.8)",
    "rgba(54, 162, 235, 0.8)",
    "rgba(153, 102, 255, 0.8)",
    "rgba(255, 159, 64, 0.8)",
  ];

  const borderColors = colors.map((c) => c.replace("0.8", "1"));

  const total = values.reduce((sum, val) => sum + val, 0);

  const data = useMemo(
    () => ({
      labels,
      datasets: [
        {
          label: "Category Share (%)",
          data: values,
          backgroundColor: colors,
          borderColor: borderColors,
          borderWidth: 2,
          hoverOffset: 12,
        },
      ],
    }),
    [labels, values]
  );

  const options = useMemo(
    () => ({
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: "bottom",
          labels: {
            usePointStyle: true,
            pointStyle: "circle",
            padding: 16,
            font: { size: 14 },
          },
        },
        tooltip: {
          backgroundColor: "#333",
          titleColor: "#fff",
          bodyColor: "#fff",
          callbacks: {
            label: (ctx) => {
              const quantity = ctx.parsed;
              const percent = ((quantity / total) * 100).toFixed(1);
              return `${ctx.label}: ${quantity} (${percent}%)`;
            },
          },
        },
      },
    }),
    [total]
  );

  const onClick = (evt) => {
    const chart = chartRef.current;
    if (!chart) return;
    const points = chart.getElementsAtEventForMode(
      evt,
      "nearest",
      { intersect: true },
      true
    );
    if (points.length) {
      const firstPoint = points[0];
      const label = chart.data.labels[firstPoint.index];
      const value =
        chart.data.datasets[firstPoint.datasetIndex].data[firstPoint.index];
      alert(`Clicked: ${label} → ${value}`);
    }
  };

  return (
    <div className="min-h-screen w-full bg-gray-50 p-6">
      <div className="mx-auto max-w-4xl grid gap-6 md:grid-cols-2">
        <div className="rounded-2xl bg-white p-5 shadow-lg hover:shadow-xl transition-shadow">
          <div className="relative h-72">
            <Pie
              ref={chartRef}
              data={data}
              options={options}
              onClick={onClick}
              style={{ width: "650px" }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
