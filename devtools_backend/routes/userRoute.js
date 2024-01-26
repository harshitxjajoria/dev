const controller = require("../controllers/userController");
const auth = require("../middlewares/auth");
const route = require("express").Router();

route.post("/register", controller.register);
route.post("/login", controller.login);
route.get("/", auth, controller.getUser);

module.exports = { route };
