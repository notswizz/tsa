import { connectToDatabase } from '../../utils/mongodb';

export default async function handler(req, res) {
    let { username } = req.query; // Destructure username from query

    if (!username) {
        return res.status(400).json({ message: 'Username is required' });
    }

    // Convert username to lowercase
    username = username.toLowerCase();
    console.log("Querying for username:", username); // Debugging log with lowercase username

    try {
        const { db } = await connectToDatabase();
        // Search for username in lowercase
        const user = await db.collection('staff').findOne({ username });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Exclude the _id field from the returned user info
        const { _id, ...userInfo } = user;
        res.status(200).json(userInfo);
    } catch (error) {
        console.error('Failed to fetch user data', error);
        res.status(500).json({ message: 'Failed to fetch user data', error: error.message });
    }
}
