// pages/api/getUser.js
import { connectToDatabase } from '../../utils/mongodb';

export default async function handler(req, res) {
    let { username } = req.query; // Destructure username from query

    if (!username) {
        return res.status(400).json({ message: 'Username is required' });
    }

    username = username.toLowerCase(); // Convert username to lowercase for consistency

    try {
        const { db } = await connectToDatabase();
        const user = await db.collection('staff').findOne({ username });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Assume more info is fetched and exclude the _id field from the result
        const { _id, ...userInfo } = user;
        res.status(200).json(userInfo);
    } catch (error) {
        console.error('Failed to fetch user data', error);
        res.status(500).json({ message: 'Failed to fetch user data', error: error.message });
    }
}
