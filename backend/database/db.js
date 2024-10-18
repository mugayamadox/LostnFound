import { readFileSync } from 'fs';
import { MongoClient, ServerApiVersion } from 'mongodb';

import dotenv from 'dotenv';
dotenv.config();

import { Sequelize } from 'sequelize';

// Create the Sequelize instance
const sequelize = new Sequelize(process.env.POSTGRES_DB, process.env.POSTGRES_USER, process.env.POSTGRES_PASSWORD, {
    host: process.env.POSTGRES_HOST,
    dialect: 'postgres',
    port: process.env.POSTGRES_PORT,
    dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: true,
            ca: readFileSync(process.env.PG_CA_CERT).toString(), // Ensure the CA certificate is read properly
        },
    },  
});

// Function to connect to PostgreSQL
async function connectPG(callback) {
    try {
        await sequelize.authenticate();
        console.log('Connected to PostgreSQL via Sequelize');
        if (callback) {
            await callback(sequelize); // Call the callback function if it is provided
        }
    } catch (err) {
        console.error('Sequelize connection error', err);
    }
}

// MongoDB Connection

// create an async function to connect to the database
async function connectMD() {
    const uri = process.env.MONGODB_URI;
    if (!uri) {
        throw new Error('MONGODB_URI is not defined in the environment variables');
    }

    const client = new MongoClient(uri, {
        serverApi: {
          version: ServerApiVersion.v1,
          strict: true,
          deprecationErrors: true,
        }
    });

    try {
        await client.connect();
        console.log('Connected to MongoDB');
        // Perform any additional setup or operations here
    } catch (err) {
        console.error('MongoDB connection error', err);
    } finally {
        await client.close();
    }
}

const syncDatabase = async () => {
    try {
        const { User } = await import('../models/User.js');
        const { Geolocation } = await import('../models/Geolocation.js');
        const { Report } = await import('../models/Report.js');
        const { Item, Comment } = await import('../models/Item.js');

        await User.sync();
        await Geolocation.sync();
        await Report.sync();
        await Item.sync();
        await Comment.sync();
        
        console.log('Database synced successfully');
    } catch (error) {
        console.error('Error syncing database:', error);
    }
};

export { sequelize, connectMD, syncDatabase, connectPG };