"use client";

import { registerUser } from "../api/auth/auth";
import Link from "next/link";
import "./register.css";

export default function Register() {
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const data = {
      name: formData.get("name"),
      email: formData.get("email"),
      password: formData.get("password"),
    };

    try {
      const res = await registerUser(data);

      console.log("Response:", res);

      if (res.message === "Registered Successfully") {
        alert("Registration successful");
        window.location.href = "/login";
      } else {
        alert(res.message || "Something went wrong");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Server error");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1 style={{ fontFamily: "arabic" }}>Register</h1>

      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: "10px" }}>
          <label>Name</label>
          <br />
          <input
            name="name"
            type="text"
            placeholder="Enter Name"
            style={{ padding: "8px", width: "250px" }}
          />
        </div>

        <div style={{ marginBottom: "10px" }}>
          <label>Email</label>
          <br />
          <input
            name="email"
            type="email"
            placeholder="Enter Email"
            style={{ padding: "8px", width: "250px" }}
          />
        </div>

        <div style={{ marginBottom: "10px" }}>
          <label>Password</label>
          <br />
          <input
            name="password"
            type="password"
            placeholder="Enter Password"
            style={{ padding: "8px", width: "250px" }}
          />
        </div>

        <button
          type="submit"
          style={{
            padding: "8px 16px",
            background: "black",
            color: "white",
            border: "none",
            cursor: "pointer",
          }}
        >
          Register
        </button>
      </form>

      <p style={{ marginTop: "15px" }}>
        Already have an account?{" "}
        <Link
          href="/login"
          style={{
            marginLeft: "8px",
            padding: "6px 10px",
            border: "1px solid black",
            borderRadius: "5px",
            textDecoration: "none",
          }}
        >
          Login
        </Link>
      </p>
    </div>
  );
}