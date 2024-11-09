// frontend/pages/index.js

import Link from 'next/link';

const HomePage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      <div className="text-center">
        <h2 className="text-2xl font-semibold text-gray-700 mb-2">
          Welcome to the Blog Management System
        </h2>
        <Link href="/admin" className="text-blue-600 hover:text-blue-800 font-medium transition duration-200">
          Go to Admin Panel
        </Link>
        <div className="mt-4">
          <Link href="/blogs" className="text-blue-600 hover:text-blue-800 font-medium transition duration-200">
            View All Blogs
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HomePage;