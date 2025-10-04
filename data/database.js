const dotenv = require("dotenv");
const DATABASE_NAME = "finalproject"
dotenv.config();

const MongoClient = require("mongodb").MongoClient;

let database;

const initDb = (callback) => {
    if (database) {
        console.log("DB is already initialized!");
        return callback(null, database);
    }
    MongoClient.connect(process.env.MONGODB_URL)
        .then((client) => {
            database = client.db(DATABASE_NAME);
            console.log("Database connected!");
            callback(null, database);
        })
        .catch((err) => {
            callback(err);
        });
};

const getDatabase = () => {
    if (!database) {
        throw Error("Database not initialized");
    }
    return database;
};

module.exports = {
    initDb,
    getDatabase
}