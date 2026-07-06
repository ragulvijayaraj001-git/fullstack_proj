"use client";

import Link from "next/link";
import {
  UserPlus,
  CalendarCheck,
  FileBarChart,
  ArrowRight,
} from "lucide-react";

export default function QuickActions() {
  const actions = [
    {
      title: "Add Student",
      desc: "Register a new student",
      color: "#2563EB",
      icon: <UserPlus size={35} color="white" />,
      link: "/student/add",
    },
    {
      title: "Mark Attendance",
      desc: "Take today's attendance",
      color: "#16A34A",
      icon: <CalendarCheck size={35} color="white" />,
      link: "/attendance",
    },
    {
      title: "View Reports",
      desc: "Attendance Analytics",
      color: "#EA580C",
      icon: <FileBarChart size={35} color="white" />,
      link: "/reports",
    },
  ];

  return (
    <div style={{ marginTop: "45px" }}>
      <h2
        style={{
          marginBottom: "20px",
          color: "#111827",
        }}
      >
        Quick Actions
      </h2>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3,1fr)",
          gap: "25px",
        }}
      >
        {actions.map((action) => (
          <Link
            key={action.title}
            href={action.link}
            style={{
              textDecoration: "none",
            }}
          >
            <div
              style={{
                background: "white",
                borderRadius: "20px",
                padding: "25px",
                boxShadow: "0 10px 25px rgba(0,0,0,.08)",
                cursor: "pointer",
                transition: ".3s",
                height: "180px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              }}
            >
              <div
                style={{
                  width: "65px",
                  height: "65px",
                  borderRadius: "18px",
                  background: action.color,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                {action.icon}
              </div>

              <div>
                <h2
                  style={{
                    color: "#111827",
                    marginBottom: "8px",
                  }}
                >
                  {action.title}
                </h2>

                <p
                  style={{
                    color: "#64748B",
                    margin: 0,
                  }}
                >
                  {action.desc}
                </p>
              </div>

              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                }}
              >
                <ArrowRight color={action.color} />
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}