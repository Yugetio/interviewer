const {Schema, model} = require('mongoose');

const categorySchema = new Schema({
  title: {
    type: String,
    required: true
  },
  parentId: {
      type: Schema.Types.ObjectId,
      default: null
    }
});

module.exports = model('Category', categorySchema);