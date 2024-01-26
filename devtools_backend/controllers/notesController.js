const Note = require("../models/note");
const { resObj } = require("../utils/resObj");
const User = require("../models/user");

const addNote = async (req, res) => {
  try {
    const user = await User.findById(req.user.user_id);
    if (!user) {
      return res.status(409).json(resObj(false, null, "Invalid Credentials"));
    }
    const { heading, body } = req.body;
    const note = await Note.create({ userId: user._id, heading, body });
    return res.status(200).json(resObj(true, note, "Note Added"));
  } catch (err) {
    return res
      .status(500)
      .json(resObj(false, err.toString(), "Server Side Error"));
  }
};

const deleteNote = async (req, res) => {
  try {
    const user = await User.findById(req.user.user_id);
    if (!user) {
      return res.status(409).json(resObj(false, null, "Invalid Credentials"));
    }
    const { noteId } = req.body;
    const note = await Note.findById(noteId);
    if (!note) {
      return res.status(401).json(resObj(false, null, "Note not found"));
    }
    if (note.userId.toString() !== req.user.user_id) {
      return res.status(401).json(resObj(false, null, "Note not found"));
    }
    await Note.findByIdAndDelete(noteId);
    return res.status(200).json(resObj(true, null, "Note Deleted"));
  } catch (err) {
    return res
      .status(500)
      .json(resObj(false, err.toString(), "Server Side Error"));
  }
};

const editNote = async (req, res) => {
  try {
    const user = await User.findById(req.user.user_id);
    if (!user) {
      return res.status(409).json(resObj(false, null, "Invalid Credentials"));
    }
    const { noteId, heading, body } = req.body;
    const note = await Note.findById(noteId);
    if (!note) {
      return res.status(401).json(resObj(false, null, "Note not found"));
    }
    if (note.userId.toString() !== req.user.user_id) {
      return res.status(401).json(resObj(false, null, "Note not found"));
    }
    note.body = body;
    note.heading = heading;
    await note.save();
    return res.status(200).json(resObj(true, note, "Note Deleted"));
  } catch (err) {
    return res
      .status(500)
      .json(resObj(false, err.toString(), "Server Side Error"));
  }
};

const getNoteById = async (req, res) => {
  try {
    const user = await User.findById(req.user.user_id);
    if (!user) {
      return res.status(409).json(resObj(false, null, "Invalid Credentials"));
    }
    const { id } = req.params;
    const note = await Note.findById(id);
    if (!note) {
      return res.status(401).json(resObj(false, null, "Note not found"));
    }
    if (note.userId.toString() !== req.user.user_id) {
      return res.status(401).json(resObj(false, null, "Note not found"));
    }
    return res.status(200).json(resObj(true, note, "Note Deleted"));
  } catch (err) {
    return res
      .status(500)
      .json(resObj(false, err.toString(), "Server Side Error"));
  }
};

const getAllNotes = async (req, res) => {
  try {
    const user = await User.findById(req.user.user_id);
    if (!user) {
      return res.status(409).json(resObj(false, null, "Invalid Credentials"));
    }
    const notes = await Note.find({ userId: req.user.user_id });
    return res.status(200).json(resObj(true, notes, "Note Deleted"));
  } catch (err) {
    return res
      .status(500)
      .json(resObj(false, err.toString(), "Server Side Error"));
  }
};

module.exports = { addNote, deleteNote, editNote, getAllNotes, getNoteById };
