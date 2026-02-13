import Button from "../components/ui/Button";
import { Link } from "react-router-dom";
import heroImage from "../assets/skardu2.jpg";

function Home() {
  return (
    <section className="relative min-h-screen flex items-center justify-center text-white overflow-hidden">
      {/* Background Image with overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center z-0 animate-fade-in"
        style={{
          backgroundImage: `url(${heroImage})`,
        }}
      >
        <div className="absolute inset-0 bg-black/40" />
      </div>

      {/* Hero Content */}
      <div className="relative z-10 text-center max-w-6xl px-4 space-y-6 animate-slide-up mt-16">
        <h1 className="font-serif text-4xl md:text-6xl lg:text-7xl font-bold leading-tight drop-shadow-lg !text-white">
          Welcome to Gangs Sengy Guest House
        </h1>
        <h2 className="font-serif text-3xl md:text-5xl font-bold drop-shadow-md !text-white">
          Skardu
        </h2>

        <p className="text-lg md:text-2xl text-gray-100 max-w-3xl mx-auto font-light leading-relaxed mt-4 drop-shadow-md">
          Discover calm getaways embraced by Skardu’s majestic peaks
        </p>
      </div>

      {/* Decorative Bottom Bar */}
      <div className="absolute bottom-0 left-0 right-0 h-4 bg-gradient-to-r from-primary via-slate-800 to-primary z-10" />
    </section>
  );
}

export default Home;
