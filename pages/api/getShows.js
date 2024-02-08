// pages/api/getShows.js
import { connectToDatabase } from '../../utils/mongodb';

export default async function handler(req, res) {
    // No need for username since we're fetching all shows
    try {
        const { db } = await connectToDatabase();
        const shows = await db.collection('shows').find({}).toArray(); // Adjust 'shows' if your collection has a different name

        // If you want to exclude the _id from the results:
        const formattedShows = shows.map(({ _id, ...showData }) => showData);

        res.status(200).json(formattedShows);
    } catch (error) {
        console.error('Failed to fetch show data', error);
        res.status(500).json({ message: 'Failed to fetch show data', error: error.message });
    }
}
