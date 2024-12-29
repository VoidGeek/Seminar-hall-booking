"use client";

import { useEffect, useState } from "react";

// Define the types for the Volunteer and Options
interface Volunteer {
  _id: string;
  name: string;
  event: string;
  attendance: boolean;
  usn: string; // Added USN field
}

const VolunteersPage = () => {
  const [volunteers, setVolunteers] = useState<Volunteer[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [newVolunteer, setNewVolunteer] = useState<Volunteer>({
    _id: "",
    name: "",
    event: "",
    attendance: false,
    usn: "", // Default USN field
  });

  const [editVolunteer, setEditVolunteer] = useState<Volunteer | null>(null); // For editing volunteer

  useEffect(() => {
    // Fetch the list of volunteers
    fetch("/api/volunteers/attendance")
      .then((res) => res.json())
      .then((data: Volunteer[]) => setVolunteers(data))
      .catch(() => setError("Failed to fetch volunteer data."));
  }, []);

  // Update attendance for a volunteer
  const updateAttendance = async (volunteerId: string, attendance: boolean) => {
    const response = await fetch("/api/volunteers/attendance", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ volunteerId, attendance }),
    });

    if (response.ok) {
      setVolunteers(
        volunteers.map((volunteer) =>
          volunteer._id === volunteerId
            ? { ...volunteer, attendance }
            : volunteer
        )
      );
      alert("Attendance updated successfully.");
    } else {
      const errorData = await response.json();
      alert(errorData.error || "Failed to update attendance.");
    }
  };

  // Add a new volunteer
  const handleAddVolunteer = async (e: React.FormEvent) => {
    e.preventDefault();

    const response = await fetch("/api/volunteers", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newVolunteer),
    });

    if (response.ok) {
      setNewVolunteer({
        _id: "",
        name: "",
        event: "",
        attendance: false,
        usn: "", // Reset USN field
      }); // Reset form
      alert("Volunteer added successfully.");
      window.location.reload(); // Reload the page after adding a volunteer
    } else {
      const errorData = await response.json();
      alert(errorData.error || "Failed to add volunteer.");
    }
  };

  // Delete a volunteer
  const handleDeleteVolunteer = async (volunteerId: string) => {
    const response = await fetch("/api/volunteers", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ volunteerId }),
    });

    if (response.ok) {
      setVolunteers(volunteers.filter((volunteer) => volunteer._id !== volunteerId));
      alert("Volunteer deleted successfully.");
    } else {
      const errorData = await response.json();
      alert(errorData.error || "Failed to delete volunteer.");
    }
  };

  // Handle form submission for updating a volunteer's details
  const handleUpdateVolunteer = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editVolunteer) return;
  
    const { _id, name, event, usn } = editVolunteer;
  
    const response = await fetch("/api/volunteers", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        volunteerId: _id,
        name,
        event,
        usn, // Include USN for updating
      }),
    });
  
    if (response.ok) {
      setVolunteers(
        volunteers.map((volunteer) =>
          volunteer._id === _id ? { ...editVolunteer } : volunteer
        )
      );
      setEditVolunteer(null); // Reset the edit form
      alert("Volunteer updated successfully.");
    } else {
      const errorData = await response.json();
      alert(errorData.error || "Failed to update volunteer.");
    }
  };
  
  // Set the volunteer to be edited
  const handleEditVolunteer = (volunteer: Volunteer) => {
    setEditVolunteer(volunteer); // Set the volunteer to be edited
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-4xl font-bold text-center mb-6">Volunteer Attendance</h1>
      {error && <p className="text-red-500 text-center">{error}</p>}

      {/* Form to add new volunteer */}
      <form onSubmit={handleAddVolunteer} className="mb-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="name" className="block text-lg font-medium">Name</label>
            <input
              id="name"
              type="text"
              value={newVolunteer.name}
              onChange={(e) => setNewVolunteer({ ...newVolunteer, name: e.target.value })}
              className="mt-2 p-2 border border-gray-300 rounded-md w-full"
              required
            />
          </div>

          <div>
            <label htmlFor="usn" className="block text-lg font-medium">USN</label>
            <input
              id="usn"
              type="text"
              value={newVolunteer.usn}
              onChange={(e) => setNewVolunteer({ ...newVolunteer, usn: e.target.value })}
              className="mt-2 p-2 border border-gray-300 rounded-md w-full"
              required
            />
          </div>

          <div>
            <label htmlFor="event" className="block text-lg font-medium">Event</label>
            <input
              id="event"
              type="text"
              value={newVolunteer.event}
              onChange={(e) => setNewVolunteer({ ...newVolunteer, event: e.target.value })}
              className="mt-2 p-2 border border-gray-300 rounded-md w-full"
              required
            />
          </div>
        </div>

        <div className="mt-4 text-center">
          <button
            type="submit"
            className="px-6 py-2 bg-blue-500 text-white rounded-lg font-semibold hover:bg-blue-600"
          >
            Add Volunteer
          </button>
        </div>
      </form>

      {/* Table for displaying volunteers */}
      <div className="overflow-x-auto">
        <table className="min-w-full table-auto sm:table-fixed">
          <thead>
            <tr>
              <th className="px-4 py-2 text-left">Name</th>
              <th className="px-4 py-2 text-left">USN</th> {/* Display USN First */}
              <th className="px-4 py-2 text-left">Event</th>
              <th className="px-4 py-2 text-left">Attendance</th>
              <th className="px-4 py-2 text-left">Attendance Actions</th>
              <th className="px-4 py-2 text-left">Edit/Delete Actions</th>
            </tr>
          </thead>
          <tbody>
            {volunteers.map((volunteer) => (
              <tr key={volunteer._id} className="border-b hover:bg-gray-50 transition-colors">
                {editVolunteer && editVolunteer._id === volunteer._id ? (
                  <>
                    <td className="px-4 py-2">
                      <input
                        type="text"
                        value={editVolunteer.name}
                        onChange={(e) => setEditVolunteer({ ...editVolunteer, name: e.target.value })}
                        className="p-2 border border-gray-300 rounded-md"
                        required
                      />
                    </td>
                    <td className="px-4 py-2">
                      <input
                        type="text"
                        value={editVolunteer.usn}
                        onChange={(e) => setEditVolunteer({ ...editVolunteer, usn: e.target.value })}
                        className="p-2 border border-gray-300 rounded-md"
                        required
                      />
                    </td>
                    <td className="px-4 py-2">
                      <input
                        type="text"
                        value={editVolunteer.event}
                        onChange={(e) => setEditVolunteer({ ...editVolunteer, event: e.target.value })}
                        className="p-2 border border-gray-300 rounded-md"
                        required
                      />
                    </td>
                    <td className="px-4 py-2">{volunteer.attendance ? "Present" : "Absent"}</td>
                    <td className="px-4 py-2">
                      <div className="flex space-x-2">
                        <button
                          className="px-4 py-1 bg-yellow-500 text-white rounded-md font-semibold hover:bg-yellow-600"
                          onClick={handleUpdateVolunteer}
                        >
                          Save
                        </button>
                        <button
                          className="px-4 py-1 bg-gray-500 text-white rounded-md font-semibold hover:bg-gray-600"
                          onClick={() => setEditVolunteer(null)}
                        >
                          Cancel
                        </button>
                      </div>
                    </td>
                  </>
                ) : (
                  <>
                    <td className="px-4 py-2">{volunteer.name}</td>
                    <td className="px-4 py-2">{volunteer.usn}</td> {/* Display USN */}
                    <td className="px-4 py-2">{volunteer.event}</td>
                    <td className="px-4 py-2">
                      {volunteer.attendance ? "Present" : "Absent"}
                    </td>
                    <td className="px-4 py-2">
                      <button
                        className={`px-4 py-1 rounded-md font-semibold ${
                          volunteer.attendance ? "bg-red-500" : "bg-green-500"
                        } text-white`}
                        onClick={() => updateAttendance(volunteer._id, !volunteer.attendance)}
                      >
                        {volunteer.attendance ? "Mark Absent" : "Mark Present"}
                      </button>
                    </td>
                    <td className="px-4 py-2 flex space-x-2">
                      <button
                        className="px-4 py-1 bg-yellow-500 text-white rounded-md font-semibold hover:bg-yellow-600"
                        onClick={() => handleEditVolunteer(volunteer)}
                      >
                        Edit
                      </button>
                      <button
                        className="px-4 py-1 bg-red-500 text-white rounded-md font-semibold hover:bg-red-600"
                        onClick={() => handleDeleteVolunteer(volunteer._id)}
                      >
                        Delete
                      </button>
                    </td>
                  </>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default VolunteersPage;
