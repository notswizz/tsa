// pages/api/submit.js

import { connectToDatabase } from '../../utils/mongodb';

export default async function handler(req, res) {
    // Check if the request method is POST
    if (req.method === 'POST') {
        try {
            // Connect to the database
            const { db } = await connectToDatabase();
            
            // Assuming the data to be inserted is in the request body
            const data = req.body;

            // Specify the collection you want to insert into
            const collection = db.collection('staff');

            // Insert the data into the collection
            const result = await collection.insertOne(data);

            // Respond with a success message
            res.status(201).json({ message: 'Data inserted successfully', result: result });
        } catch (error) {
            // Log and respond with an error message in case of failure
            console.error('Failed to insert data', error);
            res.status(500).json({ message: 'Failed to insert data', error: error.message });
        }
    } else {
        // If the request method is not POST, respond with an error message
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
