import React from 'react';
import { Package, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const SubscriptionNotFound = () => {

    const  navigate=useNavigate();
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex items-center justify-center p-4">
      <div className="max-w-2xl w-full text-center space-y-8 bg-white rounded-2xl p-8 shadow-lg border border-blue-100">
        {/* Icon */}
        <div className="flex justify-center">
          <div className="relative">
            <div className="absolute inset-0 animate-ping bg-blue-100 rounded-full"></div>
            <div className="relative bg-blue-500 p-4 rounded-full">
              <Package className="w-12 h-12 text-white" />
            </div>
          </div>
        </div>

        {/* Text Content */}
        <div className="space-y-4">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
            No Subscriptions Found
          </h1>
          <p className="text-lg text-gray-600 max-w-md mx-auto">
            Looks like you haven't subscribed to any plans yet. Unlock premium features and enhance your experience!
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 gap-4 max-w-lg mx-auto">
          <div className="p-4 bg-blue-50 rounded-lg">
            <button onClick={()=>navigate("/")} className="font-semibold text-blue-900 underline hover:text-blue-600">Premium Access</button>
            <p className="text-blue-700">Unlock all premium features</p>
          </div>
          <div className="p-4 bg-blue-50 rounded-lg">
            <button  onClick={()=>navigate("/")} className="font-semibold text-blue-900 underline hover:text-blue-600">24/7 Support</button >
            <p className="text-blue-700">Get help whenever you need</p>
          </div>
          <div className="p-4 bg-blue-50 rounded-lg">
            <button  onClick={()=>navigate("/")} className="font-semibold text-blue-900 underline hover:text-blue-600">Regular Updates</button >
            <p className="text-blue-700">Stay up to date with new features</p>
          </div>
          <div className="p-4 bg-blue-50 rounded-lg">
            <button  onClick={()=>navigate("/")} className="font-semibold text-blue-900 underline hover:text-blue-600">Priority Service</button >
            <p className="text-blue-700">Skip the queue, get faster service</p>
          </div>
        </div>

        {/* CTA Button */}
        <div className="pt-4">
          <button onClick={()=>navigate("/")}  className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-blue-800 text-white px-8 py-3 rounded-full text-lg font-semibold hover:from-blue-700 hover:to-blue-900 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl">
            Explore Subscriptions
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>

        {/* Bottom Text */}
        <p className="text-sm text-gray-500">
          Choose from our flexible plans and start enjoying premium benefits today!
        </p>
      </div>
    </div>
  );
};

export default SubscriptionNotFound;