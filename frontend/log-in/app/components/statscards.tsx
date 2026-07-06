"use client";

import {
  Users,
  UserCheck,
  UserX,
  BarChart3,
} from "lucide-react";

type Props = {
  totalStudents: number;
  presentToday: number;
  absentToday: number;
};

export default function StatsCards({
  totalStudents,
  presentToday,
  absentToday,
}: Props) {
  const percentage =
    totalStudents === 0
      ? 0
      : Math.round((presentToday / totalStudents) * 100);

  const cards = [
    {
      title: "Total Students",
      value: totalStudents,
      color: "#2563EB",
      icon: <Users size={32} color="white" />,
    },
    {
      title: "Present Today",
      value: presentToday,
      color: "#22C55E",
      icon: <UserCheck size={32} color="white" />,
    },
    {
      title: "Absent Today",
      value: absentToday,
      color: "#EF4444",
      icon: <UserX size={32} color="white" />,
    },
    {
      title: "Attendance %",
      value: `${percentage}%`,
      color: "#F59E0B",
      icon: <BarChart3 size={32} color="white" />,
    },
  ];

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(4,1fr)",
        gap: "25px",
      }}
    >
      {cards.map((card) => (
        <div
          key={card.title}
          style={{
            background: "white",
            borderRadius: "18px",
            padding: "25px",
            boxShadow: "0 10px 25px rgba(0,0,0,.08)",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            transition: ".3s",
          }}
        >
          <div>
            <p
              style={{
                color: "#64748B",
                fontSize: "15px",
                marginBottom: "8px",
              }}
            >
              {card.title}
            </p>

            <h1
              style={{
                margin: 0,
                fontSize: "38px",
                color: "#111827",
              }}
            >
              {card.value}
            </h1>
          </div>

          <div
            style={{
              width: "65px",
              height: "65px",
              borderRadius: "18px",
              background: card.color,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {card.icon}
          </div>
        </div>
      ))}
    </div>
  );
}