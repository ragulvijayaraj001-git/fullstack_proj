"use client";

import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

import { Pie } from "react-chartjs-2";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend
);

interface Department {
  department: string;
  total: number;
}

interface Props {
  departments: Department[];
}

export default function DepartmentChart({
  departments,
}: Props) {

  const data = {
    labels: departments.map((d) => d.department),

    datasets: [
      {
        label: "Students",

        data: departments.map((d) => d.total),

        backgroundColor: [
          "#2563EB",
          "#16A34A",
          "#F59E0B",
          "#DC2626",
          "#9333EA",
          "#14B8A6",
          "#EC4899",
        ],
      },
    ],
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
        🥧 Department Distribution
      </h2>

      <Pie data={data} />
    </div>
  );
}