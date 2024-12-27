import React from "react";
import { useNavigate } from "react-router-dom";
import { XCircle, RefreshCcw } from "lucide-react";

const PaymentFailed = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8 animate-fadeIn">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="text-center mb-8">
          <div className="mb-6">
            <div className="relative mx-auto h-24 w-24">
              <div className="absolute inset-0 rounded-full bg-red-200 animate-pulse opacity-25"></div>
              <div className="relative rounded-full bg-red-500 p-5">
                <XCircle className="h-14 w-14 text-white animate-shake" />
              </div>
            </div>
          </div>
          <h2 className="text-4xl font-extrabold text-gray-900 mb-2 animate-slideUp">
            Payment Failed
          </h2>
          <p className="text-lg text-gray-600 animate-slideUp delay-100">
            We were unable to process your payment
          </p>
        </div>

        <div className="bg-white shadow-2xl rounded-2xl overflow-hidden transform hover:shadow-3xl transition-all duration-300">
          <div className="px-8 py-6">
            <div className="space-y-4">
              <div className="border-b border-gray-200 pb-4">
                <div className="flex items-center space-x-2">
                  <div className="h-3 w-3 rounded-full bg-red-500 animate-pulse"></div>
                  <p className="text-sm font-medium text-gray-500">
                    Transaction Failed
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
                  <span className="text-sm font-mono text-gray-700">{Math.floor(100000000 + Math.random() * 900000000)}</span>
                </div>
                
                <div className="bg-red-50 rounded-lg p-4 border border-red-100">
                  <p className="text-sm text-red-700">
                    A notification email has been sent to your registered email address.
                    Please try again or contact support if the issue persists.
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-8 space-y-4">
              <button
                onClick={() => window.location.reload()}
                className="w-full group relative flex items-center justify-center px-6 py-3 text-lg font-medium rounded-xl text-white bg-red-500 hover:bg-red-600 transform transition-all duration-200 hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
              >
                <RefreshCcw className="w-5 h-5 mr-2 group-hover:rotate-180 transition-transform duration-300" />
                Try Again
                <div className="absolute inset-0 rounded-xl bg-white opacity-0 group-hover:opacity-10 transition-opacity"></div>
              </button>

              <button
                onClick={() => navigate("/all_services/post_jobs_recuritments")}
                className="w-full group relative flex items-center justify-center px-6 py-3 text-lg font-medium rounded-xl text-red-600 bg-red-50 hover:bg-red-100 transform transition-all duration-200 hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
              >
                Return to Again
                <div className="absolute inset-0 rounded-xl bg-red-500 opacity-0 group-hover:opacity-5 transition-opacity"></div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentFailed;