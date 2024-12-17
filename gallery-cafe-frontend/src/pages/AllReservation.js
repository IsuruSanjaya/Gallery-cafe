import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaTrashAlt, FaEdit } from "react-icons/fa"; // Import FontAwesome icons
import { ToastContainer, toast } from "react-toastify"; // For toast notifications
import "react-toastify/dist/ReactToastify.css"; // Import toast CSS
import "../common.css"; // Assuming the CSS is already imported
import { Modal, Button, Form } from "react-bootstrap";

const Reservations = () => {
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentReservation, setCurrentReservation] = useState(null); // For updating
  const [isModalOpen, setIsModalOpen] = useState(false); // For modal visibility

  // Fetch all reservations
  useEffect(() => {
    const fetchReservations = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/reservations/"
        );
        setReservations(response.data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchReservations();
  }, []);

  // Delete reservation
  const deleteReservation = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/reservations/${id}`);
      setReservations(reservations.filter((res) => res._id !== id)); // Remove from state
      toast.success("Reservation deleted successfully!");
    } catch (err) {
      toast.error("Error deleting reservation");
    }
  };

  // Update reservation
  const openModal = (reservation) => {
    setCurrentReservation(reservation);
    setIsModalOpen(true);
  };

  const handleUpdateChange = (e) => {
    const { name, value } = e.target;
    setCurrentReservation({ ...currentReservation, [name]: value });
  };

  const handleUpdateSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(
        `http://localhost:5000/api/reservations/${currentReservation._id}`,
        currentReservation
      );
      setReservations(
        reservations.map((res) =>
          res._id === currentReservation._id ? currentReservation : res
        )
      );
      setIsModalOpen(false); // Close modal
      toast.success("Reservation updated successfully!");
    } catch (err) {
      toast.error("Error updating reservation");
    }
  };

  if (loading) return <div className="loading-indicator">Loading...</div>; // Custom loading indicator
  if (error) return <div className="error-message">Error: {error}</div>;

  return (
    <div className="container mt-4">
      <h2 className="text-center">All Reservations</h2>
      {reservations.length > 0 ? (
        <table className="table table-striped table-hover">
          <thead>
            <tr>
              <th>#</th>
              <th>User</th>
              <th>Date</th>
              <th>Time</th>
              <th>Guests</th>
              <th>Table</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {reservations.map((reservation, index) => (
              <tr key={reservation._id}>
                <td>{index + 1}</td>
                <td>{reservation.name || "Unknown User"}</td>
                <td>{reservation.date}</td>
                <td>{reservation.time}</td>
                <td>{reservation.guests}</td>
                <td>{reservation.table}</td>
                <td>
                  <button
                    onClick={() => openModal(reservation)}
                    className="btn btn-warning btn-sm"
                  >
                    <FaEdit />
                  </button>
                  <button
                    onClick={() => deleteReservation(reservation._id)}
                    className="btn btn-danger btn-sm ml-2"
                  >
                    <FaTrashAlt />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div>No reservations found.</div>
      )}

{isModalOpen && currentReservation && (
  <Modal
    show={isModalOpen}
    onHide={() => setIsModalOpen(false)}
    centered
  >
    <Modal.Header closeButton>
      <Modal.Title>Update Reservation</Modal.Title>
    </Modal.Header>
    <Modal.Body>
      <form onSubmit={handleUpdateSubmit}>
        <div className="mb-3">
          <label>User</label>
          <input
            type="text"
            name="name"
            value={currentReservation.name}
            onChange={handleUpdateChange}
            className="form-control"
            required
          />
        </div>
        <div className="mb-3">
          <label>Date</label>
          <input
            type="date"
            name="date"
            value={currentReservation.date}
            onChange={handleUpdateChange}
            className="form-control"
            required
          />
        </div>
        <div className="mb-3">
          <label>Time</label>
          <input
            type="time"
            name="time"
            value={currentReservation.time}
            onChange={handleUpdateChange}
            className="form-control"
            required
          />
        </div>
        <div className="mb-3">
          <label>Guests</label>
          <input
            type="number"
            name="guests"
            value={currentReservation.guests}
            onChange={handleUpdateChange}
            className="form-control"
            min="1"
            required
          />
        </div>
        <div className="mb-3">
          <label>Table</label>
          <input
            type="text"
            name="table"
            value={currentReservation.table}
            onChange={handleUpdateChange}
            className="form-control"
            required
          />
        </div>
        <div className="d-flex justify-content-end">
          <Button type="submit" variant="primary" className="me-2">
            Update
          </Button>
          <Button variant="secondary" onClick={() => setIsModalOpen(false)}>
            Cancel
          </Button>
        </div>
      </form>
    </Modal.Body>
  </Modal>
)}


      <ToastContainer />
    </div>
  );
};

export default Reservations;
