const express = require('express');
const router = express.Router();

const subcontroller = require('../controller/subcontroller');

router.get('/', subcontroller.getAllSubscribers);
router.get('/:id', subcontroller.getSubscriberById);
router.post('/', subcontroller.createSubscriber);

module.exports = router;