const { OK } = require('http-status-codes');
const router = require('express').Router({ mergeParams: true });

const { wordId } = require('../../utils/validation/schemas');
const { validator } = require('../../utils/validation/validator');
const aggregatedWordsService = require('./aggregatedWord.service');
const { BAD_REQUEST_ERROR } = require('../../errors/appErrors');
const extractQueryParam = require('../../utils/getQueryNumberParameter');

router.get('/', async (req, res) => {
  const perPage = extractQueryParam(req.query.wordsPerPage, 10);
  const page = extractQueryParam(req.query.page, null);
  const group = extractQueryParam(req.query.group);

  if ((req.query.group && isNaN(group)) || isNaN(page) || isNaN(perPage)) {
    throw new BAD_REQUEST_ERROR(
      'Wrong query parameters: the group, page and words-per-page numbers should be valid integers'
    );
  }

  const filter = req.query.filter ? JSON.parse(req.query.filter) : null;

  const words = await aggregatedWordsService.getAll(
    req.userId,
    group,
    page,
    perPage,
    filter
  );
  res.status(OK).send(words.map(({ _id, ...word }) => ({ id: _id, ...word })));
});

router.get('/:wordId', validator(wordId, 'params'), async (req, res) => {
  const { _id, ...word } = await aggregatedWordsService.get(
    req.params.wordId,
    req.userId
  );

  res.status(OK).send({ id: _id, ...word });
});

module.exports = router;
