"use client";

export default function AttendanceOverview() {
  return (
    <div
      style={{
        marginTop: "35px",
        display: "grid",
        gridTemplateColumns: "2fr 1fr",
        gap: "25px",
      }}
    >
      {/* Attendance Card */}

      <div
        style={{
          background: "white",
          borderRadius: "20px",
          padding: "25px",
          boxShadow: "0 10px 25px rgba(0,0,0,.08)",
        }}
      >
        <h2
          style={{
            marginBottom: "25px",
            color: "#111827",
          }}
        >
          📈 Attendance Overview
        </h2>

        <div
          style={{
            height: "18px",
            width: "100%",
            background: "#E5E7EB",
            borderRadius: "20px",
          }}
        >
          <div
            style={{
              width: "82%",
              height: "100%",
              background: "#2563EB",
              borderRadius: "20px",
            }}
          />
        </div>

        <h3
          style={{
            marginTop: "20px",
            color: "#2563EB",
          }}
        >
          Overall Attendance : 82%
        </h3>

        <p
          style={{
            color: "#6B7280",
          }}
        >
          Excellent attendance performance this month.
        </p>
      </div>

      {/* Activity */}

      <div
        style={{
          background: "white",
          borderRadius: "20px",
          padding: "25px",
          boxShadow: "0 10px 25px rgba(0,0,0,.08)",
        }}
      >
        <h2>📝 Recent Activity</h2>

        <ul
          style={{
            marginTop: "20px",
            lineHeight: "40px",
            color: "#374151",
          }}
        >
          <li>Student Registered</li>
          <li>Attendance Updated</li>
          <li>Report Viewed</li>
          <li>Dashboard Opened</li>
        </ul>
      </div>
    </div>
  );
}