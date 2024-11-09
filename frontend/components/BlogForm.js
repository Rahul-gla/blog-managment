
// frontend/components/BlogForm.js

import { useEffect, useState } from 'react';

const BlogForm = ({ onSubmit, editBlog }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [image, setImage] = useState(null);
  const [videoLink, setVideoLink] = useState('');
  const [metaTitle, setMetaTitle] = useState('');
  const [metaDescription, setMetaDescription] = useState('');
  const [tags, setTags] = useState('');
  const [isPublished, setIsPublished] = useState(true); // Ensure it's a boolean

  useEffect(() => {
    if (editBlog) {
      setTitle(editBlog.title);
      setContent(editBlog.content);
      setVideoLink(editBlog.videoLink);
      setMetaTitle(editBlog.metaTitle);
      setMetaDescription(editBlog.metaDescription);
      setTags(Array.isArray(editBlog.tags) ? editBlog.tags.join(', ') : ''); // Convert array to string
      setIsPublished(editBlog.isPublished === true); // Ensure it's a boolean
    } else {
      // Reset form when not editing
      setTitle('');
      setContent('');
      setImage(null);
      setVideoLink('');
      setMetaTitle('');
      setMetaDescription('');
      setTags('');
      setIsPublished(true);
    }
  }, [editBlog]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = {
      title,
      content,
      image,
      videoLink,
      metaTitle,
      metaDescription,
      tags: tags.split(',').map(tag => tag.trim()), // Convert string back to array
      isPublished,
    };

    onSubmit(formData);
    // Reset the form fields
    setTitle('');
    setContent('');
    setImage(null);
    setVideoLink('');
    setMetaTitle('');
    setMetaDescription('');
    setTags('');
    setIsPublished(true);
  };

  const handleImageChange = (e) => {
    if (e.target.files.length) {
      setImage(e.target.files[0]);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col bg-white p-6 rounded-lg shadow-md">
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
        className="mb-4 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <textarea
        placeholder="Content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        required
        className="mb-4 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <input
        type="file"
        accept="image/*"
        onChange={handleImageChange}
        className="mb-4 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <input
        type="text"
        placeholder="Video Link (optional)"
        value={videoLink}
        onChange={(e) => setVideoLink(e.target.value)}
        className="mb-4 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <input
        type="text"
        placeholder="Meta Title"
        value={metaTitle}
        onChange={(e) => setMetaTitle(e.target.value)}
        className="mb-4 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <textarea
        placeholder="Meta Description"
        value={metaDescription}
        onChange={(e) => setMetaDescription(e.target.value)}
        className="mb-4 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <input
        type="text"
        placeholder="Tags (comma separated)"
        value={tags}
        onChange={(e) => setTags(e.target .value)}
        className="mb-4 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <div className="mb-4">
        <label className="inline-flex items-center">
          <input
            type="checkbox"
            checked={isPublished}
            onChange={(e) => setIsPublished(e.target.checked)}
            className="form-checkbox h-5 w-5 text-blue-600"
          />
          <span className="ml-2 text-gray-700">Publish</span>
        </label>
      </div>
      <button type="submit" className="p-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition duration-200">
        {editBlog ? 'Update' : 'Submit'}
      </button>
    </form>
  );
};

export default BlogForm;