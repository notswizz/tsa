// pages/api/getMessages.js
import { connectToDatabase } from '../../utils/mongodb';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const { db } = await connectToDatabase();

      // Retrieve all messages
      const messages = await db.collection('messages').find({}).toArray();

      res.status(200).json({ messages });
    } catch (error) {
      console.error('Failed to get messages:', error);
      res.status(500).json({ message: 'Failed to get messages', error: error.message });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} not allowed`);
  }
}
