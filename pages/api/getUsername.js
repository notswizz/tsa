// pages/api/getUsername.js
import { connectToDatabase } from '../../utils/mongodb';

export default async function handler(req, res) {
    const { username } = req.query; // Get the username from the query string

    if (!username) {
        return res.status(400).json({ message: 'Username is required' });
    }

    try {
        // Connect to the database
        const { db } = await connectToDatabase();

        // Fetch the user information from the 'staff' collection using the username
        const user = await db.collection('staff').findOne({ name: username });

        if (!user) {
            // If no user is found, return a 404 response
            return res.status(404).json({ message: 'User not found' });
        }

        // Respond with the user information, excluding the _id field
        const { _id, ...userInfo } = user;
        res.status(200).json(userInfo);
    } catch (error) {
        // Log and respond with an error message in case of failure
        console.error('Failed to fetch user data', error);
        res.status(500).json({ message: 'Failed to fetch user data', error: error.message });
    }
}
