const express = require('express');
const router = express.Router();
const { getResultById } = require('../controllers/resultController');
const authenticate = require('../middlewares/auth');

router.get('/:id', authenticate(), getResultById);

module.exports = router;
