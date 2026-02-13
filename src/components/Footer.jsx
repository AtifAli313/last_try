import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className="bg-primary text-white py-12 mt-auto">
            <div className="container-max grid grid-cols-1 md:grid-cols-4 gap-8 px-6">
                <div className="space-y-4">
                    <h3 className="text-2xl font-bold font-heading text-accent">Gangs Sengy</h3>
                    <p className="text-gray-400 text-sm">
                        Experience the serenity of Skardu with premium hospitality and breathtaking views.
                    </p>
                </div>

                <div>
                    <h4 className="text-lg font-bold mb-4 font-heading">Quick Links</h4>
                    <ul className="space-y-2 text-gray-400">
                        <li><Link to="/" className="hover:text-accent transition-colors">Home</Link></li>
                        <li><Link to="/rooms" className="hover:text-accent transition-colors">Rooms</Link></li>
                        <li><Link to="/gallery" className="hover:text-accent transition-colors">Gallery</Link></li>
                        <li><Link to="/about" className="hover:text-accent transition-colors">About Us</Link></li>
                    </ul>
                </div>

                <div>
                    <h4 className="text-lg font-bold mb-4 font-heading">Contact</h4>
                    <ul className="space-y-2 text-gray-400">
                        <li>Skardu, Gilgit Baltistan</li>
                        <li>+92 341 9020068</li>
                        <li>info@gangssengy.com</li>
                    </ul>
                </div>

                <div>
                    <h4 className="text-lg font-bold mb-4 font-heading">Newsletter</h4>
                    <p className="text-gray-400 text-sm mb-4">
                        Subscribe for special offers and updates.
                    </p>
                    <div className="flex gap-2">
                        <input
                            type="email"
                            placeholder="Your email"
                            className="bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-sm w-full focus:outline-none focus:border-accent"
                        />
                        <button className="bg-accent text-primary px-4 py-2 rounded-lg font-bold text-sm hover:opacity-90">
                            Go
                        </button>
                    </div>
                </div>
            </div>

            <div className="border-t border-white/10 mt-12 pt-8 text-center text-gray-500 text-sm">
                <p>&copy; {new Date().getFullYear()} Gangs Sengy Guest House. All rights reserved.</p>
            </div>
        </footer>
    );
};

export default Footer;
