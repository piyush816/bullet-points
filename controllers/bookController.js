const Book = require("../models/bookModel");
const imageProcessing = require("../utils/imageProcessing");
const fs = require("fs");

// return all the books
const getAllBooks = async (req, res) => {
  // response variables
  let message = "";
  let success = false;
  let data = [];

  try {
    // fetching all books
    const books = await Book.find({}, { bulletPoints: 0 });
    success = true;
    data = books;
  } catch (error) {
    message = error.message;
  }
  res.json({ success, message, data });
};

// return only one book
const getBook = async (req, res) => {
  // response variables
  let message = "";
  let success = false;
  let data = [];
  try {
    // fetching book by id
    const book = await Book.findById(req.params.id);
    success = true;
    data = book;
  } catch (error) {
    message = error.message;
  }

  res.json({ success, message, data });
};

// return only one book
const updateBook = async (req, res) => {
  // response variables
  let message = "";
  let success = false;
  let data = [];

  try {
    // fetching book by id
    const book = await Book.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    if (req.file) {
      const fileName = await imageProcessing(req, book.id);
      book.posterUrl = `/media/posters/${fileName}`;
      await book.save();
    }

    success = true;
    data = book;
  } catch (error) {
    message = error.message;
  }

  res.json({ success, message, data });
};

// add a book to database
const addBook = async (req, res) => {
  // response variables
  let message = "";
  let success = false;
  let data = [];

  try {
    // making an object of book model
    const book = new Book(req.body);
    // saving poster image
    const fileName = await imageProcessing(req, book.id);

    book.posterUrl = `/media/posters/${fileName}`;

    await book.save();

    success = true;
    data = book;
  } catch (error) {
    message = error.message;
  }
  res.json({ success, message, data });
};

const addBulletPoints = async (req, res) => {
  // response variables
  let message = "";
  let success = false;
  let data = [];

  try {
    // getting book
    const book = await Book.findById(req.params.id);

    req.body.forEach((point) => {
      // checking if point already exist or not
      if (book.bulletPoints.indexOf(point) >= 0) return;
      // appending points in book
      book.bulletPoints.push(point);
    });
    // save
    await book.save();
    success = true;
    data = book;
  } catch (error) {
    message = error.message;
  }

  res.json({ success, message, data });
};

module.exports = {
  getAllBooks,
  addBook,
  getBook,
  updateBook,
  addBulletPoints,
};
