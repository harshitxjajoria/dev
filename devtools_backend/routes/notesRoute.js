const route = require("express").Router();
const controller = require("../controllers/notesController")

route.post("/add", controller.addNote);
route.post("/delete", controller.deleteNote);
route.post("/edit", controller.editNote);
route.get("/", controller.getAllNotes);
route.get("/:id", controller.getNoteById);

module.exports = { route };
