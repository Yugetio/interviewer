const { Schema, model } = require("mongoose");

const noteSchema = new Schema({
  question: {
    type: String,
    required: true
  },
  answer: {
    type: String,
    default: ""
  }
});

//transform _id to id
// noteSchema.method("toClient", function() {
//   const note = this.toObject();

//   note.id = note._id;
//   delete note._id;

//   return note;
// });

module.exports = model("Note", noteSchema);
