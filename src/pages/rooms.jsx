import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api/axios";

// Import Room Images
import room1 from "../assets/Rooms/Room (1).jpeg";
import room2 from "../assets/Rooms/Room (2).jpeg";
import room3 from "../assets/Rooms/Room (3).jpeg";
import room4 from "../assets/Rooms/Room (4).jpeg";
import room5 from "../assets/Rooms/Room (5).jpeg";
import room6 from "../assets/Rooms/Room (6).jpeg";

const roomImages = [room1, room2, room3, room4, room5, room6];

function Rooms() {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchRooms();
  }, []);

  const fetchRooms = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await api.get("/rooms");
      setRooms(res.data.data);
    } catch (error) {
      console.error("Error fetching rooms:", error);
      setError("Failed to load rooms. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Skeleton loader
  const SkeletonCard = () => (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden animate-pulse">
      <div className="h-56 w-full bg-gray-300"></div>
      <div className="p-6">
        <div className="h-6 bg-gray-300 rounded mb-2"></div>
        <div className="h-4 bg-gray-300 rounded mb-4"></div>
        <div className="h-5 bg-gray-300 rounded mb-4"></div>
        <div className="h-10 bg-gray-300 rounded"></div>
      </div>
    </div>
  );

  if (loading) {
    return (
      <section className="container mx-auto px-6 pt-32 pb-16 bg-[#dad4f6] min-h-screen">
        <div className="max-w-7xl mx-auto space-y-12">
          <div className="text-center space-y-4">
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-slate-900">Our Rooms</h2>
            <p className="text-slate-600 max-w-2xl mx-auto text-lg font-light">
              Discover comfort and elegance in our carefully curated living spaces.
            </p>
            <div className="h-1 w-24 bg-accent mx-auto rounded-full" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {Array.from({ length: 6 }).map((_, index) => (
              <SkeletonCard key={index} />
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="container mx-auto px-6 pt-32 pb-16 text-center bg-[#dad4f6] min-h-screen">
        <div className="max-w-7xl mx-auto space-y-12">
          <div className="text-center space-y-4">
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-slate-900">Our Rooms</h2>
            <div className="h-1 w-24 bg-accent mx-auto rounded-full" />
          </div>
          <p className="text-red-600 text-xl mb-4">{error}</p>
          <button
            onClick={fetchRooms}
            className="bg-[#D4AF37] text-[#0D1B2A] px-6 py-3 rounded-lg font-bold hover:bg-[#c09e32]"
          >
            Retry
          </button>
        </div>
      </section>
    );
  }

  return (
    <section className="container mx-auto px-6 pt-32 pb-16 bg-[#dad4f6] min-h-screen">
      <div className="max-w-7xl mx-auto space-y-12 mb-12">
        <div className="text-center space-y-4">
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-slate-900">Our Luxurious Rooms</h2>
          <p className="text-slate-600 max-w-2xl mx-auto text-lg font-light">
            Experience the perfect blend of luxury and comfort at Gangs Sengy Guest House.
          </p>
          <div className="h-1 w-24 bg-accent mx-auto rounded-full" />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {rooms.map((room, index) => {
          // Assign image based on index (cyclic)
          const assignedImage = roomImages[index % roomImages.length];

          return (
            <div
              key={room._id}
              className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
            >
              {/* Image */}
              <div className="relative h-56 w-full bg-gray-200 overflow-hidden group">
                <img
                  src={assignedImage}
                  alt={`Room ${room.roomNumber}`}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />

                {/* Availability Badge */}
                <div
                  className={`absolute top-4 right-4 px-3 py-1 rounded-full text-sm font-semibold shadow-md ${room.isAvailable
                    ? "bg-green-500 text-white"
                    : "bg-red-500 text-white"
                    }`}
                >
                  {room.isAvailable ? "Available" : "Occupied"}
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-2xl font-bold capitalize text-gray-800">
                    {room.type} Room
                  </h3>
                  <span className="bg-gray-100 text-gray-600 text-xs font-bold px-2 py-1 rounded uppercase tracking-wider">
                    Room {room.roomNumber}
                  </span>
                </div>

                <p className="text-gray-600 mb-4 line-clamp-2 text-sm">
                  {room.description || "Experience comfort and luxury with our premium room services."}
                </p>

                <div className="flex items-center justify-between mb-4">
                  <p className="text-gray-600 text-sm">
                    Status:{" "}
                    <span
                      className={`font-semibold ${room.isAvailable ? "text-green-600" : "text-red-600"
                        }`}
                    >
                      {room.isAvailable ? "Available" : "Booked"}
                    </span>
                  </p>
                  <p className="text-xl font-extrabold text-[#D4AF37]">
                    PKR {room.pricePerNight.toLocaleString()}
                    <span className="text-xs text-gray-400 font-normal ml-1">/night</span>
                  </p>
                </div>

                {/* Book Now Link */}
                {room.isAvailable ? (
                  <Link
                    to={`/booking/${room._id}`}
                    className="block text-center bg-[#D4AF37] text-[#0D1B2A] py-3 rounded-lg font-bold hover:bg-[#c09e32] transition-all duration-300 shadow-md hover:shadow-lg active:scale-95"
                  >
                    Book Now
                  </Link>
                ) : (
                  <button
                    disabled
                    className="w-full py-3 rounded-lg font-bold bg-gray-300 text-gray-500 cursor-not-allowed"
                  >
                    Unavailable
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

export default Rooms;
