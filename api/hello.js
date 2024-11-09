// api/hello.js
export default function handler(req, res) {
    if (req.method === 'GET') {
      res.status(200).json({ message: 'Hello from Vercel Functions!' });
    } else {
      res.setHeader('Allow', ['GET']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  }