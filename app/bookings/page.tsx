"use client";

import { useEffect, useState } from "react";

interface Booking {
  _id: string; // Booking ID
  hall_id: { name: string; location: string }; // Hall name and location
  nameuser: string;
  date: string; // Date of booking
}

const BookingsPage = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  useEffect(() => {
    const loggedIn = localStorage.getItem("isLoggedIn") === "true";
    setIsLoggedIn(loggedIn);

    if (loggedIn) {
      fetch("/api/bookings/list")
        .then((res) => res.json())
        .then((data: Booking[]) => setBookings(data))
        .catch((error) => {
          setError("Failed to fetch bookings.");
          console.error("Failed to fetch bookings:", error);
        });
    }
  }, []);

  const handleDelete = async (bookingId: string) => {
    const response = await fetch(`/api/bookings`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json", // Set content type as JSON
      },
      body: JSON.stringify({ bookingId }), // Send bookingId in the request body as JSON
    });
  
    if (response.ok) {
      setBookings(bookings.filter((booking) => booking._id !== bookingId));
    } else {
      setError("Failed to delete the booking.");
    }
  };
  

  if (!isLoggedIn) {
    return (
      <div className="p-6 min-h-screen" style={{ backgroundColor: 'var(--background)', color: 'var(--foreground)' }}>
        <h1 className="text-3xl font-bold mb-6 text-center">Page Not Found</h1>
        <p className="text-center">You are not logged in. Please log in to view the bookings.</p>
      </div>
    );
  }

  return (
    <div className="p-6 min-h-screen" style={{ backgroundColor: 'var(--background)', color: 'var(--foreground)' }}>
      <h1 className="text-3xl font-bold mb-6 text-center">Bookings List</h1>
      {error && <p className="text-red-500 text-center">{error}</p>}

      <div className="overflow-x-auto">
        <table className="min-w-full shadow-md rounded-lg" style={{ backgroundColor: 'var(--background)', color: 'var(--foreground)' }}>
          <thead>
            <tr>
              <th className="py-3 px-4 border-b text-left text-sm font-semibold">Booking ID</th>
              <th className="py-3 px-4 border-b text-left text-sm font-semibold">Hall Name</th>
              <th className="py-3 px-4 border-b text-left text-sm font-semibold">User</th>
              <th className="py-3 px-4 border-b text-left text-sm font-semibold">Booking Date</th>
              <th className="py-3 px-4 border-b text-left text-sm font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody>
            {bookings.length > 0 ? (
              bookings.map((booking) => (
                <tr key={booking._id} className="hover:bg-gray-50">
                  <td className="py-3 px-4 border-b text-sm">{booking._id}</td>
                  <td className="py-3 px-4 border-b text-sm">{booking.hall_id.name}</td> {/* Display Hall Name */}
                  <td className="py-3 px-4 border-b text-sm">{booking.nameuser}</td>
                  <td className="py-3 px-4 border-b text-sm">{new Date(booking.date).toLocaleDateString()}</td>
                  <td className="py-3 px-4 border-b text-sm">
                    <button
                      onClick={() => handleDelete(booking._id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} className="py-3 px-4 text-center text-sm">No bookings available.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BookingsPage;
