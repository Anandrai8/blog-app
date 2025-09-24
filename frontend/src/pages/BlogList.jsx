import React, { useEffect, useState } from "react";
import API from "../api";
import { Link, useSearchParams } from "react-router-dom";

export default function BlogList() {
  const [data, setData] = useState({ blogs: [], total: 0, page: 1, pages: 1 });
  const [loading, setLoading] = useState(true);
  const [q] = useSearchParams();
  const page = parseInt(q.get("page")) || 1;

  useEffect(() => {
    setLoading(true);
    API.get(`/blogs?page=${page}&limit=5`).then(res => {
      setData(res.data);
    }).catch(()=>{}).finally(()=>setLoading(false));
  }, [page]);

  if (loading) return <div>Loading...</div>;
  return (
    <>
      <h2>Latest blogs</h2>
      {data.blogs.length === 0 && <p>No blogs yet.</p>}
      {data.blogs.map(b => (
        <div className="card" key={b._id}>
          <h3><Link to={`/blogs/${b._id}`}>{b.title}</Link></h3>
          <p className="meta">By: {b.author?.name || b.author?.email} — {new Date(b.createdAt).toLocaleString()}</p>
          <p>{b.content.slice(0, 180)}{b.content.length > 180 ? "..." : ""}</p>
        </div>
      ))}
      <div className="pagination">
        {Array.from({ length: data.pages }, (_, i) => i+1).map(n => (
          <Link key={n} to={`/?page=${n}`} className={`page ${n===data.page ? 'active' : ''}`}>{n}</Link>
        ))}
      </div>
    </>
  );
}
