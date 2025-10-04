/**
 * @author Lucas Castillo
 */

const { COLLECTIONS } = require("../config/constants");

const mongodb = require("../data/database.js");
const ObjectId = require("mongodb").ObjectId;

/**
 * @desc    Retrieve all series from the database
 * @route   GET /series
 * @access  Public
 */
const getAll = async (req, res) => {
  //#swagger.tags=['Series']
  const result = await mongodb.getDatabase().collection(COLLECTIONS.SERIES).find();
  const series = await result.toArray();

  res.status(200).json(series);
};

/**
 * @desc    Retrieve a single series by its ID
 * @route   GET /series/:id
 * @access  Public
 */
const getSingle = async (req, res) => {
  //#swagger.tags=['Series']
  const { id } = req.params;

  if (!ObjectId.isValid(id)) {
    return res.status(400).json({ error: "Invalid series ID format." });
  }

  const seriesId = new ObjectId(id);
  const serie = await mongodb.getDatabase().collection(COLLECTIONS.SERIES).findOne({ _id: seriesId });

  if (!serie) {
    return res.status(404).json({ error: "Series not found" });
  }

  res.status(200).json(serie);
};

/**
 * @desc    Create a new series in the database
 * @route   POST /series
 * @access  Public
 */
const createSeries = async (req, res) => {
  //#swagger.tags=['Series']
  const serie = {
    title: req.body.title,
    genre: req.body.genre ?? "",
    seasons: req.body.seasons ?? 1,
    episodes: req.body.episodes ?? 0,
    description: req.body.description ?? "",
    releaseYear: req.body.releaseYear ?? null,
    available: req.body.available ?? true,
  };

  const response = await mongodb
    .getDatabase()
    .collection(COLLECTIONS.SERIES)
    .insertOne(serie);

  if (!response.acknowledged) {
    return res.status(500).json({ error: "Error creating series." });
  }

  res.status(201).json({ id: response.insertedId, ...serie });
};

/**
 * @desc    Update an existing series by its ID
 * @route   PUT /series/:id
 * @access  Public
 */
const updateSeries = async (req, res) => {
  //#swagger.tags=['Series']
  const { id } = req.params;

  if (!ObjectId.isValid(id)) {
    return res.status(400).json({ error: "Invalid series ID format." });
  }

  const seriesId = new ObjectId(id);

  const updateFields = {
    title: req.body.title,
    genre: req.body.genre,
    seasons: req.body.seasons,
    episodes: req.body.episodes,
    description: req.body.description,
    releaseYear: req.body.releaseYear,
    available: req.body.available,
  };

  // Remove undefined fields
  Object.keys(updateFields).forEach(
    (key) => updateFields[key] === undefined && delete updateFields[key]
  );

  try {
    const response = await mongodb
      .getDatabase()
      .collection(COLLECTIONS.SERIES)
      .updateOne({ _id: seriesId }, { $set: updateFields });

    if (response.matchedCount === 0) {
      return res.status(404).json({ error: "Series not found" });
    }

    res.status(200).json({
      message: "Series updated successfully",
      updatedFields: updateFields,
    });
  } catch (err) {
    res.status(500).json({ error: err.message || "Some error occurred" });
  }
};

/**
 * @desc    Delete a series by its ID
 * @route   DELETE /series/:id
 * @access  Public
 */
const deleteSeries = async (req, res) => {
  //#swagger.tags=['Series']
  const { id } = req.params;

  if (!ObjectId.isValid(id)) {
    return res.status(400).json({ error: "Invalid series ID format." });
  }

  const seriesId = new ObjectId(id);

  try {
    const response = await mongodb.getDatabase().collection(COLLECTIONS.SERIES).deleteOne({ _id: seriesId });

    if (response.deletedCount === 0) {
      return res.status(404).json({ error: "Series not found" });
    }

    res.status(200).json({ message: "Series deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message || "Some error occurred" });
  }
};

module.exports = {
  getAll,
  getSingle,
  createSeries,
  updateSeries,
  deleteSeries,
};