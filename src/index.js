// import React from 'react';
// import ReactDOM from 'react-dom/client';
// import './index.css';
// import App from './App';
// import reportWebVitals from './reportWebVitals';

// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>
// );

// // If you want to start measuring performance in your app, pass a function
// // to log results (for example: reportWebVitals(console.log))
// // or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();

document.addEventListener('DOMContentLoaded', () => {
  const bookBtn = document.getElementById('bookBtn');
  const bookingList = document.getElementById('bookingList');

  bookBtn.addEventListener('click', async () => {
      const user_email = document.getElementById('user_email').value;
      const room_id = document.getElementById('room_id').value;
      const start_time = document.getElementById('start_time').value;
      const end_time = document.getElementById('end_time').value;

      // Send a POST request to the backend to create a booking
      const response = await fetch('/bookings', { // Update the endpoint to match your backend
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ user_email, room_id, start_time, end_time }),
      });

      if (response.ok) {
          const data = await response.json();
          // Display the new booking in the list
          const bookingItem = document.createElement('li');
          bookingItem.textContent = `Booking ID: ${data.booking._id}, User Email: ${data.booking.user_email}, Room: ${data.booking.room_id}, Start Time: ${data.booking.start_time}, End Time: ${data.booking.end_time}`;
          bookingList.appendChild(bookingItem);
      }
  });

  // Fetch existing bookings and display them on the page
  async function fetchBookings() {
      const response = await fetch('/bookings'); // Update the endpoint to match your backend
      if (response.ok) {
          const bookings = await response.json();
          bookings.forEach(booking => {
              const bookingItem = document.createElement('li');
              bookingItem.textContent = `Booking ID: ${booking._id}, User Email: ${booking.user_email}, Room: ${booking.room_id}, Start Time: ${booking.start_time}, End Time: ${booking.end_time}`;
              bookingList.appendChild(bookingItem);
          });
      }
  }

  fetchBookings();
});
