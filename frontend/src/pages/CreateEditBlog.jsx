import React, { useEffect, useState } from "react";
import API from "../api";
import { useParams, useNavigate } from "react-router-dom";

export default function CreateEditBlog({ user, edit }) {
  const { id } = useParams();
  const nav = useNavigate();
  const [form, setForm] = useState({ title: "", content: "" });
  const [err, setErr] = useState("");

  useEffect(() => {
    if (edit && id) {
      API.get(`/blogs/${id}`).then(res => setForm({ title: res.data.title, content: res.data.content })).catch(()=>setErr("Cannot load"));
    }
  }, [edit, id]);

  const submit = async (e) => {
    e.preventDefault();
    if (!user) return nav("/login");
    try {
      if (edit) {
        await API.put(`/blogs/${id}`, form);
        nav(`/blogs/${id}`);
      } else {
        const res = await API.post("/blogs", form);
        nav(`/blogs/${res.data._id}`);
      }
    } catch (err) {
      setErr(err?.response?.data?.message || "Error");
    }
  };

  return (
    <div className="card">
      <h2>{edit ? "Edit Blog" : "Create Blog"}</h2>
      <form onSubmit={submit}>
        <input placeholder="Title" value={form.title} onChange={e=>setForm({...form,title:e.target.value})}/>
        <textarea placeholder="Content" value={form.content} onChange={e=>setForm({...form,content:e.target.value})} rows="10"></textarea>
        <button className="btn" type="submit">{edit ? "Save" : "Publish"}</button>
        {err && <p className="error">{err}</p>}
      </form>
    </div>
  );
}
