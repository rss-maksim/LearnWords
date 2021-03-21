const Team = require('./team.model');
const { NOT_FOUND_ERROR } = require('../../errors/appErrors');

const getAll = async () => {
  const team = await Team.find();
  if (!team) {
    throw new NOT_FOUND_ERROR('Cannot find teammates');
  }

  return team;
};

module.exports = { getAll };
