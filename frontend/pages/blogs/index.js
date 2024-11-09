// frontend/pages/blogs/index.js

import { useEffect, useState } from 'react';
import Link from 'next/link';

const BlogsPage = () => {
  const [blogs, setBlogs] = useState([]);
  const [error, setError] = useState(null);

  const fetchBlogs = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/blogs');
      if (!response.ok) {
        throw new Error('Failed to fetch blogs');
      }
      const data = await response.json();
      setBlogs(data);
    } catch (err) {
      setError(err.message);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  if (error) {
    return <div className="flex justify-center items-center h-screen text-lg">{error}</div>;
  }

  if (!blogs.length) {
    return <div className="flex justify-center items-center h-screen text-lg">No blogs found.</div>;
  }

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-3xl font-bold mb-4 text-gray-800">All Blogs</h1>
      {blogs.map((blog) => (
        <div key={blog.id} className="border border-gray-300 rounded-md p-4 mb-2 bg-gray-50 shadow-sm">
          <h2 className="text-xl font-bold text-gray-800">
            <Link href={`/blogs/${blog.id}`} className="text-blue-600 hover:underline">
              {blog.title}
            </Link>
          </h2>
          <p className="text-gray-600">{blog.content}</p>
          <p className="text-gray-500 text-sm">
            Status: <span className={blog.isPublished ? 'text-green-500' : 'text-red-500'}>
              {blog.isPublished ? 'Published' : 'Draft'}
            </span>
          </p>
          <p className="text-gray-500 text-sm">
            Created on: {new Date(blog.created_at).toLocaleDateString()}
          </p>
        </div>
      ))}
    </div>
  );
};

export default BlogsPage;