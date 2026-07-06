"use client";

import { useEffect, useState } from "react";
import {
  Bell,
  Search,
  CalendarDays,
  UserCircle2,
} from "lucide-react";

export default function Header() {
  const [currentDate, setCurrentDate] = useState("");

  useEffect(() => {
    setCurrentDate(
      new Date().toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      })
    );
  }, []);

  return (
    <div
      style={{
        height: "85px",
        background: "white",
        borderBottom: "1px solid #E5E7EB",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "0 35px",
        position: "sticky",
        top: 0,
        zIndex: 100,
      }}
    >
      {/* Left */}
      <div>
        <h2
          style={{
            margin: 0,
            fontSize: "32px",
            color: "#111827",
            fontWeight: "bold",
          }}
        >
          Dashboard
        </h2>

        <p
          style={{
            color: "#6B7280",
            marginTop: "5px",
          }}
        >
          Welcome back 👋
        </p>
      </div>

      {/* Search */}
      <div
        style={{
          width: "420px",
          display: "flex",
          alignItems: "center",
          background: "#F3F4F6",
          padding: "12px 18px",
          borderRadius: "15px",
          gap: "10px",
        }}
      >
        <Search color="#6B7280" size={20} />

        <input
          type="text"
          placeholder="Search students, attendance..."
          style={{
            border: "none",
            background: "transparent",
            width: "100%",
            outline: "none",
            fontSize: "15px",
          }}
        />
      </div>

      {/* Right */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "25px",
        }}
      >
        {/* Notification */}
        <Bell
          size={24}
          style={{
            cursor: "pointer",
          }}
        />

        {/* Date */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            color: "#374151",
            fontWeight: "500",
          }}
        >
          <CalendarDays size={20} />
          <span>{currentDate}</span>
        </div>

        {/* Profile */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            cursor: "pointer",
          }}
        >
          <UserCircle2
            size={42}
            color="#2563EB"
          />

          <div>
            <h4
              style={{
                margin: 0,
                color: "#111827",
              }}
            >
              Rahul
            </h4>

            <small
              style={{
                color: "#6B7280",
              }}
            >
              Administrator
            </small>
          </div>
        </div>
      </div>
    </div>
  );
}