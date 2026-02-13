import React, { useState } from 'react';

// Import images
import g1 from '../assets/gallery/1.jpeg';
import g2 from '../assets/gallery/2.jpeg';
import g3 from '../assets/gallery/3.jpeg';
import g4 from '../assets/gallery/4.jpeg';
import g5 from '../assets/gallery/5.jpeg';
import g6 from '../assets/gallery/6.jpeg';
import g7 from '../assets/gallery/7.jpeg';
import g8 from '../assets/gallery/8.jpeg';

const Gallery = () => {
  const images = [g1, g2, g3, g4, g5, g6, g7, g8];
  const [selectedImage, setSelectedImage] = useState(null);

  return (
    <section className="min-h-screen pt-32 pb-12 px-6 bg-[#dad4f6] animate-fade-in">
      <div className="max-w-7xl mx-auto space-y-12">
        <div className="text-center space-y-4">
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-slate-900">Gallery</h2>
          <p className="text-slate-600 max-w-2xl mx-auto text-lg font-light">
            Experience the beauty and serenity of Gangs Sengy Guest House through our lens.
          </p>
          <div className="h-1 w-24 bg-accent mx-auto rounded-full" />
        </div>

        <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
          {images.map((img, index) => (
            <div
              key={index}
              className="break-inside-avoid relative group overflow-hidden rounded-xl shadow-lg hover:shadow-2xl transition duration-500 cursor-pointer"
              onClick={() => setSelectedImage(img)}
            >
              <img
                src={img}
                alt={`Gallery image ${index + 1}`}
                className="w-full h-auto transform group-hover:scale-110 transition duration-700 ease-in-out"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition duration-500 flex items-center justify-center">
                <span className="text-white font-serif text-lg tracking-widest border border-white/50 px-6 py-2 rounded-full backdrop-blur-sm hover:bg-white hover:text-black transition-colors">
                  VIEW
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in"
          onClick={() => setSelectedImage(null)}
        >
          <button
            className="absolute top-6 right-6 text-white/50 hover:text-white text-4xl transition"
            onClick={() => setSelectedImage(null)}
          >
            &times;
          </button>
          <img
            src={selectedImage}
            alt="Full screen view"
            className="max-w-full max-h-[90vh] object-contain rounded-lg shadow-2xl animate-scale-in"
          />
        </div>
      )}
    </section>
  );
};

export default Gallery;