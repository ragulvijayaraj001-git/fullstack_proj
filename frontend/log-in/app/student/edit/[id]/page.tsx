"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

const BASE = "http://localhost:5005/api";

export default function Edit() {
  const { id } = useParams();

  const [f, setF] = useState<any>({});

  useEffect(() => {
    fetch(`${BASE}/students/${id}`)
      .then((r) => r.json())
      .then((d) => setF(d.student));
  }, []);

  const handle = (e: any) => {
    setF({ ...f, [e.target.name]: e.target.value });
  };

  const update = async (e: any) => {
    e.preventDefault();

    await fetch(`${BASE}/students/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(f),
    });

    alert("Updated");
  };

  return (
    <form onSubmit={update}>
      <input name="name" value={f.name} onChange={handle} />
      <input name="rollNo" value={f.rollNo} onChange={handle} />
      <input name="department" value={f.department} onChange={handle} />
      <input name="year" value={f.year} onChange={handle} />
      <input name="email" value={f.email} onChange={handle} />
      <input name="phone" value={f.phone} onChange={handle} />

      <button>Update</button>
    </form>
  );
}