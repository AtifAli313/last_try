const About = () => {
  return (
    <section className="min-h-screen pt-32 pb-12 px-6 bg-[#dad4f6]">
      <div className="max-w-7xl mx-auto space-y-12 mb-12">
        <div className="text-center space-y-4">
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-slate-900">About Us</h2>
          <p className="text-slate-600 max-w-2xl mx-auto text-lg font-light">
            Welcome to Gangs Sengy Guest House  a cozy and comfortable stay with friendly service where every guest is treated like family.
          </p>
          <div className="h-1 w-24 bg-accent mx-auto rounded-full" />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition">
          <h4 className="font-bold text-slate-900 text-lg mb-2">Comfort</h4>
          <p className="text-sm text-slate-600">At our guest house, comfort is not just a feature it is a promise. Each of our rooms is fully furnished and thoughtfully designed to provide a warm, relaxing, and homelike atmosphere for every guest. From the moment you step inside, you will experience a perfect balance of modern elegance and cozy comfort.

All rooms are equipped with modern amenities to ensure a stress-free stay. Enjoy comfortable bedding, climate control, high speed Wi-Fi, flat-screen televisions, and well arranged furniture that allows you to relax, work, or unwind with ease. Whether you are traveling for business or leisure, our rooms are designed to meet your daily needs effortlessly.

We pay special attention to cleanliness, space, and peaceful surroundings, allowing you to fully relax after a long day. Soft lighting, calm interiors, and quality furnishings create an environment that promotes rest and relaxation.

Our goal is to make you feel at home while offering the convenience and luxury of modern living. At our guest house, your comfort comes first, ensuring a refreshing and memorable stay every time.</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition">
          <h4 className="font-bold text-slate-900 text-lg mb-2">Service</h4>
          <p className="text-sm text-slate-600">At our guest house, exceptional service is at the heart of everything we do. Our friendly and professional team is always available to assist you and ensure that your stay is smooth, comfortable, and well-organized from start to finish.

Whether you need help with planning your stay, booking arrangements, local guidance, or special requests, our staff is ready to support you with care and attention. We believe in providing personalized service, understanding each guest’s needs, and responding promptly to make your experience truly enjoyable.

Our team is trained to maintain high standards of hospitality, ensuring clear communication, quick assistance, and a welcoming attitude at all times. From check-in to check-out, we are committed to making you feel valued and well taken care of.

With our dedicated service, you can relax knowing that everything is handled professionally, allowing you to focus on enjoying your stay</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition">
          <h4 className="font-bold text-slate-900 text-lg mb-2">Location</h4>
          <p className="text-sm text-slate-600">Our guest house enjoys a prime and highly convenient location, making it an ideal choice for both travelers and tourists. Situated near the airport and close to Skardu city center, it allows guests to move easily and save valuable travel time.

With quick access to transport facilities, restaurants, markets, and essential services, everything you need is just a short distance away. Popular dining spots and local attractions are easily reachable, allowing you to explore Skardu without long or tiring commutes.

Whether you are arriving by air, visiting nearby tourist sites, or heading into the city for shopping or dining, our location ensures comfort, accessibility, and convenience. Staying with us means you are always close to where you want to be, while still enjoying a peaceful and relaxing environment.</p>
        </div>
      </div>
    </section>
  );
};

export default About;