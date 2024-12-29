"use client";

import { useEffect, useState } from "react";

interface Booking {
  _id: string;
  hall_id: { name: string }; // Hall name
  nameuser: string;
  date: string; // Date of booking
}

const BookingsPage = () => {
  const [bookings, setBookings] = useState<Booking[]>([]); // State to store bookings
  const [error, setError] = useState<string>(""); // State to handle errors

  useEffect(() => {
    // Fetch the bookings from the API
    fetch("/api/bookings/list")
      .then((res) => res.json())
      .then((data: Booking[]) => setBookings(data))
      .catch((error) => {
        setError("Failed to fetch bookings.");
        console.error("Failed to fetch bookings:", error);
      });
  }, []);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">Bookings List</h1>
      {error && <p className="text-red-500 text-center">{error}</p>}

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow-md rounded-lg">
          <thead>
            <tr>
              <th className="py-3 px-4 border-b text-left text-sm font-semibold text-gray-700">Hall Name</th>
              <th className="py-3 px-4 border-b text-left text-sm font-semibold text-gray-700">User</th>
              <th className="py-3 px-4 border-b text-left text-sm font-semibold text-gray-700">Booking Date</th>
            </tr>
          </thead>
          <tbody>
            {bookings.length > 0 ? (
              bookings.map((booking) => (
                <tr key={booking._id} className="hover:bg-gray-50">
                  <td className="py-3 px-4 border-b text-sm text-gray-700">{booking.hall_id.name}</td>
                  <td className="py-3 px-4 border-b text-sm text-gray-700">{booking.nameuser}</td>
                  <td className="py-3 px-4 border-b text-sm text-gray-700">{new Date(booking.date).toLocaleDateString()}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={3} className="py-3 px-4 text-center text-gray-700">No bookings available.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BookingsPage;
