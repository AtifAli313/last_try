import React from "react";
import Navbar from "./components/navbar";
import Footer from "./components/Footer";
import WhatsAppWidget from "./components/WhatsAppWidget";
import ScrollToTop from "./components/ScrollToTop";
import Home from "./pages/home";
import Rooms from "./pages/rooms";
import Booking from "./pages/Booking";
import Login from "./pages/login";
import Register from "./pages/register";
import Payment from "./pages/Payment";
import MyPayments from "./pages/MyPayments";
import Admin from "./pages/Admin";
import Gallery from "./pages/Gallery";
import About from "./pages/About";
import Contact from "./pages/Contact";
import BookingConfirmation from "./pages/BookingConfirmation";

import ProtectedRoute from "./components/protectedRoute";
import AdminRoute from "./components/AdminRoute";

import { Routes, Route, useLocation } from "react-router-dom";


function App() {
  const location = useLocation();

  return (
    <div className="min-h-screen flex flex-col bg-background text-secondary font-sans">
      <ScrollToTop />
      <Navbar />

      <div key={location.pathname} className="flex-grow animate-fade-in">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/rooms" element={<Rooms />} />
          <Route path="/booking/:roomId" element={<Booking />} />

          <Route path="/booking-success" element={
            <ProtectedRoute>
              <BookingConfirmation />
            </ProtectedRoute>
          } />

          <Route path="/payments/:bookingId" element={
            <ProtectedRoute>
              <Payment />
            </ProtectedRoute>
          } />

          <Route path="/payments/my" element={
            <ProtectedRoute>
              <MyPayments />
            </ProtectedRoute>
          } />

          <Route path="/admin" element={
            <AdminRoute>
              <Admin />
            </AdminRoute>
          } />

          <Route path="/gallery" element={<Gallery />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />

          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </div>
      <Footer />
      <WhatsAppWidget />
    </div>
  );
}

export default App;

