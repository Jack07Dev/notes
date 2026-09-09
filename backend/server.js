const dotenv = require('dotenv');
const connectDB = require('./src/config/db');
const app = require('./src/app');

dotenv.config();

const PORT = process.env.PORT || 5000;

const startServer = async () => {
    try {
        await connectDB();

        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
            // You can also log the API URL for easier access
            console.log(`API URL: http://localhost:${PORT}/api/notes`);
        });
    } catch (error) {
        console.error('Failed to start server:', error.message);
        process.exit(1);
    }
};

startServer();