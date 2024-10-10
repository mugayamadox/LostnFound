const express = require('express');
const router = express.Router();
const reportController = require('../controllers/reportController');

router.post('/report/lost', reportController.reportLostItem);
router.post('/report/found', reportController.reportFoundItem);

module.exports = router;