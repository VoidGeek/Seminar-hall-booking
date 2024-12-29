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
    <div className="p-6">
      <h1 className="text-3xl font-bold">Maintenance Request</h1>
      <textarea
        value={requestDetails}
        onChange={(e) => setRequestDetails(e.target.value)}
        className="mt-4 p-2 border rounded w-full"
        rows={5}
        placeholder="Enter maintenance request details"
      />
      <button
        onClick={submitRequest}
        className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
      >
        Submit Request
      </button>
    </div>
  );
};

export default MaintenancePage;
