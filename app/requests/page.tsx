// "use client";

// import { useEffect, useState } from "react";

// // Define the types for the Maintenance and Options
// interface Options {
//   micSystem: boolean;
//   projector: boolean;
//   chairs: boolean;
//   ac: boolean;
//   lighting: boolean;
//   soundSystem: boolean;
//   additionalNotes: string;
// }

// interface Booking {
//   _id: string;
//   nameuser: string;
//   date: string;
//   hall_id: {
//     _id: string;
//     name: string;
//   };
// }

// interface Maintenance {
//   _id: string;
//   booking_id: Booking | null; // booking_id might be null if not populated
//   requestDetails: string;
//   options: Options;
// }

// const MaintenancePage = () => {
//   const [maintenanceRequests, setMaintenanceRequests] = useState<Maintenance[]>([]); // Store maintenance requests
//   const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false); // State to check login status
//   const [error, setError] = useState<string | null>(null); // Error message for failed requests

//   useEffect(() => {
//     // Check if the user is logged in from localStorage
//     const loggedIn = localStorage.getItem("isLoggedIn") === "true";
//     setIsLoggedIn(loggedIn);

//     if (loggedIn) {
//       // Fetch the maintenance requests from the API if logged in
//       fetch("/api/maintenance")
//         .then((res) => res.json())
//         .then((data: Maintenance[]) => setMaintenanceRequests(data))
//         .catch((error) => {
//           setError("Failed to fetch maintenance requests.");
//           console.error("Failed to fetch maintenance requests:", error);
//         });
//     }
//   }, []);

//   if (!isLoggedIn) {
//     return (
//       <div className="p-6 min-h-screen" style={{ backgroundColor: 'var(--background)', color: 'var(--foreground)' }}>
//         <h1 className="text-3xl font-bold mb-6 text-center">Page Not Found</h1>
//         <p className="text-center">You are not logged in. Please log in to view the maintenance requests.</p>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen flex items-center justify-center p-6 bg-background">
//       <div className="w-full max-w-3xl p-8 bg-card-bg text-foreground rounded-lg shadow-lg">
//         <h1 className="text-3xl font-semibold text-center text-heading mb-6">Maintenance Requests</h1>

//         {/* Error Message */}
//         {error && (
//           <p className="text-red-500 text-center mb-6">{error}</p>
//         )}

//         {/* Maintenance Requests List */}
//         {maintenanceRequests.length > 0 ? (
//           maintenanceRequests.map((maintenance) => (
//             <div key={maintenance._id} className="mb-6 p-6 bg-card-bg rounded-lg shadow-md border border-border">
//               <h3 className="text-xl font-semibold text-heading">
//                 Booking ID: {maintenance.booking_id?._id || "N/A"}
//               </h3>
//               <p className="text-text-secondary">
//                 <strong>Booked By:</strong> {maintenance.booking_id?.nameuser || "N/A"}
//               </p>
//               <p className="text-text-secondary">
//                 <strong>Booking Date:</strong> {maintenance.booking_id?.date ? new Date(maintenance.booking_id.date).toLocaleDateString() : "N/A"}
//               </p>
//               <p className="text-text-secondary">
//                 <strong>Hall:</strong> {maintenance.booking_id?.hall_id?.name || "N/A"}
//               </p>

//               {/* Maintenance Options */}
//               <h4 className="mt-4 text-lg font-medium text-heading">Requested Options:</h4>
//               <ul className="list-disc pl-5 text-text-secondary">
//                 {maintenance.options.micSystem && <li>Mic System</li>}
//                 {maintenance.options.projector && <li>Projector</li>}
//                 {maintenance.options.chairs && <li>Chairs</li>}
//                 {maintenance.options.ac && <li>AC</li>}
//                 {maintenance.options.lighting && <li>Lighting</li>}
//                 {maintenance.options.soundSystem && <li>Sound System</li>}
//               </ul>

//               {/* Additional Notes */}
//               {maintenance.options.additionalNotes && (
//                 <p className="mt-4 text-text-secondary">
//                   <strong>Additional Notes:</strong> {maintenance.options.additionalNotes}
//                 </p>
//               )}
//             </div>
//           ))
//         ) : (
//           <p className="text-center text-text-secondary">No maintenance requests available.</p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default MaintenancePage;

"use client";

import { useEffect, useState } from "react";

// Define the types for the Maintenance and Options
interface Options {
  micSystem: boolean;
  projector: boolean;
  chairs: boolean;
  ac: boolean;
  lighting: boolean;
  soundSystem: boolean;
  additionalNotes: string;
}

interface Booking {
  _id: string;
  nameuser: string;
  date: string;
  hall_id: {
    _id: string;
    name: string;
  };
}

interface Maintenance {
  _id: string;
  booking_id: Booking | null; // booking_id might be null if not populated
  requestDetails: string;
  options: Options;
}

const MaintenancePage = () => {
  const [maintenanceRequests, setMaintenanceRequests] = useState<Maintenance[]>([]); // Store maintenance requests
  const [bookings, setBookings] = useState<Booking[]>([]); // Store bookings list
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false); // State to check login status
  const [error, setError] = useState<string | null>(null); // Error message for failed requests

  useEffect(() => {
    // Check if the user is logged in from localStorage
    const loggedIn = localStorage.getItem("isLoggedIn") === "true";
    setIsLoggedIn(loggedIn);

    if (loggedIn) {
      // Fetch the maintenance requests from the API if logged in
      fetch("/api/maintenance")
        .then((res) => res.json())
        .then((data: Maintenance[]) => setMaintenanceRequests(data))
        .catch((error) => {
          setError("Failed to fetch maintenance requests.");
          console.error("Failed to fetch maintenance requests:", error);
        });

      // Fetch the bookings list from /api/bookings/list
      fetch("/api/bookings/list")
        .then((res) => res.json())
        .then((data: Booking[]) => setBookings(data))
        .catch((error) => {
          setError("Failed to fetch bookings list.");
          console.error("Failed to fetch bookings list:", error);
        });
    }
  }, []);

  if (!isLoggedIn) {
    return (
      <div className="p-6 min-h-screen" style={{ backgroundColor: 'var(--background)', color: 'var(--foreground)' }}>
        <h1 className="text-3xl font-bold mb-6 text-center">Page Not Found</h1>
        <p className="text-center">You are not logged in. Please log in to view the maintenance requests.</p>
      </div>
    );
  }

  // Helper function to find the hall name for a booking ID
  const getHallName = (bookingId: string) => {
    const booking = bookings.find((booking) => booking._id === bookingId);
    return booking ? booking.hall_id?.name || "N/A" : "N/A";
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-background">
      <div className="w-full max-w-3xl p-8 bg-card-bg text-foreground rounded-lg shadow-lg">
        <h1 className="text-3xl font-semibold text-center text-heading mb-6">Maintenance Requests</h1>

        {/* Error Message */}
        {error && (
          <p className="text-red-500 text-center mb-6">{error}</p>
        )}

        {/* Maintenance Requests List */}
        {maintenanceRequests.length > 0 ? (
          maintenanceRequests.map((maintenance) => (
            <div key={maintenance._id} className="mb-6 p-6 bg-card-bg rounded-lg shadow-md border border-border">
              <h3 className="text-xl font-semibold text-heading">
                Booking ID: {maintenance.booking_id?._id || "N/A"}
              </h3>
              <p className="text-text-secondary">
                <strong>Booked By:</strong> {maintenance.booking_id?.nameuser || "N/A"}
              </p>
              <p className="text-text-secondary">
                <strong>Booking Date:</strong> {maintenance.booking_id?.date ? new Date(maintenance.booking_id.date).toLocaleDateString() : "N/A"}
              </p>
              <p className="text-text-secondary">
                <strong>Hall:</strong> {getHallName(maintenance.booking_id?._id || "")}
              </p>

              {/* Maintenance Options */}
              <h4 className="mt-4 text-lg font-medium text-heading">Requested Options:</h4>
              <ul className="list-disc pl-5 text-text-secondary">
                {maintenance.options.micSystem && <li>Mic System</li>}
                {maintenance.options.projector && <li>Projector</li>}
                {maintenance.options.chairs && <li>Chairs</li>}
                {maintenance.options.ac && <li>AC</li>}
                {maintenance.options.lighting && <li>Lighting</li>}
                {maintenance.options.soundSystem && <li>Sound System</li>}
              </ul>

              {/* Additional Notes */}
              {maintenance.options.additionalNotes && (
                <p className="mt-4 text-text-secondary">
                  <strong>Additional Notes:</strong> {maintenance.options.additionalNotes}
                </p>
              )}
            </div>
          ))
        ) : (
          <p className="text-center text-text-secondary">No maintenance requests available.</p>
        )}
      </div>
    </div>
  );
};

export default MaintenancePage;
