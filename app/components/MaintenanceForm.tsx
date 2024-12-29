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
    <div className="p-6">
      <h2 className="text-2xl font-bold">Maintenance Form</h2>
      <textarea
        value={details}
        onChange={(e) => setDetails(e.target.value)}
        className="mt-4 p-2 border rounded w-full"
        rows={5}
        placeholder="Enter details of maintenance request"
      />
      <button
        className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
        onClick={handleSubmit}
      >
        Submit Request
      </button>
    </div>
  );
};

export default MaintenanceForm;
