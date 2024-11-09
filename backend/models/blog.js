

// backen/models/blog.js


const db = require('../config/db');

const Blog = {
  create: (data, callback) => {
    const sql = 'INSERT INTO blogs SET ?';
    db.query(sql, data, callback);
  },
  update: (id, data, callback) => {
    const sql = 'UPDATE blogs SET ? WHERE id = ?';
    db.query(sql, [data, id], callback);
  },
  delete: (id, callback) => {
    const sql = 'DELETE FROM blogs WHERE id = ?';
    db.query(sql, id, callback);
  },
  getAll: (callback) => {
    const sql = 'SELECT * FROM blogs';
    db.query(sql, callback);
  },
  getById: (id, callback) => {
    const sql = 'SELECT * FROM blogs WHERE id = ?';
    db.query(sql, id, callback);
  },
};

module.exports = Blog;