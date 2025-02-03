import React, { useState } from 'react';

const PlanCard = ({ name, price, features, popular, isSelected, onSelect }) => (
  <div 
    className={`bg-white rounded-lg shadow-lg p-8 transform transition-all duration-300 hover:scale-105 cursor-pointer
      ${popular ? 'border-2 border-h2net-blue relative' : ''}
      ${isSelected ? 'ring-2 ring-h2net-blue shadow-xl scale-105' : ''}`}
    onClick={onSelect}
  >
    {popular && (
      <span className="absolute top-0 right-0 bg-h2net-blue text-white px-4 py-1 rounded-bl-lg rounded-tr-lg text-sm">
        Popular
      </span>
    )}
    <h3 className="text-2xl font-bold mb-4">{name}</h3>
    <div className="mb-6">
      <span className="text-4xl font-bold">${price}</span>
      <span className="text-gray-600">/month</span>
    </div>
    <ul className="space-y-3 mb-8">
      {features.map((feature, index) => (
        <li key={index} className="flex items-center">
          <svg className="w-5 h-5 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
          </svg>
          {feature}
        </li>
      ))}
    </ul>
    <button 
      className={`w-full py-3 rounded-lg font-semibold transition-all duration-300
        ${isSelected 
          ? 'bg-green-500 text-white hover:bg-green-600' 
          : popular 
            ? 'bg-h2net-blue text-white hover:bg-blue-700' 
            : 'bg-gray-100 text-gray-800 hover:bg-gray-200'}`}
    >
      {isSelected ? 'Selected Plan' : 'Choose Plan'}
    </button>
  </div>
);

const Subscriptions = () => {
  const [selectedPlan, setSelectedPlan] = useState(null);

  const plans = [
    {
      id: 'starter',
      name: "Starter",
      price: 49,
      features: [
        "Up to 5 users",
        "Basic analytics",
        "24/7 support",
        "1 GB storage"
      ]
    },
    {
      id: 'professional',
      name: "Professional",
      price: 99,
      features: [
        "Up to 20 users",
        "Advanced analytics",
        "Priority support",
        "10 GB storage",
        "Custom integrations"
      ],
      popular: true
    },
    {
      id: 'enterprise',
      name: "Enterprise",
      price: 199,
      features: [
        "Unlimited users",
        "Full analytics suite",
        "Dedicated support",
        "Unlimited storage",
        "Custom solutions"
      ]
    }
  ];

  return (
    <section className="py-16 bg-white" id="pricing">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-4 animate-fade-in">Subscription Plans</h2>
        <p className="text-gray-600 text-center mb-12 animate-fade-in">Choose the perfect plan for your business needs</p>
        
        <div className="flex justify-center mb-8 space-x-4">
          {plans.map((plan) => (
            <button
              key={plan.id}
              onClick={() => document.getElementById(plan.id).scrollIntoView({ behavior: 'smooth' })}
              className={`px-4 py-2 rounded-lg transition-all duration-300
                ${selectedPlan === plan.id 
                  ? 'bg-h2net-blue text-white' 
                  : 'bg-gray-100 hover:bg-gray-200'}`}
            >
              {plan.name}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan) => (
            <div key={plan.id} id={plan.id}>
              <PlanCard 
                {...plan} 
                isSelected={selectedPlan === plan.id}
                onSelect={() => setSelectedPlan(plan.id)}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Subscriptions;