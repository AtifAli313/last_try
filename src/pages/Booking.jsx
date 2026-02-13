// import { useParams, useNavigate } from "react-router-dom";
// import { useState } from "react";
// import api from "../api/axios";

// function Booking() {
//   const { roomId } = useParams();
//   const navigate = useNavigate();

//   const [form, setForm] = useState({
//     checkIn: "",
//     checkOut: "",
//     guests: 1,
//   });

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       await api.post("/bookings", {
//         roomId,
//         ...form,
//       });

//       alert("Booking successful!");
//       navigate("/rooms");
//     } catch (error) {
//       alert("Please login to book a room");
//     }
//   };

//   return (
//     <section className="container mx-auto px-6 py-16 max-w-lg">
//       <h2 className="text-3xl font-extrabold mb-8 text-center">
//         Book Your Stay
//       </h2>

//       <form
//         onSubmit={handleSubmit}
//         className="bg-white shadow-lg rounded-xl p-8 space-y-6"
//       >
//         <div>
//           <label className="block font-bold mb-2">Check-in Date</label>
//           <input
//             type="date"
//             name="checkIn"
//             required
//             onChange={handleChange}
//             className="w-full border p-3 rounded-lg"
//           />
//         </div>

//         <div>
//           <label className="block font-bold mb-2">Check-out Date</label>
//           <input
//             type="date"
//             name="checkOut"
//             required
//             onChange={handleChange}
//             className="w-full border p-3 rounded-lg"
//           />
//         </div>

//         <div>
//           <label className="block font-bold mb-2">Guests</label>
//           <input
//             type="number"
//             min="1"
//             name="guests"
//             onChange={handleChange}
//             className="w-full border p-3 rounded-lg"
//           />
//         </div>

//         <button
//           type="submit"
//           className="w-full bg-[#D4AF37] text-[#0D1B2A] py-3 rounded-lg font-bold hover:bg-[#c09e32]"
//         >
//           Confirm Booking
//         </button>
//       </form>
//     </section>
//   );
// }

// export default Booking;



import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import api from "../api/axios";
import { useAuth } from "../context/authContext";

function Booking() {
  const { roomId } = useParams();
  const navigate = useNavigate();
  const { token } = useAuth(); // Add this to check if logged in

  const [form, setForm] = useState({
    checkInDate: "", // ← Changed from checkIn
    checkOutDate: "", // ← Changed from checkOut
    guests: 1,
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if user is logged in
    if (!token) {
      alert("Please login to book a room");
      navigate("/login");
      return;
    }

    try {
      const response = await api.post("/bookings", {
        roomId,
        checkInDate: form.checkInDate, // ← Match backend field names
        checkOutDate: form.checkOutDate,
        guests: form.guests,
      });

      console.log("Booking response:", response.data); // Debug log
      const booking = response.data.data;
      alert("Booking successful! Redirecting to payment...");
      navigate(`/payments/${booking._id}`);
    } catch (error) {
      console.error("Booking error:", error.response?.data || error.message); // Debug log

      if (error.response?.status === 401) {
        alert("Please login to book a room");
        navigate("/login");
      } else {
        alert(error.response?.data?.message || "Booking failed. Please try again.");
      }
    }
  };

  return (
    <section className="min-h-screen pt-24 px-6 md:px-12 bg-[#dad4f6] fixed inset-0 overflow-y-auto flex items-center justify-center">
      <div className="w-full max-w-lg">
        <h2 className="text-3xl font-extrabold mb-8 text-center text-slate-900">
          Book Your Stay
        </h2>

        <form
          onSubmit={handleSubmit}
          className="bg-white shadow-lg rounded-xl p-8 space-y-6"
        >
          <div>
            <label className="block font-bold mb-2">Check-in Date</label>
            <input
              type="date"
              name="checkInDate" // ← Changed from checkIn
              required
              value={form.checkInDate}
              onChange={handleChange}
              className="w-full border p-3 rounded-lg"
            />
          </div>

          <div>
            <label className="block font-bold mb-2">Check-out Date</label>
            <input
              type="date"
              name="checkOutDate" // ← Changed from checkOut
              required
              value={form.checkOutDate}
              onChange={handleChange}
              className="w-full border p-3 rounded-lg"
            />
          </div>

          <div>
            <label className="block font-bold mb-2">Guests</label>
            <input
              type="number"
              min="1"
              name="guests"
              value={form.guests}
              onChange={handleChange}
              className="w-full border p-3 rounded-lg"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-[#D4AF37] text-[#0D1B2A] py-3 rounded-lg font-bold hover:bg-[#c09e32]"
          >
            Confirm Booking
          </button>
        </form>
      </div>
    </section>
  );
}

export default Booking;