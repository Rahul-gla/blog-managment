// frontend/pages/admin/index.js

import { useEffect, useState } from 'react';
import BlogForm from '../../components/BlogForm';
import BlogList from '../../components/BlogList';

const AdminPage = () => {
  const [blogs, setBlogs] = useState([]);
  const [editBlog, setEditBlog] = useState(null); // State for editing a blog

  const fetchBlogs = async () => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}`);
    const data = await response.json();
    setBlogs(data);
  };

  const handleBlogSubmit = async (blog) => {
    const formData = new FormData();
    formData.append('title', blog.title);
    formData.append('content', blog.content);
    if (blog.image) {
      formData.append('image', blog.image);
    }
    formData.append('videoLink', blog.videoLink);
    formData.append('metaTitle', blog.metaTitle);
    formData.append('metaDescription', blog.metaDescription);
    formData.append('tags', blog.tags.join(',')); // Convert array back to comma-separated string
    formData.append('isPublished', blog.isPublished);

    if (editBlog) {
      // Update existing blog
      await fetch(`http://localhost:5000/api/blogs/${editBlog.id}`, {
        method: 'PUT',
        body: formData,
      });
      setEditBlog(null); // Reset edit state
    } else {
      // Create new blog
      await fetch(`${process.env.NEXT_PUBLIC_API_URL}`, {
        method: 'POST',
        body: formData,
      });
    }
    fetchBlogs();
  };

  const handleEdit = (blog) => {
    setEditBlog(blog); // Set the blog to be edited
  };

  const handleDelete = async (id) => {
    await fetch(`http://localhost:5000/api/blogs/${id}`, {
      method: 'DELETE',
    });
    fetchBlogs();
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  return (
    <div className="flex flex-col items-center p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Admin Panel</h1>
      <BlogForm onSubmit={handleBlogSubmit} editBlog={editBlog} />
      <BlogList blogs={blogs} onEdit={handleEdit} onDelete={handleDelete} />
    </div>
  );
};

export default AdminPage;