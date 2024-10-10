const { DataTypes } = require('sequelize');
const sequelize = require('../config/postgres');

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

Report.sync();

// Geolocation table with a foreign key to the report table, latitude and longitude columns
const Geolocation = sequelize.define('Geolocation', {
    reportId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Report,
            key: 'id'
        }
    },
    latitude: {
        type: DataTypes.DECIMAL,
        allowNull: false
    },
    longitude: {
        type: DataTypes.DECIMAL,
        allowNull: false
    },
    address: {
        type: DataTypes.STRING,
        allowNull: false
    }
});

Geolocation.sync();

// item types table with id and type_name columns
const ItemType = sequelize.define('ItemType', {
    type_name: {
        type: DataTypes.STRING,
        allowNull: false
    }
});

ItemType.sync();

// ===========================================
// read, write, update, delete, search functions here



module.exports = Report;
