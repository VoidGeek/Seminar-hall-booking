"use client";

import Link from "next/link";

const HomePage = () => {
  return (
    <div
      className="p-6 min-h-screen flex flex-col items-center justify-center"
      style={{ backgroundColor: "var(--background)" }} // Set background color from global.css
    >
      <h1
        className="text-4xl font-bold mb-6 text-center"
        style={{ color: "var(--foreground)" }} // Text color based on global.css
      >
        Welcome to Seminar Hall Management
      </h1>
      <p
        className="text-lg mb-8 text-center max-w-2xl"
        style={{ color: "var(--secondary)" }} // Secondary text color based on global.css
      >
        Simplify your operations by managing seminar halls, tracking volunteer
        attendance, and submitting maintenance requests effortlessly.
      </p>
      <div className="flex flex-wrap justify-center gap-4">
        <Link href="/halls">
          <button
            className="px-6 py-3 rounded-lg transition text-lg font-medium"
            style={{
              backgroundColor: "var(--primary)", // Primary button color based on global.css
              color: "white", // Ensure the button text is white
            }}
          >
            Manage Halls
          </button>
        </Link>
        <Link href="/maintenance">
          <button
            className="px-6 py-3 rounded-lg transition text-lg font-medium"
            style={{
              backgroundColor: "var(--success)", // Success button color based on global.css
              color: "white", // Ensure the button text is white
            }}
          >
            Submit Maintenance Request
          </button>
        </Link>
        <Link href="/volunteers">
          <button
            className="px-6 py-3 rounded-lg transition text-lg font-medium"
            style={{
              backgroundColor: "var(--info)", // Info button color based on global.css
              color: "white", // Ensure the button text is white
            }}
          >
            Track Volunteers
          </button>
        </Link>
      </div>
    </div>
  );
};

export default HomePage;
