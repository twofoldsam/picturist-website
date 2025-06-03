
import React from "react";
import { Button } from "./ui-custom/Button";
import { Check } from "lucide-react";
import { MotionWrapper, MotionStaggerContainer, MotionStaggerItem } from "./ui-custom/MotionWrapper";

interface PricingPlan {
  name: string;
  price: string;
  description: string;
  features: string[];
  isPopular?: boolean;
}

export const Pricing = () => {
  const plans: PricingPlan[] = [
    {
      name: "Starter",
      price: "$19",
      description: "Perfect for individual content creators",
      features: [
        "50 AI illustrations per month",
        "5 style presets",
        "PNG & JPG downloads",
        "Email support"
      ]
    },
    {
      name: "Agency",
      price: "$49",
      description: "Ideal for small teams and agencies",
      features: [
        "200 AI illustrations per month",
        "Unlimited style presets",
        "All file formats",
        "Priority support",
        "Team collaboration"
      ],
      isPopular: true
    },
    {
      name: "Enterprise",
      price: "Custom",
      description: "For high-volume content producers",
      features: [
        "Unlimited AI illustrations",
        "Custom style creation",
        "API access",
        "Dedicated account manager",
        "Custom integrations",
        "Training sessions"
      ]
    }
  ];

  return (
    <section className="py-16 md:py-24 bg-slate-50" id="pricing">
      <div className="container mx-auto px-4">
        <MotionWrapper>
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-charcoal mb-4">
              Simple, Transparent Pricing
            </h2>
            <p className="text-slate-600 max-w-2xl mx-auto">
              Choose the plan that's right for your content needs
            </p>
          </div>
        </MotionWrapper>
        
        <MotionStaggerContainer className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {plans.map((plan, index) => (
            <MotionStaggerItem key={index}>
              <div 
                className={`bg-white rounded-2xl border ${
                  plan.isPopular ? "border-teal-200 shadow-lg shadow-teal-100/50" : "border-slate-100"
                } p-6 relative`}
              >
                {plan.isPopular && (
                  <div className="absolute top-0 right-6 -translate-y-1/2 bg-teal-500 text-white px-3 py-1 rounded-full text-sm">
                    Most Popular
                  </div>
                )}
                
                <h3 className="font-semibold text-xl text-charcoal mb-2">
                  {plan.name}
                </h3>
                <div className="mb-4">
                  <span className="text-3xl font-bold text-charcoal">{plan.price}</span>
                  {plan.price !== "Custom" && <span className="text-slate-500">/month</span>}
                </div>
                <p className="text-slate-600 mb-6">
                  {plan.description}
                </p>
                
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <Check size={18} className="text-teal-500 flex-shrink-0 mt-0.5" />
                      <span className="text-slate-700">{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <Button 
                  variant={plan.isPopular ? "primary" : "secondary"}
                  className="w-full"
                >
                  Select Plan
                </Button>
              </div>
            </MotionStaggerItem>
          ))}
        </MotionStaggerContainer>
      </div>
    </section>
  );
};
