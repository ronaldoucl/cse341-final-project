/**
 * @author Ronaldo Campos
 */

const { COLLECTIONS } = require("../config/constants");

const mongodb = require("../data/database.js");
const ObjectId = require("mongodb").ObjectId;

/**
 * @desc    Retrieve all customers from the database
 * @route   GET /customers
 * @access  Public (sensitive information)
 */
const getAll = async (req, res) => {
  //#swagger.tags=['Customers']
  const result = await mongodb.getDatabase().collection(COLLECTIONS.CUSTOMERS).find();
  const customers = await result.toArray();

  res.status(200).json(customers);
};

/**
 * @desc    Retrieve a single customer by ID
 * @route   GET /customers/:id
 * @access  Public (sensitive information)
 */
const getSingle = async (req, res) => {
  //#swagger.tags=['Customers']
  const { id } = req.params;

  if (!ObjectId.isValid(id)) {
    return res.status(400).json({ error: "Invalid customer ID format." });
  }

  const customerId = new ObjectId(id);
  const customer = await mongodb.getDatabase().collection(COLLECTIONS.CUSTOMERS).findOne({ _id: customerId });

  if (!customer) {
    return res.status(404).json({ error: "Customer not found" });
  }

  res.status(200).json(customer);
};

/**
 * @desc    Create a new customer
 * @route   POST /customers
 * @access  Public (sensitive information)
 */
const createCustomer = async (req, res) => {
  //#swagger.tags=['Customers']
  const customer = {
    name: req.body.name,
    email: req.body.email, 
    phone: req.body.phone ?? "", 
    address: req.body.address ?? "",
    notes: req.body.notes ?? "",
    active: req.body.active ?? true,
    createdAt: new Date(),
  };

  const response = await mongodb
    .getDatabase()
    .collection(COLLECTIONS.CUSTOMERS)
    .insertOne(customer);

  if (!response.acknowledged) {
    return res.status(500).json({ error: "Error creating customer." });
  }

  res.status(201).json({ id: response.insertedId, ...customer });
};

/**
 * @desc    Update an existing customer
 * @route   PUT /customers/:id
 * @access  Public (sensitive information)
 */
const updateCustomer = async (req, res) => {
  //#swagger.tags=['Customers']
  const { id } = req.params;

  if (!ObjectId.isValid(id)) {
    return res.status(400).json({ error: "Invalid customer ID format." });
  }

  const customerId = new ObjectId(id);

  const updateFields = {
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone, 
    address: req.body.address,
    notes: req.body.notes,
    active: req.body.active,
    updatedAt: new Date(),
  };

  Object.keys(updateFields).forEach(
    (key) => updateFields[key] === undefined && delete updateFields[key]
  );

  try {
    const response = await mongodb
      .getDatabase()
      .collection(COLLECTIONS.CUSTOMERS)
      .updateOne({ _id: customerId }, { $set: updateFields });

    if (response.matchedCount === 0) {
      return res.status(404).json({ error: "Customer not found" });
    }

    res.status(200).json({
      message: "Customer updated successfully",
      updatedFields: updateFields,
    });
  } catch (err) {
    res.status(500).json({ error: err.message || "Some error occurred" });
  }
};

/**
 * @desc    Delete a customer
 * @route   DELETE /customers/:id
 * @access  Public (sensitive information)
 */
const deleteCustomer = async (req, res) => {
  //#swagger.tags=['Customers']
  const { id } = req.params;

  if (!ObjectId.isValid(id)) {
    return res.status(400).json({ error: "Invalid customer ID format." });
  }

  const customerId = new ObjectId(id);

  try {
    const response = await mongodb
      .getDatabase()
      .collection(COLLECTIONS.CUSTOMERS)
      .deleteOne({ _id: customerId });

    if (response.deletedCount === 0) {
      return res.status(404).json({ error: "Customer not found" });
    }

    res.status(200).json({ message: "Customer deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message || "Some error occurred" });
  }
};

module.exports = {
  getAll,
  getSingle,
  createCustomer,
  updateCustomer,
  deleteCustomer,
};