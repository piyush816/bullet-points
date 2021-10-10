const router = require("express").Router();
const bookController = require("../controllers/bookController");
const multer = require("multer");
const storage = multer.memoryStorage();
const upload = multer({ storage });

// all books
router.get("/", bookController.getAllBooks);

// add bulletpoints
router.post("/bullet-points/:id", bookController.addBulletPoints);

// add book
router.post("/", upload.single("posterUrl"), bookController.addBook);

// single book
router.get("/:id", bookController.getBook);

// update book
router.patch("/:id", upload.single("posterUrl"), bookController.updateBook);

module.exports = router;
