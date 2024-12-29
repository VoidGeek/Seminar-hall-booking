"use client";

import { useState } from "react";

const MaintenancePage = () => {
  const [requestDetails, setRequestDetails] = useState("");

  const submitRequest = async () => {
    const response = await fetch("/api/maintenance/request", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ requestDetails }),
    });

    if (response.ok) {
      alert("Maintenance request submitted");
      setRequestDetails("");
    } else {
      const error = await response.json();
      alert(error.error || "Something went wrong");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="w-full max-w-md p-6 bg-var-card-bg text-var-foreground rounded-lg shadow-lg">
        <h1 className="text-3xl font-semibold text-center mb-6">Maintenance Request</h1>

        <textarea
          value={requestDetails}
          onChange={(e) => setRequestDetails(e.target.value)}
          className="w-full p-4 bg-var-input-bg text-var-foreground border border-var-border rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-var-primary"
          rows={5}
          placeholder="Enter maintenance request details"
        />

        <button
          onClick={submitRequest}
          className="mt-4 w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 rounded-lg transition"
        >
          Submit Request
        </button>
      </div>
    </div>
  );
};

export default MaintenancePage;
