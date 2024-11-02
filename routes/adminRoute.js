const express = require("express");

const router = express.Router();

const AdminController = require("../controllers/AdminController");

router.post('/register', AdminController.Register );
router.post('/login', AdminController.Login);

module.exports = router;