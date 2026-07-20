const express = require("express");

const router = express.Router();

const {
    createUser,
} = require("../Controllers/usercontroller");

router.post("/", createUser);

module.exports = router;
