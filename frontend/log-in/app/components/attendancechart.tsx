"use client";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from "chart.js";

import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend
);

export default function AttendanceChart() {
  const data = {
    labels: [
      "Mon",
      "Tue",
      "Wed",
      "Thu",
      "Fri",
      "Sat",
    ],

    datasets: [
      {
        label: "Attendance",
        data: [92, 88, 95, 91, 97, 89],
        backgroundColor: "#2563EB",
        borderRadius: 8,
      },
    ],
  };

  const options = {
    responsive: true,

    plugins: {
      legend: {
        display: false,
      },
    },

    scales: {
      y: {
        beginAtZero: true,
        max: 100,
      },
    },
  };

  return (
    <div
      style={{
        background: "white",
        borderRadius: "20px",
        padding: "25px",
        boxShadow: "0 10px 30px rgba(0,0,0,.08)",
      }}
    >
      <h2
        style={{
          marginBottom: "20px",
        }}
      >
        📊 Weekly Attendance
      </h2>

      <Bar data={data} options={options} />
    </div>
  );
}