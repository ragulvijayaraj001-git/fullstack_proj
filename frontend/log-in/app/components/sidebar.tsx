"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  LayoutDashboard,
  UserPlus,
  CalendarCheck,
  FileBarChart,
  Settings,
  LogOut,
  GraduationCap,
  Users,
} from "lucide-react";

export default function Sidebar() {
  const pathname = usePathname();

  const menus = [
    {
      title: "Dashboard",
      link: "/dashboard",
      icon: <LayoutDashboard size={20} />,
    },
    {
      title: "Add Student",
      link: "/student/add",
      icon: <UserPlus size={20} />,
    },
    {
      title: "Attendance",
      link: "/attendance",
      icon: <CalendarCheck size={20} />,
    },
    {
      title: "Reports",
      link: "/reports",
      icon: <FileBarChart size={20} />,
    },
    {
      title: "Students",
      link: "/student",
      icon: <Users size={20} />,
    },
    {
      title: "Settings",
      link: "/settings",
      icon: <Settings size={20} />,
    },
  ];

  return (
    <div
      style={{
        width: "260px",
        height: "100vh",
        background: "#081120",
        color: "white",
        position: "fixed",
        left: 0,
        top: 0,
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        overflowY: "auto",
        boxShadow: "4px 0px 15px rgba(0,0,0,.2)",
      }}
    >
      <div>
        {/* Logo */}

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            padding: "30px",
            fontSize: "28px",
            fontWeight: "bold",
          }}
        >
          <GraduationCap size={35} color="#3B82F6" />
          SmartCampus
        </div>

        <hr
          style={{
            borderColor: "#1E293B",
          }}
        />

        {/* Menu */}

        <div
          style={{
            marginTop: "20px",
            padding: "0px 15px",
          }}
        >
          {menus.map((menu) => (
            <Link
              key={menu.title}
              href={menu.link}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "15px",
                padding: "15px",
                marginBottom: "10px",
                borderRadius: "12px",
                textDecoration: "none",
                color:
                  pathname === menu.link
                    ? "white"
                    : "#CBD5E1",

                background:
                  pathname === menu.link
                    ? "#2563EB"
                    : "transparent",

                transition: ".3s",
                fontWeight: 500,
              }}
            >
              {menu.icon}
              {menu.title}
            </Link>
          ))}
        </div>
      </div>

      {/* Bottom */}

<div
  style={{
    marginTop: "auto",
    padding: "20px",
  }}
>
        <div
          style={{
            background: "#172554",
            borderRadius: "15px",
            padding: "20px",
            textAlign: "center",
            marginBottom: "20px",
          }}
        >
          <h3
            style={{
              marginBottom: "10px",
            }}
          >
            SmartCampus
          </h3>

          <p
            style={{
              color: "#CBD5E1",
              fontSize: "14px",
            }}
          >
            Campus Management System
          </p>
        </div>

        <button
          onClick={() => {
            localStorage.removeItem("token");
            localStorage.removeItem("role");
            window.location.href = "/";
          }}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            width: "100%",
            padding: "15px",
            background: "transparent",
            border: "none",
            color: "#F87171",
            cursor: "pointer",
            borderRadius: "10px",
            fontSize: "16px",
          }}
        >
          <LogOut size={20} />
          Logout
        </button>
      </div>
    </div>
  );
}