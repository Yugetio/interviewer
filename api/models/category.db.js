const {Schema, model} = require('mongoose');

const categorySchema = new Schema({
  title: {
    type: String,
    required: true
  },
  notes: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Note'
    }
  ]
});

module.exports = model('Category', categorySchema);