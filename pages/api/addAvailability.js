import { connectToDatabase } from '../../utils/mongodb';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const { db } = await connectToDatabase();
      const { username, selectedShowId, availability } = req.body;

      // Parse the composite key to extract location and month
      // Assuming selectedShowId format is "location-month"
      const [location, month] = selectedShowId.split('-');

      // Define the query for finding an existing availability entry
      const query = {
        username,
        'showDetails.location': location,
        'showDetails.month': month,
      };

      // Define the update document
      const updateDoc = {
        $set: {
          username,
          showDetails: { location, month }, // Storing these details for easier querying and readability
          availability,
        },
      };

      // Attempt to update an existing entry or insert a new one if it doesn't exist
      const updateResult = await db.collection('availability').updateOne(
        query,
        updateDoc,
        { upsert: true }
      );

      // Check the result of the update operation to determine if it was an insert or update
      if (updateResult.matchedCount === 0 && updateResult.upsertedCount === 1) {
        res.status(201).json({ message: 'New availability added successfully' });
      } else {
        res.status(200).json({ message: 'Availability updated successfully', details: updateResult });
      }
    } catch (error) {
      console.error('Failed to add or update availability:', error);
      res.status(500).json({ message: 'Failed to add or update availability', error: error.message });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} not allowed`);
  }
}
