const { Schema, model } = require("mongoose");

const noteSchema = new Schema(
  {
    question: {
      type: String,
      required: true
    },
    answer: {
      type: String,
      default: ""
    },
    categoryId: {
      type: Schema.Types.ObjectId,
      ref: 'Category',
      default: null
    },
    authorId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true
    }
  },
  {
    timestamps: {}
  }
);

// transform _id to id
// noteSchema.set('toJSON', {
//   transform: function (doc, ret, options) {
//       ret.id = ret._id;
//       delete ret._id;
//       delete ret.__v;
//   }
// }); 

module.exports = model("Note", noteSchema);
