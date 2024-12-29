interface HallCardProps {
    hall: { name: string; status: string; id: string };
    bookHall: (id: string) => void;
  }
  
  const HallCard = ({ hall, bookHall }: HallCardProps) => {
    return (
      <div className="p-4 border rounded-lg my-2">
        <h2 className="text-xl font-semibold">{hall.name}</h2>
        <p>Status: {hall.status}</p>
        {hall.status === "Available" && (
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded mt-2"
            onClick={() => bookHall(hall.id)}
          >
            Book Now
          </button>
        )}
      </div>
    );
  };
  
  export default HallCard;
  