import { useState } from "react";
import "./App.css";

const TOTAL_SEATS = 20;

export default function App() {
  const [seatsLeft, setSeatsLeft] = useState(TOTAL_SEATS);
  const [reservations, setReservations] = useState([]);
  const [form, setForm] = useState({ name: "", phone: "", guests: "" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleReserve = () => {
    const guests = parseInt(form.guests, 10);
    if (!form.name || !form.phone || isNaN(guests) || guests <= 0) {
      alert("Please enter valid details.");
      return;
    }
    if (guests > seatsLeft) {
      alert("Not enough seats available!");
      return;
    }
    if (reservations.some(res => res.name === form.name)) {
      alert("Duplicate name detected!");
      return;
    }
    setReservations([...reservations, { ...form, guests, checkIn: new Date().toLocaleTimeString(), checkOut: null }]);
    setSeatsLeft(seatsLeft - guests);
    setForm({ name: "", phone: "", guests: "" });
  };

  const handleCheckout = (index) => {
    const updatedReservations = [...reservations];
    updatedReservations[index].checkOut = new Date().toLocaleTimeString();
    setReservations(updatedReservations);
    setSeatsLeft(seatsLeft + updatedReservations[index].guests);
  };

  const handleDelete = (index) => {
    const res = reservations[index];
    if (!res.checkOut) {
      setSeatsLeft(seatsLeft + res.guests);
    }
    setReservations(reservations.filter((_, i) => i !== index));
  };

  return (
    <div className="container">
      <h1>Restaurant Reservation</h1>
      <p>Seats Left: {seatsLeft}/{TOTAL_SEATS}</p>
      <div className="form-container">
        <input name="name" placeholder="Name" value={form.name} onChange={handleChange} />
        <input name="phone" placeholder="Phone" value={form.phone} onChange={handleChange} />
        <input name="guests" placeholder="Guests" type="number" value={form.guests} onChange={handleChange} />
        <button onClick={handleReserve}>Reserve</button>
      </div>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Phone</th>
            <th>Guests</th>
            <th>Check-in</th>
            <th>Check-out</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {reservations.map((res, index) => (
            <tr key={index}>
              <td>{res.name}</td>
              <td>{res.phone}</td>
              <td>{res.guests}</td>
              <td>{res.checkIn}</td>
              <td>{res.checkOut || <button onClick={() => handleCheckout(index)}>Click to Checkout</button>}</td>
              <td><button onClick={() => handleDelete(index)}>Delete</button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
