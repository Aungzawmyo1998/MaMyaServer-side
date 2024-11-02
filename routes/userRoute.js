const express = require("express");
const router = express.Router();  // Make sure you are using `express.Router()`

const UserController = require("../controllers/UserController");
// Define routes
router.post('/register', UserController.Register );
router.post('/login', UserController.Login );

module.exports = router;  // Correct export
