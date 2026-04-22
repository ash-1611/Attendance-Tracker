const path = require('path');
const http = require('http');
const dotenv = require('dotenv');

dotenv.config({ path: path.resolve(__dirname, '../.env') });

const app = require('./app');
const connectDB = require('./config/database');

const PORT = process.env.PORT || 5002;

const startServer = async () => {
  try {
    await connectDB();

    const server = http.createServer(app);

    server.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
      console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
    });

    server.on('error', (error) => {
      if (error.code === 'EADDRINUSE') {
        console.error(
          `Port ${PORT} is already in use. Update PORT in backend/.env or set a different PORT before starting the server.`
        );
        console.error(
          'Deployment best practice: allow the platform to inject a dynamic PORT and keep the fallback only for local development.'
        );
        process.exit(1);
      }

      console.error('Server failed to start:', error);
      process.exit(1);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

startServer();

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
  console.error(`Unhandled Rejection: ${err.message}`);
  process.exit(1);
});
