import React, { useState } from "react";

const Interview = () => {
  const [agree, setAgree] = useState(false);

  return (
   <div className="mt-16">
     <div className="min-h-screen bg-gradient-to-r from-blue-600 via-white to-indigo-900 text-white">
      {/* Header Section */}
      <header className="text-center py-10 bg-opacity-70 bg-black">
        <h1 className="text-4xl font-bold">Welcome to Selectify</h1>
        <p className="mt-2 text-lg">
          Revolutionizing Hiring with Human Behavioral Analysis
        </p>
      </header>

      {/* Hero Section */}
      <section
        className="relative py-10 px-5 text-center"
        style={{
          backgroundImage:
            "url('https://source.unsplash.com/1600x900/?technology,teamwork')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="bg-black bg-opacity-60 p-10 rounded-lg shadow-lg max-w-4xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            About Our System
          </h2>
          <p className="text-lg sm:text-xl">
            Selectify provides companies with top talent by analyzing human
            behavior using cutting-edge technology. From AI-powered interviews
            to behavior tracking, we ensure the best candidates for your team.
          </p>
        </div>
      </section>

      {/* Terms and Conditions */}
      <section className="py-10 px-5 max-w-5xl mx-auto">
        <h2 className="text-3xl text-black font-serif text-center mb-2">Terms & Conditions</h2>
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg space-y-2">
          <p>
            By using Selectify, you agree to the following terms and conditions:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>
              You consent to the use of behavioral analysis tools for interview
              evaluation purposes.
            </li>
            <li>
              Selectify ensures data privacy and does not share your data
              without explicit consent.
            </li>
            <li>
              Candidates must provide accurate personal and professional
              details during the process.
            </li>
            <li>
              Any misuse or fraudulent activities will lead to account
              termination.
            </li>
          </ul>
          <div>
            <input
              type="checkbox"
              id="agree"
              checked={agree}
              onChange={(e) => setAgree(e.target.checked)}
              className="mr-2"
            />
            <label htmlFor="agree" className="text-gray-300">
              I agree to the terms and conditions
            </label>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 px-5 text-center bg-gradient-to-b from-blue-600  via-white to-indigo-900">
        <h2 className="text-3xl text-black font-serif sm:text-4xl font-bold mb-4">
          Ready to Build the Best Team?
        </h2>
        <p className="text-lg text-black sm:text-xl max-w-3xl mx-auto mb-6">
          Join Selectify today and leverage our behavioral analysis tools to
          identify top-performing candidates for your company.
        </p>
        <button
          disabled={!agree}
          className={`px-8 py-3 text-lg font-semibold rounded-md shadow-md transition-transform ${
            agree
              ? "bg-blue-500 hover:bg-blue-600 transform hover:scale-105"
              : "bg-gray-500 cursor-not-allowed"
          }`}
        >
          Get Started
        </button>
      </section>
    </div>
   </div>
  );
};

export default Interview;
