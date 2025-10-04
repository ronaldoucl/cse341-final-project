const { DATABASE } = require("../config/constants");

const dotenv = require("dotenv");
dotenv.config();

// Import MongoDB client for establishing connections
const MongoClient = require("mongodb").MongoClient;

let database;

/**
 * Initializes the MongoDB connection if not already initialized.
 * Ensures a single shared instance of the database is used across the app.
 */
const initDb = (callback) => {
    if (database) {
        console.log(`DB '${DATABASE.NAME}' is already initialized!`);
        return callback(null, database);
    }
    MongoClient.connect(process.env.MONGODB_URL)
        .then((client) => {
            database = client.db(DATABASE.NAME);
            console.log(`Database '${DATABASE.NAME}' connected!`);
            callback(null, database);
        })
        .catch((err) => {
            callback(err);
        });
};

/**
 * Retrieves the active MongoDB instance.
 * Throws an error if the database has not been initialized.
 * 
 * @returns {Object} MongoDB database instance
 */
const getDatabase = () => {
    if (!database) {
        throw Error(`Database '${DATABASE.NAME}' not initialized`);
    }
    return database;
};

module.exports = {
    initDb,
    getDatabase
}