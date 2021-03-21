const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { addMethods } = require('../../utils/toResponse');

const TeamSchema = new Schema(
  {
    name: {
      type: String,
      required: true
    },
    role: {
      type: String,
      required: true
    },
    github: {
      type: String,
      required: true
    },
    location: {
      type: String,
      required: false
    },
    contribution: {
      type: Array,
      required: false
    },
    pictureUrl: {
      type: String,
      required: false
    }
  },
  { collection: 'teammates' }
);

addMethods(TeamSchema);

module.exports = mongoose.model('Team', TeamSchema);
