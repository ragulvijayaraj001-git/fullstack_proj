"use client";

import { useEffect, useState } from "react";

const BASE = "http://localhost:5005/api";

export default function Students() {
  const [students, setStudents] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    const res = await fetch(`${BASE}/students`);
    const data = await res.json();

    if (data.success) {
      setStudents(data.students);
    }
  };

  return (
    <div
      style={{
        padding: "40px",
        background: "#F8FAFC",
        minHeight: "100vh",
      }}
    >
      <h1
        style={{
          fontSize: "34px",
          marginBottom: "30px",
        }}
      >
        👨‍🎓 Students
      </h1>

      <input
        placeholder="Search Student..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{
          width: "350px",
          padding: "14px",
          borderRadius: "10px",
          border: "1px solid #ddd",
          marginBottom: "30px",
          fontSize: "15px",
        }}
      />

      <table
        style={{
          width: "100%",
          background: "white",
          borderCollapse: "collapse",
          borderRadius: "15px",
          overflow: "hidden",
          boxShadow: "0px 10px 30px rgba(0,0,0,.08)",
        }}
      >
        <thead
          style={{
            background: "#2563EB",
            color: "white",
          }}
        >
          <tr>
            <th style={{ padding: "15px" }}>Name</th>
            <th>Roll No</th>
            <th>Department</th>
            <th>Year</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {students
            .filter((student: any) =>
              student.name
                .toLowerCase()
                .includes(search.toLowerCase())
            )
            .map((student: any) => (
              <tr
                key={student.id}
                style={{
                  textAlign: "center",
                  borderBottom: "1px solid #eee",
                }}
              >
                <td style={{ padding: "18px" }}>{student.name}</td>
                <td>{student.rollNo}</td>
                <td>{student.department}</td>
                <td>{student.year}</td>
                <td>{student.email}</td>
                <td>{student.phone}</td>

                <td>
                  <button>👁</button>

                  <button
                    style={{
                      marginLeft: "10px",
                    }}
                  >
                    ✏️
                  </button>

                  <button
                    style={{
                      marginLeft: "10px",
                    }}
                  >
                    🗑
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}