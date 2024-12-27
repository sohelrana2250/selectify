import React from "react";
import { useNavigate} from "react-router-dom";
import { Check, ShoppingBag } from "lucide-react";


const PaymentSuccess = ({tranId}) => {
  
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8 animate-fadeIn">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="text-center mb-8">
          <div className="mb-6">
            <div className="relative mx-auto h-24 w-24 animate-bounce-slow">
              <div className="absolute inset-0 rounded-full bg-green-200 animate-ping opacity-25"></div>
              <div className="relative rounded-full bg-green-500 p-5">
                <Check className="h-14 w-14 text-white" />
              </div>
            </div>
          </div>
          <h2 className="text-4xl font-extrabold text-gray-900 mb-2 animate-slideUp">
            Payment Successful!
          </h2>
          <p className="text-lg text-gray-600 animate-slideUp delay-100">
            Thank you for your purchase
          </p>
        </div>

        <div className="bg-white shadow-2xl rounded-2xl overflow-hidden transform hover:scale-[1.02] transition-all duration-300">
          <div className="px-8 py-6">
            <div className="space-y-4">
              <div className="border-b border-gray-200 pb-4">
                <div className="flex items-center space-x-2">
                  <div className="h-3 w-3 rounded-full bg-green-500 animate-pulse"></div>
                  <p className="text-sm font-medium text-gray-500">
                    Transaction Complete
                  </p>
                </div>
                <p className="mt-2 text-xs text-gray-500">
                  {new Date().toLocaleString('en-US', { 
                    dateStyle: 'full', 
                    timeStyle: 'short' 
                  })}
                </p>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">Transaction ID</span>
                  <span className="text-sm font-mono text-gray-700">{tranId}</span>
                </div>
                
                <div className="bg-green-50 rounded-lg p-4 border border-green-100">
                  <p className="text-sm text-green-700">
                    A confirmation email has been sent to your registered email address
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-8">
              <button
                onClick={() => navigate("/all_services/post_jobs_recuritments")}
                className="w-full group relative flex items-center justify-center px-6 py-3 text-lg font-medium rounded-xl text-white bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 transform transition-all duration-200 hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
              >
                <ShoppingBag className="w-5 h-5 mr-2 group-hover:animate-bounce" />
                Continue Shopping
                <div className="absolute inset-0 rounded-xl bg-white opacity-0 group-hover:opacity-10 transition-opacity"></div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccess;