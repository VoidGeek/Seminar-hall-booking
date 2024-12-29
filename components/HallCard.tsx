interface HallCardProps {
    hall: { name: string; status: string; _id: string };
    bookHall: (id: string) => void;
  }
  
  const HallCard = ({ hall, bookHall }: HallCardProps) => {
    return (
      <div className="p-6 bg-var-card-bg text-var-foreground rounded-lg shadow-lg my-4">
        <h2 className="text-xl font-semibold">{hall.name}</h2>
        <p
          className={`mt-2 text-sm ${
            hall.status === "Available" ? "text-green-400" : "text-red-400"
          }`}
        >
          Status: {hall.status}
        </p>
        {hall.status === "Available" && (
          <button
            className="mt-4 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition"
            onClick={() => bookHall(hall._id)}
          >
            Book Now
          </button>
        )}
      </div>
    );
  };
  
  export default HallCard;
  