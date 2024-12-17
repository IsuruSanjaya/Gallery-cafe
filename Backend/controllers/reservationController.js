const Reservation = require('../models/Reservation');

exports.createReservation = async (req, res) => {
    const { name, date, time, guests, table,food } = req.body;
    try {
        const reservation = new Reservation({ name, date, time, guests, table,food });
        await reservation.save();
        res.status(201).json({ message: 'Reservation created successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.getReservations = async (req, res) => {
    try {
        const reservations = await Reservation.find();
        res.status(200).json(reservations);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};


exports.deleteReservation = async (req, res) => {
    const { id } = req.params;  // Reservation ID from the URL

    try {
        const deletedReservation = await Reservation.findByIdAndDelete(id);

        if (!deletedReservation) {
            return res.status(404).json({ message: 'Reservation not found' });
        }

        res.status(200).json({ message: 'Reservation deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};


exports.updateReservation = async (req, res) => {
    const { id } = req.params;  // Reservation ID from the URL
    const { name, date, time, guests, table, food } = req.body;  // Data to update

    try {
        const updatedReservation = await Reservation.findByIdAndUpdate(
            id,
            { name, date, time, guests, table, food },
            { new: true }  // Return the updated reservation
        );

        if (!updatedReservation) {
            return res.status(404).json({ message: 'Reservation not found' });
        }

        res.status(200).json({ message: 'Reservation updated successfully', reservation: updatedReservation });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
