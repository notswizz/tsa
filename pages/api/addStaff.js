// pages/api/addStaff.js
import { connectToDatabase } from '../../utils/mongodb';
import bcrypt from 'bcrypt';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const { db } = await connectToDatabase();
      let { password, ...rest } = req.body;

      // Hash the password with bcrypt
      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(password, saltRounds);

      // Store the hashed password with the rest of the user data
      const result = await db.collection('staff').insertOne({ ...rest, password: hashedPassword });

      res.status(201).json({ message: 'Staff member added successfully', _id: result.insertedId });
    } catch (error) {
      console.error('Failed to add staff member:', error);
      res.status(500).json({ message: 'Failed to add staff member', error: error.message });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} not allowed`);
  }
}
