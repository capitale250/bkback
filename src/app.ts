import express from 'express';
import mongoose ,  {ConnectOptions }from 'mongoose';
import env from "dotenv";
import cors from "cors";
import { Farmer } from './models/Farmer';
import helpers from "./utils/helpers";



import orderRoutes from './routes/orderRoutes';

const app = express();
env.config();
app.use(cors());
app.use(express.json());
app.use('/api', orderRoutes);
app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*'); // Allow requests from any origin (you can restrict this to specific origins)
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, PATCH, OPTIONS');
    next();
});

const PORT = process.env.PORT || 3000;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/farmer_ordering_system';

async function seedAdmin() {
    // Check if admin already exists
    const email="admin@gmail.com"
    const user = await Farmer.findOne({email}).exec()

    if (!user) {
        // Create the admin role
        const password="1234"
        const pass = await helpers.hashPassword(password);
        await Farmer.create({
            email: email,
            pass: pass,
            role: "admin",
            landSize:0
        });
        console.log('Admin role seeded successfully.');
    } else {
        console.log('Admin role already exists.');
    }
}

mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}as ConnectOptions).then(() => {
  console.log('Connected to MongoDB');
  seedAdmin()
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}).catch(error => {
  console.log('MongoDB connection error:', error.message);
});