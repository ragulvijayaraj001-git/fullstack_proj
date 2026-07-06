"use client";

import { useEffect, useState } from "react";

import Sidebar from "../components/sidebar";
import Header from "../components/header";
import StatsCards from "../components/statscards";
import QuickActions from "../components/quickactions";
import AttendanceOverview from "../components/attendanceoverview";
import RecentStudents from "../components/recentstudents";
import AttendanceChart from "../components/attendancechart";
import DepartmentChart from "../components/departmentchart";

export default function Dashboard() {
  const [stats, setStats] = useState({
    totalStudents: 0,
    presentToday: 0,
    absentToday: 0,
  });

  const [students, setStudents] = useState([]);
  const [departments, setDepartments] = useState([]);

  useEffect(() => {
  // Check if user is logged in
  const token = localStorage.getItem("token");

  if (!token) {
    window.location.href = "/";
    return;
  }

  // Fetch Dashboard Data
  fetch("http://localhost:5005/api/dashboard")
    .then((res) => res.json())
    .then((data) => {
      if (data.success) {
        setStats(data.stats);
        setDepartments(data.departments);
      }
    });

  // Fetch Students
  fetch("http://localhost:5005/api/students")
    .then((res) => res.json())
    .then((data) => {
      if (data.success) {
        setStudents(data.students);
      }
    });
}, []);

  return (
    <div style={{ display: "flex" }}>
      <Sidebar />

      <div
        style={{
          marginLeft: "260px",
          flex: 1,
          background: "#F8FAFC",
          minHeight: "100vh",
        }}
      >
        <Header />

        <div style={{ padding: "30px" }}>
          {/* Welcome */}
          <h1
            style={{
              fontSize: "32px",
              color: "#111827",
              marginBottom: "10px",
            }}
          >
            Welcome Rahul 👋
          </h1>

          <p
            style={{
              color: "#6B7280",
              marginBottom: "35px",
            }}
          >
            Manage your SmartCampus from one place.
          </p>

          {/* Stats Cards */}
          <StatsCards
            totalStudents={stats.totalStudents}
            presentToday={stats.presentToday}
            absentToday={stats.absentToday}
          />

          {/* Quick Actions */}
          <QuickActions />

          {/* Charts */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "2fr 1fr",
              gap: "25px",
              marginTop: "40px",
            }}
          >
            <AttendanceChart />
            <DepartmentChart departments={departments} />
          </div>

          {/* Bottom Section */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "25px",
              marginTop: "40px",
              alignItems: "start",
            }}
          >
            <RecentStudents students={students} />

            <AttendanceOverview />
          </div>
        </div>
      </div>
    </div>
  );
}