// frontend/components/BlogList.js

import Link from 'next/link';
import { useState } from 'react';

const BlogList = ({ blogs, onEdit, onDelete }) => {
  const [filter, setFilter] = useState('all');

  const filteredBlogs = blogs.filter(blog => {
    if (filter === 'published') return blog.isPublished;
    if (filter === 'draft') return !blog.isPublished;
    return true;
  });

  return (
    <div className="flex flex-col mb-4 p-10">
      <div className="mb-4">
        <label className="mr-2 text-gray-700">Filter by status:</label>
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="border border-gray-300 rounded p-2"
        >
          <option value="all">All</option>
          <option value=" published">Published</option>
          <option value="draft">Draft</option>
        </select>
      </div>

      {filteredBlogs.length === 0 ? (
        <p className="text-gray-600">No blogs found.</p>
      ) : (
        filteredBlogs.map((blog) => (
          <div key={blog.id} className="border border-gray-300 rounded-md p-4 mb-2 bg-white shadow-md">
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
            <div className="mt-2">
              <button onClick={() => onEdit(blog)} className="mr-2 p-1 bg-yellow-500 text-white rounded hover:bg-yellow-600">
                Edit
              </button>
              <button onClick={() => onDelete(blog.id)} className="p-1 bg-red-500 text-white rounded hover:bg-red-600">
                Delete
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default BlogList;