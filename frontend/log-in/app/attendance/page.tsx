"use client";

import { useEffect, useState } from "react";
import { Search, User, CheckCircle, XCircle } from "lucide-react";

const BASE = "http://localhost:5005/api";

export default function Attendance() {
  const [students, setStudents] = useState<any[]>([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetch(`${BASE}/students`)
      .then((res) => res.json())
      .then((data) => setStudents(data.students))
      .catch((err) => console.log(err));
  }, []);

  const markAttendance = async (id: number, status: string) => {
    try {
      const res = await fetch(`${BASE}/attendance`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          student_id: id,
          status,
        }),
      });

      const data = await res.json();

      if (data.success) {
        alert(`✅ ${status} marked successfully`);
      } else {
        alert(data.message || "Failed");
      }
    } catch (err) {
      console.log(err);
      alert("Server Error");
    }
  };

  const filteredStudents = students.filter((student: any) =>
    student.name.toLowerCase().includes(search.toLowerCase())
  );

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
          maxWidth: "1100px",
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
          📅 Attendance
        </h1>

        <p
          style={{
            color: "#64748B",
            marginBottom: "30px",
          }}
        >
          Mark today's attendance for all students.
        </p>

        {/* Search */}

        <div
          style={{
            background: "white",
            borderRadius: "15px",
            padding: "15px 20px",
            display: "flex",
            alignItems: "center",
            gap: "12px",
            boxShadow: "0 5px 20px rgba(0,0,0,.08)",
            marginBottom: "30px",
          }}
        >
          <Search color="#6B7280" />

          <input
            type="text"
            placeholder="Search student..."
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

        {/* Students */}

        <div
          style={{
            display: "grid",
            gap: "20px",
          }}
        >
          {filteredStudents.map((student: any) => (
            <div
              key={student.id}
              style={{
                background: "white",
                borderRadius: "18px",
                padding: "22px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                boxShadow: "0 8px 20px rgba(0,0,0,.08)",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "18px",
                }}
              >
                <div
                  style={{
                    width: "60px",
                    height: "60px",
                    borderRadius: "50%",
                    background: "#DBEAFE",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <User size={28} color="#2563EB" />
                </div>

                <div>
                  <h2
                    style={{
                      margin: 0,
                      color: "#111827",
                    }}
                  >
                    {student.name}
                  </h2>

                  <p
                    style={{
                      margin: "5px 0",
                      color: "#6B7280",
                    }}
                  >
                    {student.rollNo}
                  </p>

                  <p
                    style={{
                      margin: 0,
                      color: "#94A3B8",
                    }}
                  >
                    {student.department}
                  </p>
                </div>
              </div>

              <div
                style={{
                  display: "flex",
                  gap: "15px",
                }}
              >
                <button
                  onClick={() =>
                    markAttendance(student.id, "Present")
                  }
                  style={{
                    background: "#16A34A",
                    color: "white",
                    border: "none",
                    padding: "12px 20px",
                    borderRadius: "12px",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    fontWeight: "bold",
                  }}
                >
                  <CheckCircle size={20} />
                  Present
                </button>

                <button
                  onClick={() =>
                    markAttendance(student.id, "Absent")
                  }
                  style={{
                    background: "#DC2626",
                    color: "white",
                    border: "none",
                    padding: "12px 20px",
                    borderRadius: "12px",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    fontWeight: "bold",
                  }}
                >
                  <XCircle size={20} />
                  Absent
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}