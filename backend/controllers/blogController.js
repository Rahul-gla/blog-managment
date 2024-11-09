

// backen/controllers/blogController.js


const Blog = require('../models/blog');

exports.createBlog = (req, res) => {
  const blogData = {
      title: req.body.title,
      content: req.body.content,
      image: req.file ? req.file.path : null, // Get the path of the uploaded file
      videoLink: req.body.videoLink,
      metaTitle: req.body.metaTitle,
      metaDescription: req.body.metaDescription,
      tags: req.body.tags,
      isPublished: req.body.isPublished,
  };

  Blog.create(blogData, (err, result) => {
      if (err) {
          console.error(err); // Log the error for debugging
          return res.status(500).json({ error: 'Error creating blog post' });
      }
      res.status(201).json({ message: 'Blog post created', id: result.insertId });
  });
};

exports.updateBlog = (req, res) => {
  const { id } = req.params;

  // Prepare the blog data
  const blogData = {
    title: req.body.title,
    content: req.body.content,
    image: req.file ? req.file.path : null, // Handle file upload
    videoLink: req.body.videoLink,
    metaTitle: req.body.metaTitle,
    metaDescription: req.body.metaDescription,
    tags: req.body.tags,
    isPublished: req.body.isPublished,
  };

  Blog.update(id, blogData, (err) => {
    if (err) {
      console.error(err); // Log the error for debugging
      return res.status(500).json({ error: 'Error updating blog post' });
    }
    res.status(200).json({ message: 'Blog post updated' });
  });
};

exports.deleteBlog = (req, res) => {
  const { id } = req.params;
  Blog.delete(id, (err) => {
    if (err) return res.status(500).json({ error: 'Error deleting blog post' });
    res.status(200).json({ message: 'Blog post deleted' });
  });
};

exports.getAllBlogs = (req, res) => {
  Blog.getAll((err, results) => {
    if (err) return res.status(500).json({ error: 'Error fetching blog posts' });
    res.status(200).json(results);
  });
};

// backen/controllers/blogController.js

// backen/controllers/blogController.js

// backen/controllers/blogController.js

exports.getBlogById = (req, res) => {
  const { id } = req.params;
  Blog.getById(id, (err, result) => {
    if (err) return res.status(500).json({ error: 'Error fetching blog post' });
    res.status(200).json(result);
  });
};