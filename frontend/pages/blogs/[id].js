import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';

const BlogDisplay = () => {
  const router = useRouter();
  const { id } = router.query; // Get the ID from the URL
  const [blog, setBlog] = useState(null);
  const [error, setError] = useState(null); // State to handle errors
  const [loading, setLoading] = useState(true); // State to handle loading

  const fetchBlog = async () => {
    if (!id) return; // If ID is not available, do not fetch

    // Ensure we get the correct ID
    const blogId = Array.isArray(id) ? id[0] : id;

    console.log('Blog ID:', blogId); // Log the blog ID being fetched

    try {
      const response = await fetch(`http://localhost:5000/api/blogs/${blogId}`); // Use blogId here
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      console.log('Blog Data:', data); // Log the fetched blog data

      // Check if data is an array and set the first item as the blog
      if (Array.isArray(data) && data.length > 0) {
        setBlog(data[0]); // Set the first blog object
      } else {
        setError('No blog found.');
      }
    } catch (error) {
      console.error('Error fetching blog:', error);
      setError('Failed to fetch blog data');
    } finally {
      setLoading(false); // Set loading to false after fetching
    }
  };

  useEffect(() => {
    fetchBlog();
  }, [id]); // Fetch when ID changes

  if (loading) {
    return <div className="flex justify-center items-center h-screen text-lg">Loading...</div>;
  }

  if (error) {
    console.log('Error:', error); // Log the error if there is one
    return <div className="flex justify-center items-center h-screen text-lg">{error}</div>;
  }

  if (!blog) {
    return <div className="flex justify-center items-center h-screen text-lg">No blog found.</div>;
  }

  return (
    <>
      <Head>
        <title>{blog.metaTitle || blog.title}</title>
        <meta name="description" content={blog.metaDescription} />
      </Head>

      <div className="max-w-3xl mx-auto p-8 bg-white rounded-lg shadow-lg">
        <h2 className="text-4xl font-extrabold mb-4 text-gray-800">{blog.title}</h2>
        <p className="text-gray-500 text-sm mb-4">
          Created on: {new Date(blog.created_at).toLocaleDateString()}
        </p>
        <p className="text-gray-700 leading-relaxed mb-6"><strong>Content:</strong> {blog.content}</p>

        {blog.image && (
          <img src={blog.image} alt={blog.title} className="mt-4 rounded-lg shadow-md" />
        )}
        {blog.videoLink && (
          <div className="mt-4">
            <iframe
              src={blog.videoLink}
              title={blog.title}
              className="w-full h-64 rounded-lg shadow-md"
              allowFullScreen
            ></iframe>
          </div>
        )}

        {/* Display additional fields if needed */}
        {blog.metaDescription && (
          <p className="text-gray-600 mt-4"><strong>Description:</strong> {blog.metaDescription}</p>
        )}
        {blog.tags && (
          <p className="text-gray-600 mt-4"><strong>Tags:</strong> {blog.tags}</p>
        )}
        <p className="text-gray-500 text-sm mt-2">
          Updated on: {new Date(blog.updated_at).toLocaleDateString()}
        </p>
        <p className="text-gray-500 text-sm">Published: {blog.isPublished === "true" ? "Yes" : "No"}</p>
      </div>
    </>
  );
};

export default BlogDisplay;