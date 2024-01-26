const route = require("express").Router()
const UserRoute = require("./userRoute")
const NoteRoute = require("./notesRoute")

route.use("/user", UserRoute.route)
route.use("/notes", NoteRoute.route)

module.exports = {route}