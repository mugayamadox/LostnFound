import { MongoClient } from "mongodb";
import config from '../config';

const uri = config.mongoUri;

// Create a sample report
const items = [
    {
    name: "Laptop",
    description: "A laptop found in the library",
    status: "Found",
    updatedAt: new Date()
    },
    {
    name: "mobile phone",
    description: "A laptop found in the library",
    status: "Found",
    updatedAt: new Date()
    }
];

const images = [
    { 
        url: "https://example.com/image1.jpg", 
        metadata = "A laptop found in the library", 
        uploadedAt: new Date() 
    },
    {   
        url: "https://example.com/image2.jpg", 
        metadata = "A laptop found in the library", 
        uploadedAt: new Date() 
    }
];

const comments = [
    { content: "This is a comment" },
    { content: "This is another comment" }
];

const report = {
    status: "found",
    title: "Laptop found in the library",
    description: "A laptop found in the library",
    createdAt: new Date(),
};

const geolocation = {
    latitude: 37.7749,
    longitude: -122.4194,
    address: "San Francisco, CA"
};

const mongoose = require('mongoose');
const { DataTypes } = require('sequelize');
const sequelize = require('../config/postgres');
const Report = require('../models/Report'); 
const Geolocation = require('../models/Geolocation');
const Item = require('../models/Item'); 
const Comment = require('../models/Comment');
const Image = require('../models/Image');

// function to create a report with images, geolocation and items
async function createReport(report, images, geolocation, items, comments) {
    const transaction = await sequelize.transaction();
    const client = await mongoose.connect('mongodb://localhost:27017/yourdbname', { useNewUrlParser: true, useUnifiedTopology: true });

    try {
        // Insert the report into the "reports" table in PostgreSQL
        const reportResult = await Report.create(report, { transaction });

        // Insert the images into the "images" collection in MongoDB
        const imagesCollection = client.db().collection("images");
        const imagesResult = await imagesCollection.insertMany(images);

        // Insert the geolocation into the "geolocations" table in PostgreSQL
        const geolocationResult = await Geolocation.create({ ...geolocation, reportId: reportResult.id }, { transaction });

        // Insert the items into the "items" table in PostgreSQL
        for (const item of items) {
            await Item.create({ ...item, reportId: reportResult.id }, { transaction });
        }

        // Insert the comments into the "comments" table in PostgreSQL
        for (const comment of comments) {
            await Comment.create({ ...comment, reportId: reportResult.id }, { transaction });
        }

        // Commit the transaction
        await transaction.commit();

        // Return the created report
        return reportResult;
    } catch (error) {
        // Rollback the transaction in case of an error
        await transaction.rollback();

        // Throw the error
        throw error;
    } finally {
        // Close the MongoDB client connection
        await client.disconnect();
    }
}

// ===========================================
// function to get requested report with corresponding images, geolocation and items
async function getReport(reportId) {
    const report = await Report.findByPk(reportId);
    if (!report) {
        throw new Error(`Report with id ${reportId} not found`);
    }

    const imagesCollection = client.db().collection("images");
    const images = await imagesCollection.find({ reportId: reportId }).toArray();

    const geolocation = await Geolocation.findOne({ reportId: reportId });

    const items = await Item.findAll({ where: { reportId } });

    const comments = await Comment.findAll({ where: { reportId } });

    return { report, images, geolocation, items, comments };
}

// ===========================================
// function to update a report with images, geolocation and items
async function updateReport(reportId, report, images, geolocation, items, comments) {
    const transaction = await sequelize.transaction();
    const client = await mongoose.connect('mongodb://localhost:27017/yourdbname', { useNewUrlParser: true, useUnifiedTopology: true });

    try {
        // Update the report in the "reports" table in PostgreSQL
        await Report.update(report, { where: { id: reportId }, transaction });

        // Update the images in the "images" collection in MongoDB
        const imagesCollection = client.db().collection("images");
        await imagesCollection.deleteMany({ reportId });
        await imagesCollection.insertMany(images);

        // Update the geolocation in the "geolocations" table in PostgreSQL
        await Geolocation.update(geolocation, { where: { reportId }, transaction });

        // Update the items in the "items" table in PostgreSQL
        for (const item of items) {
            await Item.update(item, { where: { reportId }, transaction });
        }

        // Update the comments in the "comments" table in PostgreSQL
        for (const comment of comments) {
            await Comment.update(comment, { where: { reportId }, transaction });
        }

        // Commit the transaction
        await transaction.commit();

        // Return the updated report
        return await getReport(reportId);
    } catch (error) {
        // Rollback the transaction in case of an error
        await transaction.rollback();

        // Throw the error
        throw error;
    } finally {
        // Close the MongoDB client connection
        await client.disconnect();
    }
}

// ===========================================
// function to delete a report with corresponding images, geolocation and items
async function deleteReport(reportId) {
    const transaction = await sequelize.transaction();
    const client = await mongoose.connect('mongodb://localhost:27017/yourdbname', { useNewUrlParser: true, useUnifiedTopology: true });

    try {
        // Delete the report from the "reports" table in PostgreSQL
        await Report.destroy({ where: { id: reportId }, transaction });

        // Delete the images from the "images" collection in MongoDB
        const imagesCollection = client.db().collection("images");
        await imagesCollection.deleteMany({ reportId });

        // Delete the geolocation from the "geolocations" table in PostgreSQL
        await Geolocation.destroy({ where: { reportId }, transaction });

        // Delete the items from the "items" table in PostgreSQL
        await Item.destroy({ where: { reportId }, transaction });

        // Delete the comments from the "comments" table in PostgreSQL
        await Comment.destroy({ where: { reportId }, transaction });

        // Commit the transaction
        await transaction.commit();
    } catch (error) {
        // Rollback the transaction in case of an error
        await transaction.rollback();

        // Throw the error
        throw error;
    } finally {
        // Close the MongoDB client connection
        await client.disconnect();
    }
}

// ===========================================
// function to search a report with corresponding images, geolocation and items basing on the query
async function searchReport(query) {
    const reports = await Report.findAll({ where: query });

    const result = [];
    for (const report of reports) {
        const imagesCollection = client.db().collection("images");
        const images = await imagesCollection.find({ reportId: report.id }).toArray();

        const geolocation = await Geolocation.findOne({ reportId: report.id });

        const items = await Item.findAll({ where: { reportId: report.id } });

        const comments = await Comment.findAll({ where: { reportId: report.id } });

        result.push({ report, images, geolocation, items, comments });
    }

    return result;
}

module.exports = itemFunctions;