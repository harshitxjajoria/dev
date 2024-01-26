import mongoose from "mongoose";
const NoteSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    heading: {
      type: String,
    },
    body: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", NoteSchema);
