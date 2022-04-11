const express = require('express');
const router = express.Router();
const {get_newEvent, get_oneEvent ,create_newEvent, update_Event, delete_Event} = require('../controller/neweventController');

const { protect } = require ('../middleware/authMiddleware'); //middleware for authentication
router.route('/').get(protect, get_newEvent).post(protect, create_newEvent);
router.route('/:id').get(protect, get_oneEvent).delete(protect, delete_Event).put(protect, update_Event );

module.exports = router;