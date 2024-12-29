"use client"
import { useEffect, useState } from "react";

interface Volunteer {
  _id: string;
  name: string;
  event: string;
  attendance: boolean;
}

const VolunteersPage = () => {
  const [volunteers, setVolunteers] = useState<Volunteer[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    // Fetch the list of volunteers
    fetch("api/volunteers/attendance")
  .then((res) => {
    // Log the status and headers to check for any issues with the response
    console.log('Response status:', res.status);
    console.log('Response headers:', res.headers);

    if (!res.ok) {
      throw new Error(`HTTP error! Status: ${res.status}`);
    }
    return res.json();
  })
  .then((data: Volunteer[] | { error: string }) => {
    // Log the response data for debugging
    console.log('Response data:', data);

    if (Array.isArray(data)) {
      setVolunteers(data);
    } else {
      setError("Failed to fetch volunteer data.");
    }
  })
  .catch((err) => {
    // Enhanced error logging
    console.error("Fetch error:", err);

    // If the error contains specific message, log it
    if (err.message) {
      console.error("Error message:", err.message);
    }

    // Set the error state to display in the UI
    setError("Failed to fetch volunteer data.");
  });


  }, []);

  const toggleAttendance = async (volunteerId: string, currentStatus: boolean) => {
    const response = await fetch("/api/volunteers/attendance", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ volunteerId, attendance: !currentStatus }),
    });

    if (response.ok) {
      setVolunteers(
        volunteers.map((volunteer) =>
          volunteer._id === volunteerId
            ? { ...volunteer, attendance: !currentStatus }
            : volunteer
        )
      );
      alert(
        `Attendance updated: ${
          !currentStatus ? "Marked Present" : "Marked Absent"
        }.`
      );
    } else {
      const errorData = await response.json();
      alert(errorData.error || "Failed to update attendance.");
    }
  };

  return (
    <div className="p-6 min-h-screen" style={{ backgroundColor: "var(--background)" }}>
      <h1
        className="text-3xl font-bold mb-6 text-center"
        style={{ color: "var(--foreground)" }}
      >
        Volunteer Attendance
      </h1>
      {error && <p className="text-red-500 text-center">{error}</p>}
      <ul>
        {volunteers.map((volunteer) => (
          <li
            key={volunteer._id}
            className="flex justify-between items-center p-4 border rounded-lg mb-4"
            style={{
              backgroundColor: "var(--card-bg)",
              borderColor: "var(--border)",
            }}
          >
            <div>
              <p
                className="font-semibold"
                style={{ color: "var(--foreground)" }}
              >
                {volunteer.name}
              </p>
              <p className="text-gray-400" style={{ color: "var(--secondary)" }}>
                Event: {volunteer.event}
              </p>
              <p className="text-gray-300" style={{ color: "var(--foreground)" }}>
                Attendance:{" "}
                <span
                  className={`${
                    volunteer.attendance ? "text-green-400" : "text-red-400"
                  }`}
                >
                  {volunteer.attendance ? "Present" : "Absent"}
                </span>
              </p>
            </div>
            <button
              className={`px-4 py-2 rounded font-semibold transition ${
                volunteer.attendance
                  ? "bg-red-500 hover:bg-red-600 text-white"
                  : "bg-green-500 hover:bg-green-600 text-white"
              }`}
              onClick={() => toggleAttendance(volunteer._id, volunteer.attendance)}
              style={{
                backgroundColor: volunteer.attendance
                  ? "var(--error)"
                  : "var(--primary)",
              }}
            >
              {volunteer.attendance ? "Mark Absent" : "Mark Present"}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default VolunteersPage;
