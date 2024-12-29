"use client";

import Link from "next/link";

const HomePage = () => {
  return (
    <div className="p-6 text-center">
      <h1 className="text-4xl font-bold mb-6">Welcome to Seminar Hall Management</h1>
      <p className="text-lg mb-6">
        Easily manage seminar halls, track volunteer attendance, and submit maintenance requests.
      </p>
      <div className="flex justify-center gap-4">
        <Link href="/halls">
          <button className="bg-blue-500 text-white px-6 py-3 rounded">
            Manage Halls
          </button>
        </Link>
        <Link href="/maintenance">
          <button className="bg-green-500 text-white px-6 py-3 rounded">
            Submit Maintenance Request
          </button>
        </Link>
        <Link href="/volunteers">
          <button className="bg-purple-500 text-white px-6 py-3 rounded">
            Track Volunteers
          </button>
        </Link>
      </div>
    </div>
  );
};

export default HomePage;
