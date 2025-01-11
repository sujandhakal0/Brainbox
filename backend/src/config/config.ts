import dotenv from 'dotenv'

dotenv.config()

// Export the variables for use in the app
export const PORT = process.env.PORT || 3000;
export const MONGO_URI = process.env.MONGO_URI || '';
export const JWT_SECRET = process.env.JWT_SECRET || '';