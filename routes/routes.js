const express = require("express");
const createClients = require("../controllers/createClients");
const getClients = require("../controllers/getClients");
const deleteClient = require("../controllers/deleteClient");
const updateClient = require("../controllers/updateClient");
const loginController = require("../controllers/loginController");
const router = express.Router();
const authController = require("../controllers/authController");
const sendEmail = require("../controllers/sendEmail");

router.post("/create", createClients.createUser);
router.get("/getClients", getClients.getUsers);
router.delete("/deleteClient/:id", deleteClient.deleteUser);
router.put("/updateClient", updateClient.updateUsers);
router.get("/signup", authController.signup_get);
router.post("/signup", authController.signup_post);
router.get("/login", authController.login_get);
router.post("/loginz", authController.login_post);
router.post("/email", sendEmail.Email);
router.post("/loginz", loginController.login);

module.exports = router;
