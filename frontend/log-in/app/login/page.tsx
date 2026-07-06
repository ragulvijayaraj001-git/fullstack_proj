"use client";

import { useState } from "react";
import { loginUser } from "../api/auth/auth";
import "./login.css";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const res = await loginUser({
        email,
        password,
      });

      console.log("Login Response:", res);

      if (res.token) {
        // store token
        localStorage.setItem("token", res.token);
        localStorage.setItem("role", res.role);

        alert("Login successful");


        // redirect
        window.location.href = "/dashboard";
      } else {
        alert(res.message || "Login failed");
      }
    } catch (error) {
      console.error("Login error:", error);
      alert("Server error");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1 style={{ fontFamily: "arabic" }}>Login</h1>
      <br />

      <form onSubmit={handleLogin}>
        <div style={{ marginBottom: "10px" }}>
          <label>Email</label>
          <br />
          <input
            type="email"
            placeholder="Enter Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{ padding: "8px", width: "250px" }}
          />
        </div>

        <div style={{ marginBottom: "10px" }}>
          <label>Password</label>
          <br />
          <input
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
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
          Login
        </button>
      </form>
    </div>
  );
}