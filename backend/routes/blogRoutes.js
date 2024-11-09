const express = require('express');
const router = express.Router();
const multer = require('multer');
const db = require('../config/db'); // Adjust the path as needed

const blogController = require('../controllers/blogController');

// Set up multer for file uploads
const upload = multer({ dest: 'uploads/' }); // Specify the destination folder

router.post('/', upload.single('image'), blogController.createBlog);
// router.put('/:id', blogController.updateBlog);
router.put('/:id', upload.single('image'), blogController.updateBlog);
router.delete('/:id', blogController.deleteBlog);
router.get('/', blogController.getAllBlogs);
router.get('/:id', blogController.getBlogById);

router.get('/blogs/:id', (req, res) => {
    const { id } = req.params;
    db.query('SELECT * FROM blogs WHERE id = ?', [id], (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        if (results.length === 0) return res.status(404).json({ error: 'Blog not found' });
        res.json(results[0]);
    });
});

module.exports = router;



