import { connectToDatabase } from '../../utils/mongodb';

export default async function handler(req, res) {
    const { username } = req.query;
    console.log("Querying for username:", username); // Debugging log

    if (!username) {
        return res.status(400).json({ message: 'Username is required' });
    }

    try {
        const { db } = await connectToDatabase();
        const user = await db.collection('staff').findOne({ username: username }); // Ensure this matches your document structure

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const { _id, ...userInfo } = user;
        res.status(200).json(userInfo);
    } catch (error) {
        console.error('Failed to fetch user data', error);
        res.status(500).json({ message: 'Failed to fetch user data', error: error.message });
    }
}
