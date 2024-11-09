// frontend/pages/_app.js

import '../styles/global.css';

function MyApp({ Component, pageProps }) {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <header className="bg-black shadow">
        <div className="container mx-auto p-4">
          <h1 className="text-2xl font-bold text-white">My Blog Management System</h1>
        </div>
      </header>
      <main className="flex-grow container mx-auto p-4">
        <Component {...pageProps} />
      </main>
      <footer className="bg-black shadow mt-4">
        <div className="container mx-auto p-4 text-center text-white">
          &copy; {new Date().getFullYear()} My Blog. All rights reserved.
        </div>
      </footer>
    </div>
  );
}

export default MyApp;