"use client";

import { useEffect, useState } from "react";

interface Hall {
  _id: string;
  name: string;
  status: string; // Available, Booked, etc.
}

const HallsPage = () => {
  const [halls, setHalls] = useState<Hall[]>([]); // Explicitly define the type

  useEffect(() => {
    fetch("/api/halls/list")
      .then((res) => res.json())
      .then((data: Hall[]) => setHalls(data)); // Explicitly type the fetched data
  }, []);

  const bookHall = async (hallId: string) => {
    const response = await fetch("/api/halls/book", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ hallId }),
    });

    if (response.ok) {
      alert("Hall booked successfully");
      setHalls(
        halls.map((hall) =>
          hall._id === hallId ? { ...hall, status: "Booked" } : hall
        )
      );
    } else {
      const error = await response.json();
      alert(error.error);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold">Seminar Halls</h1>
      <ul className="mt-4">
        {halls.map((hall) => (
          <li key={hall._id} className="flex justify-between p-4 border rounded-lg">
            <span>{hall.name}</span>
            <span>{hall.status}</span>
            {hall.status === "Available" && (
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded"
                onClick={() => bookHall(hall._id)}
              >
                Book
              </button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default HallsPage;
