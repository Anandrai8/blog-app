import React, { useState } from "react";
import API from "../api";
import { useNavigate } from "react-router-dom";

export default function Signup({ onAuth }) {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [err, setErr] = useState("");
  const nav = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post("/register", form); // <-- fixed here
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      onAuth && onAuth(res.data.user);
      nav("/");
    } catch (error) {
      setErr(error?.response?.data?.message || "Error");
    }
  };

  return (
    <div className="card">
      <h2>Sign up</h2>
      <form onSubmit={submit}>
        <input placeholder="Name" value={form.name} onChange={e => setForm({...form, name: e.target.value})}/>
        <input placeholder="Email" value={form.email} onChange={e => setForm({...form, email: e.target.value})}/>
        <input placeholder="Password" type="password" value={form.password} onChange={e => setForm({...form, password: e.target.value})}/>
        <button className="btn" type="submit">Create account</button>
        {err && <p className="error">{err}</p>}
      </form>
    </div>
  );
}
