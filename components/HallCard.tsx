interface HallCardProps {
  hall: { _id: string; name: string };
  selectedDate: string;
  checkAvailability: (hallId: string, selectedDate: string) => void;
  bookHall: (hallId: string, selectedDate: string) => void;
}

const HallCard = ({ hall, selectedDate, checkAvailability, bookHall }: HallCardProps) => {
  return (
    <div className="p-6 bg-var-card-bg text-var-foreground rounded-lg shadow-lg my-4">
      <h2 className="text-xl font-semibold">{hall.name}</h2>

      {selectedDate && (
        <div>
          <button
            onClick={() => checkAvailability(hall._id, selectedDate)}
            className="mt-4 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition"
          >
            Check Availability
          </button>
        </div>
      )}

      <button
        onClick={() => bookHall(hall._id, selectedDate)}
        className="mt-4 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg transition"
      >
        Book Now
      </button>
    </div>
  );
};

export default HallCard;
