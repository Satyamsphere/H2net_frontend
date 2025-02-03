import React from 'react';

const Hero = () => {
  return (
    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 py-20">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="md:w-1/2 mb-10 md:mb-0 animate-fade-in">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 animate-slide-up">
              Transforming Business Partnerships
            </h1>
            <p className="text-xl text-gray-600 mb-8 animate-slide-up delay-200">
              Join forces with industry leaders to drive innovation and growth through our strategic partnership program.
            </p>
            <button className="bg-h2net-blue text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-all duration-300 hover:scale-105 animate-slide-up delay-400">
              Get Started
            </button>
          </div>
          <div className="md:w-1/2 animate-fade-in delay-500">
            <img 
              src="https://res.cloudinary.com/dsdiqfrnj/image/upload/v1737110479/Hesham/z59chtmxmalrgrjz1e1h.webp" 
              alt="Office collaboration" 
              className="rounded-lg shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;