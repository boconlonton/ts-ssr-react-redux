import express from 'express';
import { setRoutes } from './routes';

const app = express();

// Middleware setup
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// API routes setup
setRoutes(app);

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});