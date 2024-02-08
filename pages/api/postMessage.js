// pages/api/postMessage.js
import { connectToDatabase } from '../../utils/mongodb';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const { db } = await connectToDatabase();
      const { message, author } = req.body;

      // Store the message with the author
      const result = await db.collection('messages').insertOne({ message, author });

      res.status(201).json({ message: 'Message posted successfully', _id: result.insertedId });
    } catch (error) {
      console.error('Failed to post message:', error);
      res.status(500).json({ message: 'Failed to post message', error: error.message });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} not allowed`);
  }
}
