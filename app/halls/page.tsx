// "use client";

// import { useEffect, useState } from "react";

// interface Hall {
//   _id: string;
//   name: string;
// }

// const HallsPage = () => {
//   const [halls, setHalls] = useState<Hall[]>([]); // Hall data state
//   const [error, setError] = useState<string>(""); // Error message state
//   const [selectedHall, setSelectedHall] = useState<Hall | null>(null); // Selected hall
//   const [bookingDate, setBookingDate] = useState<string>(""); // Date for booking
//   const [availability, setAvailability] = useState<string>(""); // Availability message
//   const [nameuser, setNameuser] = useState<string>(""); // User's name input

//   useEffect(() => {
//     // Fetch halls from the API
//     fetch("/api/halls/list")
//       .then((res) => res.json())
//       .then((data: Hall[]) => setHalls(data))
//       .catch((error) => {
//         setError("Failed to fetch halls.");
//         console.error("Failed to fetch halls:", error);
//       });
//   }, []);

//   const checkAvailability = async (hallId: string, selectedDate: string) => {
//     // Check if the hall is available for the selected date
//     const response = await fetch("/api/halls/availability", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ hallId, selectedDate }),
//     });

//     if (response.ok) {
//       setAvailability("Hall is available!");
//     } else {
//       const errorData = await response.json();
//       setAvailability(errorData.error || "Hall is not available for this date.");
//     }
//   };

//   const bookHall = async (hallId: string, selectedDate: string) => {
//     if (!nameuser) {
//       alert("Please enter your name.");
//       return;
//     }

//     // Book the hall for the selected date
//     const response = await fetch("/api/halls/book", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ hallId, selectedDate, nameuser }), // Send nameuser
//     });

//     if (response.ok) {
//       alert("Hall booked successfully for " + selectedDate);
//       setAvailability("Hall is booked for " + selectedDate);
//     } else {
//       const errorData = await response.json();
//       alert(errorData.error || "Failed to book the hall.");
//     }
//   };

//   const handleSelectHall = (hall: Hall) => {
//     setSelectedHall(hall);
//     setAvailability(""); // Reset availability message
//   };

//   return (
//     <div className="p-6 bg-var-background text-var-foreground min-h-screen">
//       <h1 className="text-3xl font-bold mb-6 text-center">Seminar Halls</h1>
//       {error && <p className="text-red-500 text-center">{error}</p>}

//       {/* Hall List */}
//       <div className="mb-6 text-center">
//         <h2 className="text-xl font-semibold mb-4">Select a Hall to Book:</h2>
//         <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//           {halls.map((hall) => (
//             <li key={hall._id} className="p-4 bg-white rounded-lg shadow-md">
//               <h3 className="text-lg font-semibold">{hall.name}</h3>
//               <button
//                 onClick={() => handleSelectHall(hall)}
//                 className="mt-2 bg-blue-500 text-white px-4 py-2 rounded-lg"
//               >
//                 Select Hall
//               </button>
//             </li>
//           ))}
//         </ul>
//       </div>

//       {selectedHall && (
//         <div className="text-center mb-6">
//           <h3 className="text-lg font-medium">Booking for {selectedHall.name}</h3>

//           {/* User Name Form */}
//           <div className="mt-4">
//             <input
//               type="text"
//               placeholder="Enter your name"
//               value={nameuser}
//               onChange={(e) => setNameuser(e.target.value)}
//               className="p-2 border border-gray-300 rounded-md"
//             />
//           </div>

//           {/* Date Picker */}
//           <div className="mt-4">
//             <input
//               type="date"
//               value={bookingDate}
//               onChange={(e) => setBookingDate(e.target.value)}
//               className="p-2 border border-gray-300 rounded-md"
//             />
//           </div>

//           {/* Check Availability Button */}
//           <div className="mt-4">
//             <button
//               onClick={() => checkAvailability(selectedHall._id, bookingDate)}
//               className="bg-blue-500 text-white px-6 py-2 rounded-lg"
//             >
//               Check Availability
//             </button>
//           </div>

//           {availability && <p className="mt-2">{availability}</p>}

//           {/* Book Now Button */}
//           {availability === "Hall is available!" && (
//             <button
//               onClick={() => bookHall(selectedHall._id, bookingDate)}
//               className="mt-4 bg-green-500 text-white px-6 py-2 rounded-lg"
//             >
//               Book Now
//             </button>
//           )}
//         </div>
//       )}
//     </div>
//   );
// };

// export default HallsPage;

// "use client";

// import { useEffect, useState } from "react";

// interface Hall {
//   _id: string;
//   name: string;
// }

// const HallsPage = () => {
//   const [halls, setHalls] = useState<Hall[]>([]); // Hall data state
//   const [error, setError] = useState<string>(""); // Error message state
//   const [selectedHall, setSelectedHall] = useState<Hall | null>(null); // Selected hall
//   const [bookingDate, setBookingDate] = useState<string>(""); // Date for booking
//   const [availability, setAvailability] = useState<string>(""); // Availability message
//   const [nameuser, setNameuser] = useState<string>(""); // User's name input

//   useEffect(() => {
//     // Fetch halls from the API
//     fetch("/api/halls/list")
//       .then((res) => res.json())
//       .then((data: Hall[]) => setHalls(data))
//       .catch((error) => {
//         setError("Failed to fetch halls.");
//         console.error("Failed to fetch halls:", error);
//       });
//   }, []);

//   const checkAvailability = async (hallId: string, selectedDate: string) => {
//     // Fetch all bookings
//     const response = await fetch("/api/bookings/list");
//     if (!response.ok) {
//       setAvailability("Failed to fetch bookings.");
//       return;
//     }
    
//     const bookings = await response.json();
//     console.log("Fetched bookings: ", bookings);

//     // Ensure the selectedDate is formatted properly (YYYY-MM-DD)
//     const formattedSelectedDate = selectedDate; // Since input type="date" gives a YYYY-MM-DD string

//     // Check if the hall is already booked for the selected date
//     const isBooked = bookings.some((booking: any) => {
//       const bookingDate = new Date(booking.date).toISOString().split("T")[0]; // Format to YYYY-MM-DD
//       return booking.hall_id._id === hallId && bookingDate === formattedSelectedDate;
//     });

//     if (isBooked) {
//       setAvailability("Hall is already booked for this date.");
//     } else {
//       setAvailability("Hall is available!");
//     }
//   };

//   const bookHall = async (hallId: string, selectedDate: string) => {
//     if (!nameuser) {
//       alert("Please enter your name.");
//       return;
//     }

//     // Book the hall for the selected date
//     const response = await fetch("/api/halls/book", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ hallId, selectedDate, nameuser }), // Send nameuser
//     });

//     if (response.ok) {
//       alert("Hall booked successfully for " + selectedDate);
//       setAvailability("Hall is booked for " + selectedDate);
//     } else {
//       const errorData = await response.json();
//       alert(errorData.error || "Failed to book the hall.");
//     }
//   };

//   const handleSelectHall = (hall: Hall) => {
//     setSelectedHall(hall);
//     setAvailability(""); // Reset availability message
//   };

//   return (
//     <div className="p-6 bg-var-background text-var-foreground min-h-screen">
//       <h1 className="text-3xl font-bold mb-6 text-center">Seminar Halls</h1>
//       {error && <p className="text-red-500 text-center">{error}</p>}

//       {/* Hall List */}
//       <div className="mb-6 text-center">
//         <h2 className="text-xl font-semibold mb-4">Select a Hall to Book:</h2>
//         <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//           {halls.map((hall) => (
//             <li key={hall._id} className="p-4 bg-white rounded-lg shadow-md">
//               <h3 className="text-lg font-semibold">{hall.name}</h3>
//               <button
//                 onClick={() => handleSelectHall(hall)}
//                 className="mt-2 bg-blue-500 text-white px-4 py-2 rounded-lg"
//               >
//                 Select Hall
//               </button>
//             </li>
//           ))}
//         </ul>
//       </div>

//       {selectedHall && (
//         <div className="text-center mb-6">
//           <h3 className="text-lg font-medium">Booking for {selectedHall.name}</h3>

//           {/* User Name Form */}
//           <div className="mt-4">
//             <input
//               type="text"
//               placeholder="Enter your name"
//               value={nameuser}
//               onChange={(e) => setNameuser(e.target.value)}
//               className="p-2 border border-gray-300 rounded-md"
//             />
//           </div>

//           {/* Date Picker */}
//           <div className="mt-4">
//             <input
//               type="date"
//               value={bookingDate}
//               onChange={(e) => setBookingDate(e.target.value)}
//               className="p-2 border border-gray-300 rounded-md"
//             />
//           </div>

//           {/* Check Availability Button */}
//           <div className="mt-4">
//             <button
//               onClick={() => checkAvailability(selectedHall._id, bookingDate)}
//               className="bg-blue-500 text-white px-6 py-2 rounded-lg"
//             >
//               Check Availability
//             </button>
//           </div>

//           {availability && <p className="mt-2">{availability}</p>}

//           {/* Book Now Button */}
//           {availability === "Hall is available!" && (
//             <button
//               onClick={() => bookHall(selectedHall._id, bookingDate)}
//               className="mt-4 bg-green-500 text-white px-6 py-2 rounded-lg"
//             >
//               Book Now
//             </button>
//           )}
//         </div>
//       )}
//     </div>
//   );
// };

// export default HallsPage;

"use client"
import { useEffect, useState } from "react";

interface Hall {
  _id: string;
  name: string;
}

interface Booking {
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
    // Fetch all bookings
    const response = await fetch("/api/bookings/list");
    if (!response.ok) {
      setAvailability("Failed to fetch bookings.");
      return;
    }

    const bookings: Booking[] = await response.json(); // Use the Booking type here

    // Ensure the selectedDate is formatted properly (YYYY-MM-DD)
    const formattedSelectedDate = selectedDate; // Since input type="date" gives a YYYY-MM-DD string

    // Check if the hall is already booked for the selected date
    const isBooked = bookings.some((booking) => {
      const bookingDate = new Date(booking.date).toISOString().split("T")[0]; // Format to YYYY-MM-DD
      return booking.hall_id._id === hallId && bookingDate === formattedSelectedDate;
    });

    if (isBooked) {
      setAvailability("Hall is already booked for this date.");
    } else {
      setAvailability("Hall is available!");
    }
  };

  const bookHall = async (hallId: string, selectedDate: string) => {
    if (!nameuser) {
      alert("Please enter your name.");
      return;
    }

    // Book the hall for the selected date
    const response = await fetch("/api/halls/book", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ hallId, selectedDate, nameuser }), // Send nameuser
    });

    if (response.ok) {
      alert("Hall booked successfully for " + selectedDate);
      setAvailability("Hall is booked for " + selectedDate);
    } else {
      const errorData = await response.json();
      alert(errorData.error || "Failed to book the hall.");
    }
  };

  const handleSelectHall = (hall: Hall) => {
    setSelectedHall(hall);
    setAvailability(""); // Reset availability message
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
            <li key={hall._id} className="p-4 rounded-lg shadow-md hover:bg-gray-100 dark:hover:bg-gray-600"
                style={{
                  backgroundColor: "var(--card-bg)",
                  border: "1px solid var(--border)",
                }}>
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

      {selectedHall && (
        <div className="text-center mb-6">
          <h3 className="text-lg font-medium">Booking for {selectedHall.name}</h3>

          {/* User Name Form */}
          <div className="mt-4">
            <input
              type="text"
              placeholder="Enter your name"
              value={nameuser}
              onChange={(e) => setNameuser(e.target.value)}
              className="p-2 border border-gray-300 dark:border-gray-600 rounded-md"
              style={{ backgroundColor: "var(--input-bg)" }}
            />
          </div>

          {/* Date Picker */}
          <div className="mt-4">
            <input
              type="date"
              value={bookingDate}
              onChange={(e) => setBookingDate(e.target.value)}
              className="p-2 border border-gray-300 dark:border-gray-600 rounded-md"
              style={{ backgroundColor: "var(--input-bg)" }}
            />
          </div>

          {/* Check Availability Button */}
          <div className="mt-4">
            <button
              onClick={() => checkAvailability(selectedHall._id, bookingDate)}
              className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 dark:hover:bg-blue-700"
            >
              Check Availability
            </button>
          </div>

          {availability && <p className="mt-2">{availability}</p>}

          {/* Book Now Button */}
          {availability === "Hall is available!" && (
            <button
              onClick={() => bookHall(selectedHall._id, bookingDate)}
              className="mt-4 bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 dark:hover:bg-blue-700"
            >
              Book Now
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default HallsPage;
