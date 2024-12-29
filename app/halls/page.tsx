"use client";

import { useEffect, useState } from "react";
import HallCard from "@/app/components/HallCard"; // Import the HallCard component

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
      .then((data: Hall[]) => setHalls(data)) // Explicitly type the fetched data
      .catch((error) => console.error("Failed to fetch halls:", error));
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
      alert(error.error || "Failed to book the hall.");
    }
  };

  return (
    <div className="p-6 bg-var-background text-var-foreground min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-center">Seminar Halls</h1>
      <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {halls.map((hall) => (
          <li key={hall._id}>
            <HallCard hall={hall} bookHall={bookHall} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default HallsPage;
