import { useEffect, useState } from "react";
import api from "../api/axios";

const Admin = () => {
  const [payments, setPayments] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [showAddRoom, setShowAddRoom] = useState(false);
  const [newRoom, setNewRoom] = useState({ roomNumber: "", type: "single", pricePerNight: "", description: "", image: null });
  const [editingRoom, setEditingRoom] = useState(null);
  const [rooms, setRooms] = useState([]);
  const [selectedReceipt, setSelectedReceipt] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [pRes, bRes, rRes] = await Promise.all([
          api.get("/payments"),
          api.get("/bookings"),
          api.get("/rooms")
        ]);
        setPayments(pRes.data.data || []);
        setBookings(bRes.data.data || []);
        setRooms(rRes.data.data || []);
      } catch (error) {
        console.error(error);
        alert("Failed to load admin data");
      }
    };

    fetchData();
  }, []);

  // Calculate totals
  const totalRevenue = bookings.reduce((acc, curr) => acc + (curr.totalAmount || 0), 0);
  const totalBookings = bookings.length;
  const recentPayments = payments.slice(0, 5);
  const recentBookings = bookings.slice(0, 5);

  const handleCreateRoom = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      Object.keys(newRoom).forEach(key => {
        if (newRoom[key] !== null) {
          formData.append(key, newRoom[key]);
        }
      });

      await api.post("/rooms", formData, {
        headers: { "Content-Type": "multipart/form-data" }
      });
      alert("Room created successfully!");
      setShowAddRoom(false);
      setNewRoom({ roomNumber: "", type: "single", pricePerNight: "", description: "", image: null });
      window.location.reload();
    } catch (error) {
      console.error(error);
      alert("Failed to create room.");
    }
  };

  const handleDeleteRoom = async (id) => {
    if (!window.confirm("Are you sure you want to delete this room?")) return;
    try {
      await api.delete(`/rooms/${id}`);
      alert("Room deleted successfully");
      window.location.reload();
    } catch (error) {
      console.error(error);
      alert("Failed to delete room");
    }
  };

  const handleUpdateRoom = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      Object.keys(editingRoom).forEach(key => {
        if (editingRoom[key] !== null) {
          formData.append(key, editingRoom[key]);
        }
      });

      await api.put(`/rooms/${editingRoom._id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" }
      });
      alert("Room updated successfully");
      setEditingRoom(null);
      window.location.reload();
    } catch (error) {
      console.error(error);
      alert("Failed to update room");
    }
  };

  const handleApprovePayment = async (paymentId) => {
    if (!window.confirm("Approve this payment and confirm the booking?")) return;
    try {
      await api.post(`/payments/approve/${paymentId}`);
      alert("Payment approved successfully!");
      window.location.reload();
    } catch (error) {
      console.error(error);
      alert("Failed to approve payment");
    }
  };

  return (
    <section className="min-h-screen pt-24 px-6 md:px-12 bg-[#dad4f6]">
      <div className="max-w-7xl mx-auto space-y-8 pb-12">
        <div className="flex flex-col md:flex-row justify-between items-end border-b border-white/10 pb-6">
          <div>
            <h2 className="font-serif text-4xl font-bold text-slate-900">Admin Dashboard</h2>
            <p className="text-slate-600 mt-1">Overview of hotel performance and activity</p>
          </div>
          <div className="flex gap-4 items-center mt-4 md:mt-0">
            <div className="text-right hidden md:block">
              <span className="text-sm text-slate-600 uppercase tracking-widest">Total Revenue</span>
              <p className="text-4xl font-bold text-accent font-serif">Rs. {totalRevenue.toLocaleString()}</p>
            </div>
            <button
              onClick={() => setShowAddRoom(true)}
              className="bg-accent hover:bg-yellow-500 text-primary px-6 py-3 rounded-lg font-bold transition shadow-lg"
            >
              + Add Room
            </button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-xl border-l-4 border-accent shadow-md">
            <h3 className="text-slate-500 text-sm uppercase tracking-wider">Total Bookings</h3>
            <p className="text-3xl font-bold text-slate-900 mt-2">{totalBookings}</p>
          </div>
          <div className="bg-white p-6 rounded-xl border-l-4 border-green-500 shadow-md">
            <h3 className="text-slate-500 text-sm uppercase tracking-wider">Active Rooms</h3>
            <p className="text-3xl font-bold text-slate-900 mt-2">{rooms.length}</p>
          </div>
          <div className="bg-white p-6 rounded-xl border-l-4 border-blue-500 shadow-md">
            <h3 className="text-slate-500 text-sm uppercase tracking-wider">Recent Transactions</h3>
            <p className="text-3xl font-bold text-slate-900 mt-2">{payments.length}</p>
          </div>
        </div>

        {/* Payment Approvals Section */}
        {payments.filter(p => p.status === 'pending' || p.status === 'awaiting_approval').length > 0 && (
          <div className="bg-white p-8 rounded-xl border-l-4 border-yellow-500 shadow-md space-y-6">
            <h3 className="font-serif text-2xl font-bold text-slate-900 flex items-center gap-2">
              <span className="text-yellow-500">⚠️</span> Awaiting Payment Approvals
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {payments.filter(p => p.status === 'pending' || p.status === 'awaiting_approval').map((p) => (
                <div key={p._id} className="bg-slate-50 p-5 rounded-xl border border-yellow-200 space-y-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-bold text-slate-900">{p.user?.name || "Unknown User"}</p>
                      <p className="text-xs text-slate-500">{p.user?.email}</p>
                    </div>
                    <span className="bg-yellow-100 text-yellow-700 px-2 py-1 rounded text-[10px] font-bold uppercase">{p.method}</span>
                  </div>
                  <div className="flex justify-between items-center text-sm border-t border-b border-gray-100 py-2">
                    <span className="text-slate-600">Amount:</span>
                    <span className="font-bold text-slate-900">Rs. {p.amount}</span>
                  </div>
                  <div className="flex flex-col gap-2">
                    <button
                      onClick={() => setSelectedReceipt(`http://localhost:5000${p.receiptImage}`)}
                      className="w-full bg-blue-50 text-blue-600 font-bold py-2 rounded hover:bg-blue-100 transition text-sm"
                    >
                      View Receipt
                    </button>
                    <button
                      onClick={() => handleApprovePayment(p._id)}
                      className="w-full bg-green-600 text-white font-bold py-2 rounded hover:bg-green-700 transition text-sm"
                    >
                      Approve & Confirm
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Room Management Section */}
        <div className="bg-white p-8 rounded-xl space-y-6 shadow-md">
          <h3 className="font-serif text-2xl font-bold text-slate-900 flex items-center gap-2">
            <span className="text-accent">◈</span> Manage Rooms
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {rooms.map((room) => (
              <div key={room._id} className="bg-slate-50 p-4 rounded-lg border border-slate-200 hover:border-accent/50 transition relative group">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="text-xl font-bold text-slate-900">Room {room.roomNumber}</h4>
                    <span className="text-xs uppercase tracking-wider text-slate-500">{room.type}</span>
                  </div>
                  <span className="text-accent font-bold">Rs. {room.pricePerNight}</span>
                </div>
                <p className="text-sm text-slate-600 mt-2 line-clamp-2">{room.description}</p>
                <div className="flex gap-2 mt-4 pt-4 border-t border-slate-200">
                  <button
                    onClick={() => setEditingRoom(room)}
                    className="flex-1 bg-slate-200 hover:bg-slate-300 text-slate-700 text-sm py-2 rounded transition"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteRoom(room._id)}
                    className="flex-1 bg-red-100 hover:bg-red-200 text-red-600 text-sm py-2 rounded transition"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Payments */}
          <div className="bg-white p-6 rounded-xl space-y-6 shadow-md">
            <h3 className="font-serif text-xl font-bold text-slate-900 flex items-center gap-2">
              <span className="text-green-400">●</span> Recent Payments
            </h3>
            {payments.length === 0 ? (
              <p className="text-gray-400 text-center py-8">No payments recorded</p>
            ) : (
              <div className="space-y-3">
                {recentPayments.map((p) => (
                  <div key={p._id} className="flex justify-between items-center bg-slate-50 p-3 rounded-lg hover:bg-slate-100 transition">
                    <div>
                      <p className="text-slate-900 font-medium">Rs. {p.amount}</p>
                      <p className="text-xs text-slate-500">{new Date(p.createdAt).toLocaleDateString()}</p>
                    </div>
                    <span className={`px-2 py-1 rounded text-xs font-bold uppercase ${p.status === 'completed' ? 'bg-green-500/20 text-green-400' : 'bg-yellow-500/20 text-yellow-400'
                      }`}>
                      {p.status}
                    </span>
                  </div>
                ))}
              </div>
            )}
            <button className="w-full py-2 text-sm text-center text-gray-400 hover:text-white transition">View All Payments →</button>
          </div>

          {/* Recent Bookings */}
          <div className="bg-white p-6 rounded-xl space-y-6 shadow-md">
            <h3 className="font-serif text-xl font-bold text-slate-900 flex items-center gap-2">
              <span className="text-accent">●</span> Recent Bookings
            </h3>
            {bookings.length === 0 ? (
              <p className="text-gray-400 text-center py-8">No bookings found</p>
            ) : (
              <div className="space-y-3">
                {recentBookings.map((b) => (
                  <div key={b._id} className="flex justify-between items-center bg-slate-50 p-3 rounded-lg hover:bg-slate-100 transition">
                    <div>
                      <p className="text-slate-900 font-medium truncate max-w-[150px]">{b.user?.name || "Guest"}</p>
                      <p className="text-xs text-slate-500">{b.room?.name || "Room"}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-accent font-bold">Rs. {b.totalAmount}</p>
                      <span className="text-xs text-gray-500 capitalize">{b.status}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
            <button className="w-full py-2 text-sm text-center text-gray-400 hover:text-white transition">View All Bookings →</button>
          </div>
        </div>
      </div>

      {/* Modals */}
      {showAddRoom && (
        <div className="fixed inset-0 z-50 flex items-start justify-center bg-black/60 backdrop-blur-sm p-4 pt-32">
          <div className="bg-[#dad4f6] p-8 rounded-2xl w-full max-w-lg shadow-2xl border border-white/20 relative animate-fade-in">
            <button onClick={() => setShowAddRoom(false)} className="absolute top-4 right-4 text-slate-400 hover:text-slate-900">✕</button>
            <h3 className="font-serif text-2xl font-bold text-slate-900 mb-6">Add New Room</h3>
            <form onSubmit={handleCreateRoom} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-slate-600 mb-1">Room Number</label>
                  <input type="number" className="w-full bg-white border border-slate-200 rounded p-3 text-slate-900 focus:border-accent focus:outline-none" value={newRoom.roomNumber} onChange={(e) => setNewRoom({ ...newRoom, roomNumber: e.target.value })} required />
                </div>
                <div>
                  <label className="block text-sm text-slate-600 mb-1">Price / Night</label>
                  <input type="number" className="w-full bg-white border border-slate-200 rounded p-3 text-slate-900 focus:border-accent focus:outline-none" value={newRoom.pricePerNight} onChange={(e) => setNewRoom({ ...newRoom, pricePerNight: e.target.value })} required />
                </div>
              </div>
              <div>
                <label className="block text-sm text-slate-600 mb-1">Room Photo</label>
                <input type="file" accept="image/*" className="w-full bg-white border border-slate-200 rounded p-3 text-slate-900 focus:border-accent focus:outline-none" onChange={(e) => setNewRoom({ ...newRoom, image: e.target.files[0] })} />
              </div>
              <button className="w-full bg-accent text-primary font-bold py-3 rounded-lg hover:bg-yellow-500 transition shadow-lg mt-4">Create Room</button>
            </form>
          </div>
        </div>
      )}

      {editingRoom && (
        <div className="fixed inset-0 z-50 flex items-start justify-center bg-black/60 backdrop-blur-sm p-4 pt-32">
          <div className="bg-[#dad4f6] p-8 rounded-2xl w-full max-w-lg shadow-2xl border border-white/20 relative animate-fade-in">
            <button onClick={() => setEditingRoom(null)} className="absolute top-4 right-4 text-slate-400 hover:text-slate-900">✕</button>
            <h3 className="font-serif text-2xl font-bold text-slate-900 mb-6">Edit Room {editingRoom.roomNumber}</h3>
            <form onSubmit={handleUpdateRoom} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-slate-600 mb-1">Room Number</label>
                  <input type="number" className="w-full bg-white border border-slate-200 rounded p-3 text-slate-900 focus:border-accent focus:outline-none" value={editingRoom.roomNumber} onChange={(e) => setEditingRoom({ ...editingRoom, roomNumber: e.target.value })} required />
                </div>
                <div>
                  <label className="block text-sm text-slate-600 mb-1">Price / Night</label>
                  <input type="number" className="w-full bg-white border border-slate-200 rounded p-3 text-slate-900 focus:border-accent focus:outline-none" value={editingRoom.pricePerNight} onChange={(e) => setEditingRoom({ ...editingRoom, pricePerNight: e.target.value })} required />
                </div>
              </div>
              <div>
                <label className="block text-sm text-slate-600 mb-1">Room Photo</label>
                <input type="file" accept="image/*" className="w-full bg-white border border-slate-200 rounded p-3 text-slate-900 focus:border-accent focus:outline-none" onChange={(e) => setEditingRoom({ ...editingRoom, image: e.target.files[0] })} />
              </div>
              <button className="w-full bg-accent text-primary font-bold py-3 rounded-lg hover:bg-yellow-500 transition shadow-lg mt-4">Update Room</button>
            </form>
          </div>
        </div>
      )}

      {selectedReceipt && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/80 backdrop-blur-md p-4">
          <div className="max-w-4xl w-full relative">
            <button onClick={() => setSelectedReceipt(null)} className="absolute -top-12 right-0 text-white hover:text-accent text-xl font-bold">✕ Close</button>
            <img src={selectedReceipt} alt="Payment Receipt" className="w-full h-auto max-h-[85vh] object-contain rounded-xl shadow-2xl" />
          </div>
        </div>
      )}
    </section>
  );
};

export default Admin;