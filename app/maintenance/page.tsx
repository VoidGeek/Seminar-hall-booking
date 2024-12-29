"use client";

import { useEffect, useState } from "react";

const MaintenancePage = () => {
  const [requestDetails, setRequestDetails] = useState(""); // Store maintenance request details
  const [options, setOptions] = useState({
    micSystem: false,
    projector: false,
    chairs: false,
    ac: false,
    lighting: false,
    soundSystem: false,
    additionalNotes: "",
  }); // Store seminar-related options
  const [bookingId, setBookingId] = useState<string | null>(null); // Store booking ID
  const [error, setError] = useState<string>(""); // Error message for invalid Booking ID
  const [isBookingIdInvalid, setIsBookingIdInvalid] = useState<boolean>(false); // Track invalid Booking ID status
  const [isRequestAlreadySent, setIsRequestAlreadySent] = useState<boolean>(false); // Track if request is already submitted for this booking ID

  // Effect to check if request has already been sent for the booking ID
  useEffect(() => {
    if (bookingId) {
      // Check if a maintenance request has already been sent for this booking ID
      const checkRequest = async () => {
        const response = await fetch(`/api/maintenance/validate`, {
          method: "POST", // Ensure POST is used here
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ bookingId }),
        });

        if (response.ok) {
          const data = await response.json();
          setIsRequestAlreadySent(data.message === "Maintenance request already exists");
        } else {
          setIsRequestAlreadySent(false);
        }
      };
      checkRequest();
    }
  }, [bookingId]);

  const handleOptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setOptions((prevOptions) => ({
      ...prevOptions,
      [name]: checked,
    }));
  };

  const submitRequest = async () => {
    if (!bookingId) {
      setError("Please enter a valid Booking ID.");
      setIsBookingIdInvalid(true);
      return;
    }

    // Check if the booking ID exists in the database
    const response = await fetch(`/api/bookings/validate`, {
      method: "POST", // Ensure POST is used here for validation
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ bookingId }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      setError(errorData.error || "Invalid Booking ID.");
      setIsBookingIdInvalid(true);
      return;
    }

    // If a maintenance request has already been submitted for this booking ID
    if (isRequestAlreadySent) {
      setError("Maintenance request has already been sent for this Booking ID.");
      setIsBookingIdInvalid(true);
      return;
    }

    setIsBookingIdInvalid(false); // Reset error state if the booking ID is valid

    // If the Booking ID is valid and no request has been sent already, proceed to submit the maintenance request
    const maintenanceResponse = await fetch("/api/maintenance/request", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        requestDetails,
        options,
        bookingId, // Include booking ID in the request
      }),
    });

    if (maintenanceResponse.ok) {
      alert("Maintenance request submitted successfully.");
      setRequestDetails("");
      setOptions({
        micSystem: false,
        projector: false,
        chairs: false,
        ac: false,
        lighting: false,
        soundSystem: false,
        additionalNotes: "",
      });
      setBookingId(null); // Reset the booking ID
    } else {
      // Handle errors from the maintenance request submission
      const errorData = await maintenanceResponse.json();
      setError(errorData.error || "Something went wrong while submitting the maintenance request.");
      setIsBookingIdInvalid(true);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="w-full max-w-md p-6 bg-var-card-bg text-var-foreground rounded-lg shadow-lg">
        <h1 className="text-3xl font-semibold text-center mb-6">Maintenance Request</h1>

        {/* Booking ID Validation Warning */}
        <div className="text-red-500 text-center mb-4">
          {isRequestAlreadySent ? (
            <p>Warning: A maintenance request has already been sent for this Booking ID. You can only submit one request.</p>
          ) : (
            <p>Note: Please ensure that a maintenance request is only submitted once for a specific Booking ID.</p>
          )}
        </div>

        {/* Booking ID Input */}
        <div className="mb-4">
          <input
            type="text"
            value={bookingId || ""}
            onChange={(e) => setBookingId(e.target.value)}
            className="w-full p-4 bg-var-input-bg text-var-foreground border border-var-border rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-var-primary"
            placeholder="Enter Booking ID"
          />
          {isBookingIdInvalid && <p className="text-red-500 text-center">{error}</p>} {/* Display error if Booking ID is invalid */}
        </div>

        {/* Request Details Text Area */}
        <textarea
          value={requestDetails}
          onChange={(e) => setRequestDetails(e.target.value)}
          className="w-full p-4 bg-var-input-bg text-var-foreground border border-var-border rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-var-primary"
          rows={5}
          placeholder="Enter maintenance request details"
        />

        {/* Seminar Options */}
        <div className="mt-4">
          <div className="flex items-center">
            <input
              type="checkbox"
              name="micSystem"
              checked={options.micSystem}
              onChange={handleOptionChange}
              id="micSystem"
              className="mr-2"
            />
            <label htmlFor="micSystem">Mic System</label>
          </div>
          <div className="flex items-center">
            <input
              type="checkbox"
              name="projector"
              checked={options.projector}
              onChange={handleOptionChange}
              id="projector"
              className="mr-2"
            />
            <label htmlFor="projector">Projector</label>
          </div>
          <div className="flex items-center">
            <input
              type="checkbox"
              name="chairs"
              checked={options.chairs}
              onChange={handleOptionChange}
              id="chairs"
              className="mr-2"
            />
            <label htmlFor="chairs">Chairs</label>
          </div>
          <div className="flex items-center">
            <input
              type="checkbox"
              name="ac"
              checked={options.ac}
              onChange={handleOptionChange}
              id="ac"
              className="mr-2"
            />
            <label htmlFor="ac">AC</label>
          </div>
          <div className="flex items-center">
            <input
              type="checkbox"
              name="lighting"
              checked={options.lighting}
              onChange={handleOptionChange}
              id="lighting"
              className="mr-2"
            />
            <label htmlFor="lighting">Lighting</label>
          </div>
          <div className="flex items-center">
            <input
              type="checkbox"
              name="soundSystem"
              checked={options.soundSystem}
              onChange={handleOptionChange}
              id="soundSystem"
              className="mr-2"
            />
            <label htmlFor="soundSystem">Sound System</label>
          </div>
        </div>

        {/* Additional Notes */}
        <div className="mt-4">
          <textarea
            value={options.additionalNotes}
            onChange={(e) =>
              setOptions((prev) => ({
                ...prev,
                additionalNotes: e.target.value,
              }))
            }
            className="w-full p-4 bg-var-input-bg text-var-foreground border border-var-border rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-var-primary"
            rows={3}
            placeholder="Additional notes (Optional)"
          />
        </div>

        {/* Submit Button */}
        <button
          onClick={submitRequest}
          className="mt-6 w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 rounded-lg transition"
        >
          Submit Request
        </button>
      </div>
    </div>
  );
};

export default MaintenancePage;
