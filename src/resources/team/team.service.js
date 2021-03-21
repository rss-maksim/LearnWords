const teamRepo = require('./team.db.repository');

const getAll = async () => teamRepo.getAll();

module.exports = { getAll };
