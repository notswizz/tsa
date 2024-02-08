import { connectToDatabase } from '../../utils/mongodb';

export default async function handler(req, res) {
    if (req.method === 'POST') {
        try {
            const { db } = await connectToDatabase();
            
            // Ensure the request body contains show data
            const showData = req.body;

            // Use the 'shows' collection for storing show details
            const collection = db.collection('shows');

            // Insert the show data into the collection
            const result = await collection.insertOne(showData);

            // Respond with success status and result of the operation
            res.status(201).json({ message: 'Show added successfully', result: result });
        } catch (error) {
            console.error('Failed to add show', error);
            res.status(500).json({ message: 'Failed to add show', error: error.message });
        }
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
