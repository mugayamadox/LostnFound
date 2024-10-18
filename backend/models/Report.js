import { DataTypes } from 'sequelize';
import { sequelize } from '../database/db.js';

// Report table with a description, type, userId, and location columns
const Report = sequelize.define('Report', {
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Users',
            key: 'id'
        }
    },
    status: {
        type: DataTypes.ENUM('lost', 'found'),
        allowNull: false
    },
    geolocationId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Geolocation',
            key: 'id'
        }
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    createdAt: {
        type: DataTypes.DATE,
        allowNull: false
    },
    updatedAt: {
        type: DataTypes.DATE,
        allowNull: false
    }
});


// item types table with id and type_name columns
const ItemType = sequelize.define('ItemType', {
    type_name: {
        type: DataTypes.STRING,
        allowNull: false
    }
});

export { Report, ItemType };