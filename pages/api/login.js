import { connectToDatabase } from '../../utils/mongodb';
import bcrypt from 'bcrypt';
import { serialize } from 'cookie';

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const { username, password } = req.body;

        // Debug: Log incoming username and password
        console.log("Received login request for:", username);

        if (!username || !password) {
            return res.status(400).json({ message: 'Username and password are required' });
        }

        const lowerUsername = username.toLowerCase();
        console.log("Querying for username:", lowerUsername);

        try {
            const { db } = await connectToDatabase();
            const user = await db.collection('staff').findOne({ username: lowerUsername });

            if (!user) {
                console.log("User not found:", lowerUsername); // Debug: Log when user is not found
                return res.status(404).json({ message: 'User not found' });
            }

            const match = await bcrypt.compare(password, user.password);
            if (match) {
                console.log("Password verified for:", lowerUsername); // Debug: Log successful password verification

                // Set cookie with username
                const cookie = serialize('username', lowerUsername, {
                    httpOnly: false,
                    secure: process.env.NODE_ENV !== 'development',
                    maxAge: 60 * 60 * 24 * 7, // 1 week
                    path: '/',
                });
                res.setHeader('Set-Cookie', cookie);

                // Debug: Log cookie settings
                console.log("Setting cookie for:", lowerUsername, "Cookie:", cookie);

                // Exclude the password field from the returned user info
                const { password, ...userInfo } = user;
                res.status(200).json({ message: 'Login successful', userInfo });
            } else {
                console.log("Password verification failed for:", lowerUsername); // Debug: Log failed password verification
                res.status(401).json({ message: 'Authentication failed' });
            }
        } catch (error) {
            console.error('Failed to fetch user data', error);
            res.status(500).json({ message: 'Failed to fetch user data', error: error.message });
        }
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} not allowed`);
    }
}
