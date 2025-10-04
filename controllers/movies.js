/**
 * @author Ronaldo Campos
 */

const { COLLECTIONS } = require("../config/constants");

const mongodb = require("../data/database.js");
const ObjectId = require("mongodb").ObjectId;

/**
 * @desc    Retrieve all movies from the database
 * @route   GET /movies
 * @access  Public
 */
const getAll = async (req, res) => {
  //#swagger.tags=['Movies']
  const result = await mongodb.getDatabase().collection(COLLECTIONS.MOVIES).find();
  const movies = await result.toArray();

  res.status(200).json(movies);
};

/**
 * @desc    Retrieve a single movie by its ID
 * @route   GET /movies/:id
 * @access  Public
 */
const getSingle = async (req, res) => {
  //#swagger.tags=['Movies']
  const { id } = req.params;

  if (!ObjectId.isValid(id)) {
    return res.status(400).json({ error: "Invalid movie ID format." });
  }

  const movieId = new ObjectId(id);
  const movie = await mongodb.getDatabase().collection(COLLECTIONS.MOVIES).findOne({ _id: movieId });

  if (!movie) {
    return res.status(404).json({ error: "Movie not found" });
  }

  res.status(200).json(movie);
};

/**
 * @desc    Create a new movie in the database
 * @route   POST /movies
 * @access  Public
 */
const createMovie = async (req, res) => {
  //#swagger.tags=['Movies']
  const movie = {
    title: req.body.title,
    director: req.body.director,
    genre: req.body.genre ?? "",
    releaseYear: req.body.releaseYear ?? null,
    rating: req.body.rating ?? null,
    description: req.body.description ?? "",
    available: req.body.available ?? true,
  };

  const response = await mongodb
    .getDatabase()
    .collection(COLLECTIONS.MOVIES)
    .insertOne(movie);

  if (!response.acknowledged) {
    return res.status(500).json({ error: "Error creating movie." });
  }

  res.status(201).json({
    message: "Movie created successfully",
    id: response.insertedId,
  });
};

/**
 * @desc    Update an existing movie by its ID
 * @route   PUT /movies/:id
 * @access  Public
 */
const updateMovie = async (req, res) => {
  //#swagger.tags=['Movies']
  const { id } = req.params;

  if (!ObjectId.isValid(id)) {
    return res.status(400).json({ error: "Invalid movie ID format." });
  }

  const movieId = new ObjectId(id);

  const updateFields = {
    title: req.body.title,
    director: req.body.director,
    genre: req.body.genre,
    releaseYear: req.body.releaseYear,
    rating: req.body.rating,
    description: req.body.description,
    available: req.body.available,
  };

  // Remove undefined fields
  Object.keys(updateFields).forEach(
    (key) => updateFields[key] === undefined && delete updateFields[key]
  );

  try {
    const response = await mongodb
      .getDatabase()
      .collection(COLLECTIONS.MOVIES)
      .updateOne({ _id: movieId }, { $set: updateFields });

    if (response.matchedCount === 0) {
      return res.status(404).json({ error: "Movie not found" });
    }

    res.status(200).json({
      message: "Movie updated successfully",
      updatedFields: updateFields,
    });
  } catch (err) {
    res.status(500).json({ error: err.message || "Some error occurred" });
  }
};

/**
 * @desc    Delete a movie by its ID
 * @route   DELETE /movies/:id
 * @access  Public
 */
const deleteMovie = async (req, res) => {
  //#swagger.tags=['Movies']
  const { id } = req.params;

  if (!ObjectId.isValid(id)) {
    return res.status(400).json({ error: "Invalid movie ID format." });
  }

  const movieId = new ObjectId(id);

  try {
    const response = await mongodb.getDatabase().collection(COLLECTIONS.MOVIES).deleteOne({ _id: movieId });

    if (response.deletedCount === 0) {
      return res.status(404).json({ error: "Movie not found" });
    }

    res.status(200).json({ message: "Movie deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message || "Some error occurred" });
  }
};

module.exports = {
  getAll,
  getSingle,
  createMovie,
  updateMovie,
  deleteMovie,
};