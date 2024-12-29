"use client";

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
    fetch("/api/volunteers/attendance")
      .then((res) => res.json())
      .then((data: Volunteer[]) => setVolunteers(data))
      .catch(() => setError("Failed to fetch volunteer data."));
  }, []);

  const markAttendance = async (volunteerId: string) => {
    const response = await fetch("/api/volunteers/attendance", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ volunteerId }),
    });

    if (response.ok) {
      setVolunteers(
        volunteers.map((volunteer) =>
          volunteer._id === volunteerId
            ? { ...volunteer, attendance: true }
            : volunteer
        )
      );
      alert("Attendance marked successfully.");
    } else {
      const errorData = await response.json();
      alert(errorData.error || "Failed to mark attendance.");
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Volunteer Attendance</h1>
      {error && <p className="text-red-500">{error}</p>}
      <ul>
        {volunteers.map((volunteer) => (
          <li
            key={volunteer._id}
            className="flex justify-between p-4 border rounded-lg mb-2"
          >
            <div>
              <p className="font-semibold">{volunteer.name}</p>
              <p>Event: {volunteer.event}</p>
              <p>Attendance: {volunteer.attendance ? "Present" : "Absent"}</p>
            </div>
            {!volunteer.attendance && (
              <button
                className="bg-green-500 text-white px-4 py-2 rounded"
                onClick={() => markAttendance(volunteer._id)}
              >
                Mark Present
              </button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default VolunteersPage;
