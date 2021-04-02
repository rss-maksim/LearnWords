const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { addMethods, addIdentifier } = require('../../utils/toResponse');

const UserWordsSchema = new Schema(
  {
    wordId: { type: String, required: true },
    userId: { type: String, required: true },
    difficulty: { type: String, required: false },
    optional: {
      type: Object,
      required: false
    }
  },
  { collection: 'userWords' }
);

UserWordsSchema.index({ wordId: 1, userId: 1 }, { unique: true });

addMethods(UserWordsSchema);
addIdentifier(UserWordsSchema);

module.exports = mongoose.model('UserWords', UserWordsSchema);
