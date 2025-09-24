import React, { useEffect, useState } from "react";
import API from "../api";
import { useParams, Link, useNavigate } from "react-router-dom";

export default function BlogDetail({ user }) {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const nav = useNavigate();

  useEffect(() => {
    API.get(`/blogs/${id}`).then(res => setBlog(res.data)).catch(()=>{});
  }, [id]);

  const handleDelete = async () => {
    if (!confirm("Delete this blog?")) return;
    try {
      await API.delete(`/blogs/${id}`);
      nav("/");
    } catch (err) {
      alert(err?.response?.data?.message || "Error");
    }
  };

  if (!blog) return <div>Loading...</div>;
  const isAuthor = user && (user.id === blog.author?._id || user.id === blog.author?._id?.toString());

  return (
    <div className="card">
      <h2>{blog.title}</h2>
      <p className="meta">By {blog.author?.name || blog.author?.email} — {new Date(blog.createdAt).toLocaleString()}</p>
      <div>{blog.content.split("\n").map((p,i)=>(<p key={i}>{p}</p>))}</div>
      {isAuthor && (
        <div className="actions">
          <Link to={`/edit/${blog._id}`} className="btn">Edit</Link>
          <button className="btn btn-danger" onClick={handleDelete}>Delete</button>
        </div>
      )}
    </div>
  );
}
