"use client";

import React, { useState } from "react";

interface MaintenanceFormProps {
  submitRequest: (details: string) => void;
}

const MaintenanceForm = ({ submitRequest }: MaintenanceFormProps) => {
  const [details, setDetails] = useState("");

  const handleSubmit = () => {
    submitRequest(details);
    setDetails(""); // Clear after submission
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-var-background text-var-foreground p-6">
      <div className="w-full max-w-md p-6 bg-var-card-bg rounded-lg shadow-lg">
        <h2 className="text-3xl font-semibold text-center mb-6 text-var-foreground">Maintenance Request</h2>
        
        <textarea
          value={details}
          onChange={(e) => setDetails(e.target.value)}
          className="w-full p-4 bg-var-input-bg text-var-foreground border border-var-border rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-var-primary"
          rows={5}
          placeholder="Enter details of maintenance request"
        />
        
        <button
          onClick={handleSubmit}
          className="mt-4 w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 rounded-lg transition"
        >
          Submit Request
        </button>
      </div>
    </div>
  );
};

export default MaintenanceForm;
