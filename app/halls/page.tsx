"use client";

import { useEffect, useState } from "react";

interface Hall {
  _id: string;
  name: string;
}

interface Booking {
  _id: string; // Booking ID
  date: string; // The booking date in string format (e.g., "YYYY-MM-DD")
  hall_id: {
    _id: string; // Hall ID
  };
}

const HallsPage = () => {
  const [halls, setHalls] = useState<Hall[]>([]); // Hall data state
  const [error, setError] = useState<string>(""); // Error message state
  const [selectedHall, setSelectedHall] = useState<Hall | null>(null); // Selected hall
  const [bookingDate, setBookingDate] = useState<string>(""); // Date for booking
  const [availability, setAvailability] = useState<string>(""); // Availability message
  const [nameuser, setNameuser] = useState<string>(""); // User's name input
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false); // State to control modal visibility
  const [bookingId, setBookingId] = useState<string | null>(null); // Store the booking ID
  const [showBookingConfirmation, setShowBookingConfirmation] = useState<boolean>(false); // Show confirmation message

  useEffect(() => {
    // Fetch halls from the API
    fetch("/api/halls/list")
      .then((res) => res.json())
      .then((data: Hall[]) => setHalls(data))
      .catch((error) => {
        setError("Failed to fetch halls.");
        console.error("Failed to fetch halls:", error);
      });
  }, []);

  const checkAvailability = async (hallId: string, selectedDate: string) => {
    console.log(`Checking availability for hall: ${hallId} on ${selectedDate}`);
    
    const response = await fetch("/api/bookings/list");
    if (!response.ok) {
      setAvailability("Failed to fetch bookings.");
      console.error("Failed to fetch bookings.");
      return;
    }

    const bookings: Booking[] = await response.json();
    console.log("Fetched bookings:", bookings);

    const formattedSelectedDate = selectedDate; // Since input type="date" gives a YYYY-MM-DD string

    const isBooked = bookings.some((booking) => {
      const bookingDate = new Date(booking.date).toISOString().split("T")[0]; // Format to YYYY-MM-DD
      return booking.hall_id._id === hallId && bookingDate === formattedSelectedDate;
    });

    if (isBooked) {
      setAvailability("Hall is already booked for this date.");
      console.log("Hall is already booked.");
    } else {
      setAvailability("Hall is available!");
      console.log("Hall is available.");
    }
  };

  const bookHall = async (hallId: string, selectedDate: string) => {
    console.log(`Booking hall ${hallId} for date: ${selectedDate}`);
    if (!nameuser) {
      alert("Please enter your name.");
      return;
    }

    const response = await fetch("/api/halls/book", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ hallId, selectedDate, nameuser }),
    });

    if (response.ok) {
      const data = await response.json();
      console.log("Booking successful! Booking ID:", data.bookingId); // Log the _id as bookingId
      setBookingId(data.bookingId); // Set the _id as the booking ID
      setShowBookingConfirmation(true); // Show booking confirmation message
      setAvailability("Hall is booked for " + selectedDate);
      setIsModalOpen(false); // Close the modal after booking
    } else {
      const errorData = await response.json();
      alert(errorData.error || "Failed to book the hall.");
      console.error("Booking failed:", errorData.error);
    }
  };

  const handleSelectHall = (hall: Hall) => {
    setSelectedHall(hall);
    setIsModalOpen(true); // Open the modal when a hall is selected
    setAvailability(""); // Reset availability message
    console.log("Hall selected:", hall.name);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false); // Close the modal
    setSelectedHall(null); // Reset the selected hall
    setNameuser(""); // Reset the name input
    setBookingDate(""); // Reset the booking date
    console.log("Modal closed, data reset.");
  };

  const copyToClipboard = () => {
    if (bookingId) {
      navigator.clipboard.writeText(bookingId);
      alert("Booking ID copied to clipboard!");
      console.log("Booking ID copied to clipboard:", bookingId);
    }
  };

  return (
    <div className="p-6 min-h-screen bg-background text-foreground">
      <h1 className="text-3xl font-bold mb-6 text-center">Seminar Halls</h1>
      {error && <p className="text-red-500 text-center">{error}</p>}

      {/* Hall List */}
      <div className="mb-6 text-center">
        <h2 className="text-xl font-semibold mb-4">Select a Hall to Book:</h2>
        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {halls.map((hall) => (
            <li
              key={hall._id}
              className="p-4 rounded-lg shadow-md transition-colors duration-300 ease-in-out hover:bg-gray-300 dark:hover:bg-gray-600"
            >
              <h3 className="text-lg font-semibold">{hall.name}</h3>
              <button
                onClick={() => handleSelectHall(hall)}
                className="mt-2 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 dark:hover:bg-blue-700"
              >
                Select Hall
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Modal for Booking */}
      {isModalOpen && selectedHall && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-background text-foreground p-6 rounded-lg shadow-lg max-w-md w-full">
            <h3 className="text-lg font-medium">Booking for {selectedHall.name}</h3>

            {/* User Name Form */}
            <div className="mt-4">
              <input
                type="text"
                placeholder="Enter your name"
                value={nameuser}
                onChange={(e) => setNameuser(e.target.value)}
                className="p-2 border border-gray-300 rounded-md w-full"
              />
            </div>

            {/* Date Picker */}
            <div className="mt-4">
              <input
                type="date"
                value={bookingDate}
                onChange={(e) => setBookingDate(e.target.value)}
                className="p-2 border border-gray-300 rounded-md w-full"
              />
            </div>

            {/* Check Availability Button */}
            <div className="mt-4">
              <button
                onClick={() => checkAvailability(selectedHall._id, bookingDate)}
                className="bg-blue-500 text-white px-6 py-2 rounded-lg w-full"
              >
                Check Availability
              </button>
            </div>

            {availability && <p className="mt-2 text-center">{availability}</p>}

            {/* Book Now Button */}
            {availability === "Hall is available!" && (
              <button
                onClick={() => bookHall(selectedHall._id, bookingDate)}
                className="mt-4 bg-green-500 text-white px-6 py-2 rounded-lg w-full"
              >
                Book Now
              </button>
            )}

            {/* Close Button */}
            <button
              onClick={handleCloseModal}
              className="mt-4 bg-red-500 text-white px-6 py-2 rounded-lg w-full"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Booking Confirmation Display */}
      {showBookingConfirmation && bookingId && (
        <div className="mt-6 text-center p-4 border border-green-500 bg-green-50 rounded-lg">
          <h3 className="text-xl font-medium">Booking Successful!</h3>
          <p className="mt-4">Your booking ID: <strong>{bookingId}</strong></p>
          <p className="mt-2 text-sm text-gray-500">Please copy this booking ID, it is absolutely necessary for your booking.</p>
          <button
            onClick={copyToClipboard}
            className="mt-4 bg-blue-500 text-white px-6 py-2 rounded-lg"
          >
            Copy Booking ID
          </button>
        </div>
      )}
    </div>
  );
};

export default HallsPage;
