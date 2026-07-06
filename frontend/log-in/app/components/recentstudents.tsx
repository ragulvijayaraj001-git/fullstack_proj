"use client";

type Student = {
  id: number;
  name: string;
  rollNo: string;
};

type Props = {
  students: Student[];
};

export default function RecentStudents({ students }: Props) {
  return (
    <div
      style={{
        marginTop: "35px",
        background: "white",
        borderRadius: "20px",
        padding: "25px",
        boxShadow: "0 10px 25px rgba(0,0,0,.08)",
      }}
    >
      <h2 style={{ marginBottom: "20px" }}>
        👨‍🎓 Recent Students
      </h2>

      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
        }}
      >
        <thead>
          <tr
            style={{
              background: "#F3F4F6",
            }}
          >
            <th style={{ padding: "15px", textAlign: "left" }}>ID</th>
            <th style={{ padding: "15px", textAlign: "left" }}>Name</th>
            <th style={{ padding: "15px", textAlign: "left" }}>Roll No</th>
          </tr>
        </thead>

        <tbody>
          {students.map((student) => (
            <tr
              key={student.id}
              style={{
                borderBottom: "1px solid #E5E7EB",
              }}
            >
              <td style={{ padding: "15px" }}>{student.id}</td>
              <td style={{ padding: "15px" }}>{student.name}</td>
              <td style={{ padding: "15px" }}>{student.rollNo}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}