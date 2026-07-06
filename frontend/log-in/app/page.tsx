import Link from "next/link";

export default function Home() {
  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f4f6f9",
      }}
    >
      <div
        style={{
          backgroundColor: "white",
          padding: "40px",
          borderRadius: "12px",
          boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
          textAlign: "center",
          width: "350px",
        }}
      >
        <h1 style={{ marginBottom: "10px" }}>Welcome</h1>

        <p style={{ color: "#666", marginBottom: "30px" }}>
          Choose an option to continue
        </p>

        <div style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
          <Link
            href="/login"
            style={{
              backgroundColor: "#0070f3",
              color: "white",
              padding: "12px",
              borderRadius: "8px",
              textDecoration: "none",
              fontWeight: "bold",
            }}
          >
            Login
          </Link>

          <Link
            href="/register"
            style={{
              backgroundColor: "#28a745",
              color: "white",
              padding: "12px",
              borderRadius: "8px",
              textDecoration: "none",
              fontWeight: "bold",
            }}
          >
            Register
          </Link>
        </div>
      </div>
    </div>
  );
}