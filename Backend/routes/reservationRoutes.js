const express = require('express');
const { createReservation, getReservations, updateReservation, deleteReservation } = require('../controllers/reservationController');
const router = express.Router();

router.post('/', createReservation);
router.get('/', getReservations);
router.put('/:id', updateReservation);  // Update reservation by ID
router.delete('/:id', deleteReservation);  // Delete reservation by ID

module.exports = router;
