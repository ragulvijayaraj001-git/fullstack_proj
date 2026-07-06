"use client";

import { useEffect, useMemo, useState } from "react";
import {
  Search,
  Users,
  CheckCircle2,
  XCircle,
  BarChart3,
  FileText,
  FileSpreadsheet,
} from "lucide-react";

const BASE = "http://localhost:5005/api";

export default function Report() {
  const [reports, setReports] = useState<any[]>([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetch(`${BASE}/attendance`)
      .then((res) => res.json())
      .then((data) => {
        setReports(data.attendance || []);
      });
  }, []);

  const filteredReports = reports.filter((student: any) =>
    student.name.toLowerCase().includes(search.toLowerCase())
  );

  const totalStudents = filteredReports.length;

  const totalPresent = useMemo(
    () =>
      filteredReports.reduce(
        (sum: number, s: any) => sum + Number(s.presentDays),
        0
      ),
    [filteredReports]
  );

  const totalAbsent = useMemo(
    () =>
      filteredReports.reduce(
        (sum: number, s: any) => sum + Number(s.absentDays),
        0
      ),
    [filteredReports]
  );

  const overallAttendance =
    totalPresent + totalAbsent === 0
      ? 0
      : Math.round(
          (totalPresent / (totalPresent + totalAbsent)) * 100
        );

  const cardStyle = {
    background: "white",
    borderRadius: "18px",
    padding: "25px",
    boxShadow: "0 8px 25px rgba(0,0,0,.08)",
  };

  return (
    <div
      style={{
        background: "#F8FAFC",
        minHeight: "100vh",
        padding: "40px",
      }}
    >
      <div
        style={{
          maxWidth: "1250px",
          margin: "auto",
        }}
      >
        <h1
          style={{
            fontSize: "34px",
            color: "#111827",
            marginBottom: "8px",
          }}
        >
          📊 Attendance Reports
        </h1>

        <p
          style={{
            color: "#6B7280",
            marginBottom: "25px",
          }}
        >
          Student Attendance Summary
        </p>

        {/* Export Buttons */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "30px",
          }}
        >
          <p
            style={{
              color: "#6B7280",
              margin: 0,
            }}
          >
            View attendance records and overall performance.
          </p>

          <div
            style={{
              display: "flex",
              gap: "15px",
            }}
          >
            <button
              onClick={() =>
                window.open(
             "http://localhost:5005/api/attendance/pdf",
              "_blank"
             )
              }
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                background: "#DC2626",
                color: "white",
                border: "none",
                padding: "12px 20px",
                borderRadius: "10px",
                cursor: "pointer",
                fontWeight: "bold",
              }}
            >
              <FileText size={18} />
              Export PDF
            </button>

            <button
              onClick={() =>
                window.open(
                  "http://localhost:5005/api/attendance/export/csv",
                  "_blank"
                )
              }
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                background: "#16A34A",
                color: "white",
                border: "none",
                padding: "12px 20px",
                borderRadius: "10px",
                cursor: "pointer",
                fontWeight: "bold",
              }}
            >
              <FileSpreadsheet size={18} />
              Export Excel
            </button>
          </div>
        </div>

        {/* Search */}

        <div
          style={{
            ...cardStyle,
            display: "flex",
            alignItems: "center",
            gap: "12px",
            marginBottom: "30px",
          }}
        >
          <Search color="#64748B" />

          <input
            placeholder="Search Student..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{
              border: "none",
              outline: "none",
              width: "100%",
              fontSize: "16px",
            }}
          />
        </div>

        {/* Statistics */}

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4,1fr)",
            gap: "20px",
            marginBottom: "35px",
          }}
        >
          <div style={cardStyle}>
            <Users color="#2563EB" size={30} />
            <h3>Total Students</h3>
            <h1>{totalStudents}</h1>
          </div>

          <div style={cardStyle}>
            <CheckCircle2 color="#16A34A" size={30} />
            <h3>Total Presents</h3>
            <h1>{totalPresent}</h1>
          </div>

          <div style={cardStyle}>
            <XCircle color="#DC2626" size={30} />
            <h3>Total Absents</h3>
            <h1>{totalAbsent}</h1>
          </div>

          <div style={cardStyle}>
            <BarChart3 color="#F59E0B" size={30} />
            <h3>Overall Attendance</h3>
            <h1>{overallAttendance}%</h1>
          </div>
        </div>

        {/* Table */}

        <div style={cardStyle}>
          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
            }}
          >
            <thead>
              <tr
                style={{
                  background: "#EFF6FF",
                }}
              >
                <th style={{ padding: "15px" }}>Name</th>
                <th style={{ padding: "15px" }}>Roll No</th>
                <th style={{ padding: "15px" }}>Department</th>
                <th style={{ padding: "15px" }}>Working Days</th>
                <th style={{ padding: "15px" }}>Present</th>
                <th style={{ padding: "15px" }}>Absent</th>
                <th style={{ padding: "15px" }}>Attendance %</th>
              </tr>
            </thead>

            <tbody>
              {filteredReports.map((student: any) => (
                <tr
                  key={student.id}
                  style={{
                    borderBottom: "1px solid #E5E7EB",
                  }}
                >
                  <td style={{ padding: "15px" }}>{student.name}</td>
                  <td style={{ padding: "15px" }}>{student.rollNo}</td>
                  <td style={{ padding: "15px" }}>{student.department}</td>
                  <td style={{ padding: "15px" }}>{student.totalDays || 0}</td>

                  <td
                    style={{
                      padding: "15px",
                      color: "#16A34A",
                      fontWeight: "bold",
                    }}
                  >
                    {student.presentDays || 0}
                  </td>

                  <td
                    style={{
                      padding: "15px",
                      color: "#DC2626",
                      fontWeight: "bold",
                    }}
                  >
                    {student.absentDays || 0}
                  </td>

                  <td
                    style={{
                      padding: "15px",
                      color: "#2563EB",
                      fontWeight: "bold",
                    }}
                  >
                    {student.attendancePercentage || 0}%
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}