import React, { useState } from 'react';

function App() {
  const [reservations, setReservations] = useState([]);
  const [seatsLeft, setSeatsLeft] = useState(20);
  const [roomCost, setRoomCost] = useState(100); // Room cost per room
  const [foodCosts, setFoodCosts] = useState({
    pizza: 10,
    burger: 8,
    pasta: 12,
    salad: 5,
    steak: 15,
    Biryani: 12,
    "Dum Biryani": 15,
    "Veg Biryani": 10,
  });

  const styles = {
    app: {
      fontFamily: 'Arial, sans-serif',
      margin: '20px',
      backgroundColor: '#000000', // Black Background
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px',
      backgroundImage: 'url("https://your-image-url-here.jpg")', // Optional Background Image
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundAttachment: 'fixed',
    },
    heading: {
      textAlign: 'center',
      color: '#FF0000', // Red text
      fontSize: '2.5rem',
      marginBottom: '20px',
      textTransform: 'uppercase',
      letterSpacing: '2px',
    },
    seatStatus: {
      textAlign: 'center',
      marginBottom: '30px',
      color: '#FF0000', // Red text
      fontSize: '1.5rem',
    },
    reservationForm: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      marginBottom: '30px',
      backgroundColor: 'rgba(255, 255, 255, 0.8)', // Semi-transparent background
      padding: '20px',
      borderRadius: '8px',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
      width: '300px',
    },
    input: {
      padding: '10px',
      margin: '8px',
      width: '100%',
      border: '1px solid #ccc',
      borderRadius: '5px',
      fontSize: '1rem',
    },
    select: {
      padding: '10px',
      margin: '8px',
      width: '100%',
      border: '1px solid #ccc',
      borderRadius: '5px',
      fontSize: '1rem',
    },
    button: {
      padding: '12px',
      backgroundColor: '#FF0000', // Red button background
      color: 'white',
      border: 'none',
      cursor: 'pointer',
      borderRadius: '5px',
      width: '100%',
      fontSize: '1.1rem',
      marginTop: '10px',
    },
    buttonHover: {
      backgroundColor: '#e60000', // Darker Red when hovered
    },
    reservationTable: {
      width: '80%',
      borderCollapse: 'collapse',
      marginTop: '30px',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    },
    tableCell: {
      padding: '12px',
      textAlign: 'center',
      border: '1px solid #ddd',
      fontSize: '1rem',
      color: '#FF0000', // Red text in table cells
    },
    tableHeader: {
      backgroundColor: '#FF0000', // Red header background
      color: 'white',
      fontSize: '1.2rem',
    },
    tableRowButton: {
      padding: '6px 12px',
      cursor: 'pointer',
      backgroundColor: '#f1f1f1',
      border: 'none',
      borderRadius: '5px',
      margin: '2px',
    },
    tableRowButtonHover: {
      backgroundColor: '#ddd',
    },
    foodOrdering: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      margin: '10px 0',
      width: '100%',
    },
    label: {
      marginBottom: '5px',
      fontSize: '1rem',
      fontWeight: 'bold',
      color: '#FF0000', // Red text for labels
    },
  };

  const handleReservationSubmit = (e) => {
    e.preventDefault();

    const name = e.target.name.value;
    const phone = e.target.phone.value;
    const guestCount = parseInt(e.target.guestCount.value);
    const roomNumber = e.target.roomNumber.value;
    const foodItem = e.target.foodItem.value;
    const beverage = e.target.beverage.value;
 
    if (guestCount > seatsLeft) {
      alert('Not enough seats available.');
      return;
    }

    const foodCost = foodCosts[foodItem];
    const totalRoomCost = roomCost;

    const newReservation = {
      name,
      phone,
      guestCount,
      roomNumber,
      foodItem,
      beverage,
      foodCost,
      totalRoomCost,
      checkInTime: new Date().toLocaleTimeString(),
      status: 'Checked In',
    };

    setReservations([...reservations, newReservation]);
    setSeatsLeft(seatsLeft - guestCount);
  };

  const handleCheckout = (reservation) => {
    reservation.status = 'Checked Out';
    setReservations(reservations.filter((r) => r !== reservation));
    setSeatsLeft(seatsLeft + reservation.guestCount);
  };

  const handleDelete = (reservation) => {
    setReservations(reservations.filter((r) => r !== reservation));
    setSeatsLeft(seatsLeft + reservation.guestCount);
  };

  return (
    <div style={styles.app}>
      <h1 style={styles.heading}>Restaurant Reservation</h1>

      {/* Seat Status */}
      <div style={styles.seatStatus}>
        <h2>Seats Left: {seatsLeft}</h2>
      </div>

      {/* Reservation Form */}
      <form style={styles.reservationForm} onSubmit={handleReservationSubmit}>
        <input type="text" name="name" placeholder="Name" style={styles.input} required />
        <input type="text" name="phone" placeholder="Phone" style={styles.input} required />
        <input type="number" name="guestCount" placeholder="Guest Count" style={styles.input} required />
        <input type="number" name="roomNumber" placeholder="Room Number" style={styles.input} required />

        {/* Food Ordering Section */}
        <div style={styles.foodOrdering}>
          <label style={styles.label}>Select Food Items:</label>
          <select name="foodItem" style={styles.select}>
            <option value="pizza">Pizza</option>
            <option value="burger">Burger</option>
            <option value="pasta">Pasta</option>
            <option value="salad">Salad</option>
            <option value="steak">Steak</option>
            <option value="Biryani">Biryani</option>
            <option value="Dum Biryani">Dum Biryani</option>
            <option value="Veg Biryani">Veg Biryani</option>
          </select>
        </div>

        {/* Beverages Section */}
        <div style={styles.foodOrdering}>
          <label style={styles.label}>Select Beverage:</label>
          <select name="beverage" style={styles.select}>
            <option value="Thumsup">Thumsup</option>
            <option value="Sprite">Sprite</option>
            <option value="Mango">Mango</option>
            <option value="Appie fizz">Appie fizz</option>
            <option value="COCO COLA">COCO COLA</option>
          </select>
        </div>

        <button type="submit" style={styles.button}>
          Make Reservation
        </button>
      </form>

      {/* Reservation Table */}
      <table style={styles.reservationTable}>
        <thead>
          <tr>
            <th style={Object.assign({}, styles.tableCell, styles.tableHeader)}>Name</th>
            <th style={Object.assign({}, styles.tableCell, styles.tableHeader)}>Phone</th>
            <th style={Object.assign({}, styles.tableCell, styles.tableHeader)}>Check-in Time</th>
            <th style={Object.assign({}, styles.tableCell, styles.tableHeader)}>Room Number</th>
            <th style={Object.assign({}, styles.tableCell, styles.tableHeader)}>Food Ordered</th>
            <th style={Object.assign({}, styles.tableCell, styles.tableHeader)}>Beverage</th>
            <th style={Object.assign({}, styles.tableCell, styles.tableHeader)}>Room Cost</th>
            <th style={Object.assign({}, styles.tableCell, styles.tableHeader)}>Food Cost</th>
            <th style={Object.assign({}, styles.tableCell, styles.tableHeader)}>Status</th>
            <th style={Object.assign({}, styles.tableCell, styles.tableHeader)}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {reservations.map((reservation, index) => (
            <tr key={index}>
              <td style={styles.tableCell}>{reservation.name}</td>
              <td style={styles.tableCell}>{reservation.phone}</td>
              <td style={styles.tableCell}>{reservation.checkInTime}</td>
              <td style={styles.tableCell}>{reservation.roomNumber}</td>
              <td style={styles.tableCell}>{reservation.foodItem}</td>
              <td style={styles.tableCell}>{reservation.beverage}</td>
              <td style={styles.tableCell}>${reservation.totalRoomCost}</td>
              <td style={styles.tableCell}>${reservation.foodCost}</td>
              <td style={styles.tableCell}>{reservation.status}</td>
              <td style={styles.tableCell}>
                {reservation.status === 'Checked In' ? (
                  <button
                    style={styles.tableRowButton}
                    onClick={() => handleCheckout(reservation)}
                  >
                    Click to Checkout
                  </button>
                ) : null}
                <button
                  style={styles.tableRowButton}
                  onClick={() => handleDelete(reservation)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
