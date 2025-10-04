/**
 * @author Lucas Castillo
 */

const { COLLECTIONS } = require("../config/constants");

const mongodb = require("../data/database.js");
const ObjectId = require("mongodb").ObjectId;

/**
 * @desc    Retrieve all users from the database
 * @route   GET /users
 * @access  Public (sensitive information)
 */
const getAll = async (req, res) => {
  //#swagger.tags=['Users']
  const result = await mongodb.getDatabase().collection(COLLECTIONS.USERS).find();
  const users = await result.toArray();

  // Never send back passwords in a real app
  const safeUsers = users.map(({ password, ...rest }) => rest);

  res.status(200).json(safeUsers);
};

/**
 * @desc    Retrieve a single user by ID
 * @route   GET /users/:id
 * @access  Public (sensitive information)
 */
const getSingle = async (req, res) => {
  //#swagger.tags=['Users']
  const { id } = req.params;

  if (!ObjectId.isValid(id)) {
    return res.status(400).json({ error: "Invalid user ID format." });
  }

  const userId = new ObjectId(id);
  const user = await mongodb.getDatabase().collection(COLLECTIONS.USERS).findOne({ _id: userId });

  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }

  // Hide password before sending response
  const { password, ...safeUser } = user;

  res.status(200).json(safeUser);
};

/**
 * @desc    Create a new user
 * @route   POST /users
 * @access  Public (sensitive information)
 */
const createUser = async (req, res) => {
  //#swagger.tags=['Users']
  const user = {
    username: req.body.username, 
    email: req.body.email, 
    password: req.body.password, 
    phone: req.body.phone, 
    address: req.body.address, 
    createdAt: new Date(),
  };

  const response = await mongodb
    .getDatabase()
    .collection(COLLECTIONS.USERS)
    .insertOne(user);

  if (!response.acknowledged) {
    return res.status(500).json({ error: "Error creating user." });
  }

  // Do not return password in response
  const { password, ...safeUser } = user;

  res.status(201).json({ id: response.insertedId, ...safeUser });
};

/**
 * @desc    Update an existing user
 * @route   PUT /users/:id
 * @access  Public (sensitive information)
 */
const updateUser = async (req, res) => {
  //#swagger.tags=['Users']
  const { id } = req.params;

  if (!ObjectId.isValid(id)) {
    return res.status(400).json({ error: "Invalid user ID format." });
  }

  const userId = new ObjectId(id);

  const updateFields = {
    username: req.body.username,
    email: req.body.email, 
    password: req.body.password,
    phone: req.body.phone,
    address: req.body.address, 
    updatedAt: new Date(),
  };

  Object.keys(updateFields).forEach(
    (key) => updateFields[key] === undefined && delete updateFields[key]
  );

  try {
    const response = await mongodb
      .getDatabase()
      .collection(COLLECTIONS.USERS)
      .updateOne({ _id: userId }, { $set: updateFields });

    if (response.matchedCount === 0) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json({
      message: "User updated successfully",
      updatedFields: updateFields,
    });
  } catch (err) {
    res.status(500).json({ error: err.message || "Some error occurred" });
  }
};

/**
 * @desc    Delete a user
 * @route   DELETE /users/:id
 * @access  Public (sensitive information)
 */
const deleteUser = async (req, res) => {
  //#swagger.tags=['Users']
  const { id } = req.params;

  if (!ObjectId.isValid(id)) {
    return res.status(400).json({ error: "Invalid user ID format." });
  }

  const userId = new ObjectId(id);

  try {
    const response = await mongodb
      .getDatabase()
      .collection(COLLECTIONS.USERS)
      .deleteOne({ _id: userId });

    if (response.deletedCount === 0) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json({ message: "User deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message || "Some error occurred" });
  }
};

module.exports = {
  getAll,
  getSingle,
  createUser,
  updateUser,
  deleteUser,
};
