import React from 'react';

const PartnerCard = ({ logo, name, description }) => (
  <div className="bg-white p-6 rounded-lg shadow-md">
    <img src={logo} alt={name} className="h-12 mb-4" />
    <h3 className="text-xl font-semibold mb-2">{name}</h3>
    <p className="text-gray-600">{description}</p>
  </div>
);

const Partners = () => {
  const partners = [
    {
      logo: "https://res.cloudinary.com/dsdiqfrnj/image/upload/v1738583279/airtel_tyvelh.jpg",
      name: "Airtel",
      description: "Leading provider of enterprise software solutions"
    },
    {
      logo: "https://res.cloudinary.com/dsdiqfrnj/image/upload/v1738583240/Vodafone_Logo_dgjx32.png",
      name: "Vodafone",
      description: "Specialized in big data and analytics solutions"
    },
    {
      logo: "https://res.cloudinary.com/dsdiqfrnj/image/upload/v1738583268/bsnl_diqylv.png",
      name: "BSNL",
      description: "Cloud infrastructure and security services"
    }
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Our Trusted Partners</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {partners.map((partner, index) => (
            <PartnerCard key={index} {...partner} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Partners;