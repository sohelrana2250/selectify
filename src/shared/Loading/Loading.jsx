
import React from "react";

const Loading = () => {
  return (
    <div className="flex flex-col justify-center items-center h-screen bg-gradient-to-r from-green-100 via-blue-50 to-purple-100">
     
      <div className="relative">
        <div className="animate-spin rounded-full h-28 w-28 border-t-4 border-l-4 border-indigo-500"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="h-16 w-16 bg-white rounded-full border-2 border-indigo-500"></span>
        </div>
      </div>

      <div className="mt-6 text-center">
        <h1 className="text-3xl font-extrabold text-indigo-600">
          Loading <span className="text-green-500">Selectify</span>
        </h1>
        <p className="mt-2 text-gray-600 text-lg animate-pulse">
          Bringing the best to you...
        </p>
      </div>
    </div>
  );
};

export default Loading;
