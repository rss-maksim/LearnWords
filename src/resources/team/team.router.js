const { OK } = require('http-status-codes');
const router = require('express').Router();
const teamService = require('./team.service');

router.get('/', async (req, res) => {
  const team = await teamService.getAll();
  res.status(OK).send(team.map(mate => mate.toResponse()));
});

module.exports = router;
