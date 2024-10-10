require('dotenv').config(); // To load environment variables from .env file

const config = {
    development: {
        app: {
            port: process.env.PORT || 3000
        },
        mongodb: {
            url: process.env.MONGODB_URI || 'mongodb://localhost:27017/lostandfound'
        },
        postgres: {
            username: process.env.POSTGRES_USER || 'postgres',
            password: process.env.POSTGRES_PASSWORD || 'yourpassword',
            database: process.env.POSTGRES_DB || 'lostandfound_db',
            host: process.env.POSTGRES_HOST || 'localhost',
            dialect: 'postgres'
        },
        jwt: {
            secret: process.env.JWT_SECRET || 'yourSecretKey'
        },
        aws: {
            s3Bucket: process.env.AWS_S3_BUCKET || 'your-s3-bucket',
            accessKeyId: process.env.AWS_ACCESS_KEY_ID,
            secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
            region: process.env.AWS_REGION || 'us-east-1'
        }
    },
    production: {
        app: {
            port: process.env.PORT
        },
        mongodb: {
            url: process.env.MONGODB_URI
        },
        postgres: {
            username: process.env.POSTGRES_USER,
            password: process.env.POSTGRES_PASSWORD,
            database: process.env.POSTGRES_DB,
            host: process.env.POSTGRES_HOST,
            dialect: 'postgres'
        },
        jwt: {
            secret: process.env.JWT_SECRET
        },
        aws: {
            s3Bucket: process.env.AWS_S3_BUCKET,
            accessKeyId: process.env.AWS_ACCESS_KEY_ID,
            secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
            region: process.env.AWS_REGION
        }
    }
};

module.exports = config[process.env.NODE_ENV || 'development'];
