### backend

# Initialize a New Node.js Project
npm init -y


# Install Dependencies
npm install express cors body-parser dotenv mysql2 multer

# Create Directory Structure
mkdir config controllers models routes uploads


# Set Up Your Database:
CREATE TABLE blogs (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  content TEXT NOT NULL,
  image VARCHAR(255),
  videoLink VARCHAR(255),
  metaTitle VARCHAR(255),
  metaDescription TEXT,
  tags VARCHAR(255),
  isPublished BOOLEAN DEFAULT FALSE,
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);





# Run the Server:
node server.js



# API Endpoints
GET /api/blogs: Retrieve all blog posts
GET /api/blogs/:id: Retrieve a single blog post by ID
POST /api/blogs: Create a new blog post
PUT /api/blogs/:id: Update an existing blog post
