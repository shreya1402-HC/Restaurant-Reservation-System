import React, { useState } from 'react';
import './App.css';

const App = () => {
  const totalSeats = 50;
  const [seatsLeft, setSeatsLeft] = useState(totalSeats);
  const [reservations, setReservations] = useState([]);
  const [formData, setFormData] = useState({ name: '', phone: '', guestCount: '' });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const validateForm = () => {
    if (!formData.name || !formData.phone || !formData.guestCount) {
      setError('All fields are required.');
      return false;
    }

    if (parseInt(formData.guestCount) > seatsLeft) {
      setError('Not enough seats available.');
      return false;
    }

    if (reservations.some((res) => res.name === formData.name)) {
      setError('Name already exists. Please choose a unique name.');
      return false;
    }

    setError('');
    return true;
  };

  const handleReservation = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const newReservation = {
      id: Math.random(),
      ...formData,
      guestCount: parseInt(formData.guestCount),
      checkInTime: new Date().toLocaleString(),
      checkOutTime: null,
    };

    setReservations([...reservations, newReservation]);
    setSeatsLeft(seatsLeft - newReservation.guestCount);
    setFormData({ name: '', phone: '', guestCount: '' });
  };

  const handleCheckout = (id) => {
    const updatedReservations = reservations.map((reservation) =>
      reservation.id === id
        ? { ...reservation, checkOutTime: new Date().toLocaleString() }
        : reservation
    );

    setReservations(updatedReservations);
    const checkedOutReservation = reservations.find((res) => res.id === id);
    setSeatsLeft(seatsLeft + checkedOutReservation.guestCount);
  };

  const handleDelete = (id) => {
    const updatedReservations = reservations.filter((res) => res.id !== id);
    const deletedReservation = reservations.find((res) => res.id === id);
    setReservations(updatedReservations);
    setSeatsLeft(seatsLeft + deletedReservation.guestCount);
  };

  return (
    <div className="app">
      <h1>Restaurant Reservation System</h1>
      <div className="reservation-form">
        <h2>Make a Reservation</h2>
        <form onSubmit={handleReservation}>
          <div>
            <label>Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
          </div>
          <div>
            <label>Phone</label>
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
            />
          </div>
          <div>
            <label>Guest Count</label>
            <input
              type="number"
              name="guestCount"
              value={formData.guestCount}
              onChange={handleChange}
            />
          </div>
          <button type="submit">Reserve</button>
        </form>
        {error && <p className="error">{error}</p>}
      </div>

      <div className="seats-info">
        <h3>Seats Left: {seatsLeft}</h3>
      </div>

      <div className="reservation-table">
        <h2>Reservations</h2>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Phone</th>
              <th>Check-in Time</th>
              <th>Check-out Time</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {reservations.map((reservation) => (
              <tr key={reservation.id}>
                <td>{reservation.name}</td>
                <td>{reservation.phone}</td>
                <td>{reservation.checkInTime}</td>
                <td>{reservation.checkOutTime || 'Not Checked Out'}</td>
                <td>
                  {reservation.checkOutTime ? (
                    <button disabled>Checked Out</button>
                  ) : (
                    <button onClick={() => handleCheckout(reservation.id)}>
                      Checkout
                    </button>
                  )}
                  <button onClick={() => handleDelete(reservation.id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default App;
