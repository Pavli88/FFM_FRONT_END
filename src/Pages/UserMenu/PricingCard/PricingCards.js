import { useState } from "react";
import { FaCheck } from "react-icons/fa";
import "./PricingCards.css";

const PricingCards = () => {
  const plans = [
    {
      name: "Starter",
      price: 19,
      description: "For beginners",
      features: [
        "50 GB Premium Bandwidth",
        "Basic Trading Tools",
        "1 Free Stock Analysis Report",
        "Email Support",
      ],
    },
    {
      name: "Advanced",
      price: 49,
      description: "For experienced traders",
      features: [
        "200 GB Premium Bandwidth",
        "Advanced Trading Tools",
        "5 Free Stock Analysis Reports",
        "Priority Email Support",
      ],
    },
    {
      name: "Premium",
      price: 99,
      description: "For serious investors",
      features: [
        "Unlimited Premium Bandwidth",
        "Premium Trading Indicators",
        "Unlimited Stock Analysis Reports",
        "Live Chat Support",
      ],
    },
    {
      name: "VIP",
      price: 199,
      description: "For elite traders",
      features: [
        "Unlimited Bandwidth & Tools",
        "1-on-1 Expert Consultation",
        "Exclusive Market Insights",
        "24/7 Priority Support",
      ],
    },
  ];

  return (
      <div className="wrapper">
        <div className="grid-container">
          {plans.map((plan) => (
              <div key={plan.name} className="card-details">
                <div className="price-details">
                  <span className="price">${plan.price}</span>
                  <p>{plan.description}</p>
                </div>
                <ul className="features">
                  {plan.features.map((feature, index) => (
                      <li key={index}>
                        <FaCheck className="icon"/>
                        <span>{feature}</span>
                      </li>
                  ))}
                </ul>
                <button className="btn">Choose Plan</button>
              </div>
          ))}
        </div>
    </div>
  );
};

export default PricingCards;
