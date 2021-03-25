const express = require('express');
const router = express.Router();
const country = require('./country.service');

function getAll(req, res, next) {
  country.getAll()
    .then(countries => res.json(countries))
    .catch(next);
}

router.get('/country', getAll);

module.exports = router;