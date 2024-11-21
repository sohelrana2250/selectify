//Banner

import React, { useEffect, useState } from "react";

const Banner = () => {
  // Array of product objects
  const products = [
    {
      id: 1,
      name: "Subscription Models One",
      price: "$499",
      image: "https://via.placeholder.com/300x200?text=Model +One ",
    },
    {
      id: 2,
      name: "Subscription Models two",
      price: "$899",
      image: "https://via.placeholder.com/300x200?text=Model + Two",
    },
    {
      id: 3,
      name: "Subscription Models Three",
      price: "$199",
      image: "https://via.placeholder.com/300x200?text=Model + Three",
    },
    {
      id: 4,
      name: "Subscription Models Four",
      price: "$899",
      image: "https://via.placeholder.com/300x200?text=Model + Four",
    },
    {
      id: 5,
      name: "Subscription Models Five",
      price: "$199",
      image: "https://via.placeholder.com/300x200?text=Model + Five",
    },
    {
      id: 6,
      name: "Subscription Models Six",
      price: "$149",
      image: "https://via.placeholder.com/300x200?text=Model + Six",
    },
  ];
  // State to keep track of the active product set index
  const [activeIndex, setActiveIndex] = useState(0);

  // Change the active product set every 15 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prevIndex) => (prevIndex + 5) % products.length);
    }, 5000); // 15000 milliseconds = 15 seconds

    return () => clearInterval(interval); // Clean up interval on component unmount
  }, [products.length]);

  // Get the current set of products to display
  const currentProducts = products.slice(activeIndex, activeIndex + 5);

  return (
    <>
      <div className="mt-16">

      
      <section className="relative ">
        <div className="h-[600px] bg-cover bg-center" style={{ backgroundImage: "url('https://150506300.v2.pressablecdn.com/wp-content/uploads/2024/01/QsJobInterview_281053075-767x511-1.jpeg')" }}>
          <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-center items-center text-center">
            <h1 className="text-white text-5xl font-bold mb-4">Welcome to   Selectify</h1>
            <p className="text-white text-lg max-w-2xl mx-auto mb-6">
              Discover amazing destinations and  Selectify experiences with our expert planning and services.
            </p>
            <button className="btn btn-primary bg-blue-600 text-white">Explore Now</button>
          </div>
        </div>
      </section>
      
        {/* <section id="home" className="hero bg-blue-100 flex items-center py-16">
          <div className="container mx-auto flex flex-col lg:flex-row items-center px-6 lg:px-16 space-y-8 lg:space-y-0 lg:space-x-12">
            <div className="text-center lg:text-left lg:w-1/2 space-y-6">
              <h2 className="text-4xl lg:text-5xl font-bold text-blue-700 leading-tight">
                Welcome to Selectify
              </h2>
              <p className="text-lg text-gray-700 mt-4 leading-relaxed">
                Revolutionizing the way interviews are conducted and managed.
                With Selectify, experience a seamless, efficient, and organized
                approach to interview scheduling, tracking, and evaluation. Let
                us help you make smarter hiring decisions!
              </p>

              <button className="btn btn-primary bg-blue-600 text-white px-6 py-3 rounded-lg shadow-lg hover:bg-blue-700 transition">
                Learn More
              </button>
            </div>

            <div className="lg:w-1/2">
              <div className="relative">
                <img
                  src="https://www.nlbservices.com/wp-content/uploads/2022/10/Conduct-an-interview_1900x450-1200x900.jpg"
                  alt="Electronics Shop"
                  className="w-full h-auto rounded-lg shadow-lg object-cover"
                />

                <div className="absolute inset-0 bg-blue-600 opacity-10 rounded-lg"></div>
              </div>
            </div>
          </div>
        </section> */}

          <h1 className="text-4xl lg:text-5xl font-bold text-blue-700 leading-tight text-center m-10">Our Subscription Models</h1>

        <div className="flex justify-center items-center  bg-gray-100">
          <div className="carousel w-full max-w-full mx-auto p-6 bg-white shadow-lg">
            <div className="grid lg:grid-cols-5 md:grid-cols-2 sm:grid-cols-1 gap-2">
              {currentProducts?.map((product) => (
                <div
                  key={product?.id}
                  className="card bg-base-100 shadow-md hover:shadow-xl transition duration-300 w-full"
                >
                  <figure>
                    <img
                      src={product?.image}
                      alt={product?.name}
                      className="w-full h-80 object-cover rounded-t-lg"
                    />
                  </figure>
                  <div className="card-body text-center">
                    <h2 className="text-center text-xl">
                      {product?.name}
                    </h2>
                    <p className="text-lg font-bold text-blue-600">
                      {" "}
                      <b>Price :</b> {product?.price}
                    </p>
                    <div className="card-actions justify-center">
                      <button className="btn btn-primary btn-sm">
                        Buy Now
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
          {/* Header Section */}
          <header className="text-center py-10">
            <h1 className="text-4xl font-bold text-blue-600">
            Selectify Interview Controlling System 
            </h1>
            <p className="mt-2 text-lg text-gray-700">
            Revolutionizing the way interviews are conducted and managed.
            </p>
          </header>

          {/* Products Section */}
          <section className="w-full max-w-5xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Product Card Example */}
            <div className="card bg-white shadow-lg hover:shadow-xl transition duration-300 ease-in-out  rounded-lg">
              <img
                src="https://via.placeholder.com/150"
                alt="Product 1"
                className="w-full h-72 object-cover rounded-md"
              />
              <h2 className="text-xl font-semibold mt-4">Services 1</h2>
              <p className="text-gray-600 mt-2">
              Revolutionizing the way interviews are conducted and managed.
              </p>
              <button className="btn btn-primary mt-4 w-full btn-sm">
                View Details
              </button>
            </div>

            <div className="card bg-white shadow-lg hover:shadow-xl transition duration-300 ease-in-out  rounded-lg">
              <figure>
                <img
                  src="https://via.placeholder.com/150"
                  alt="Product 2"
                  className="w-full h-72 object-cover rounded-md"
                />
              </figure>
              <h2 className="text-xl font-semibold mt-4">Services 2</h2>
              <p className="text-gray-600 mt-2">
              Revolutionizing the way interviews are conducted and managed.
              </p>
              <button className="btn btn-primary mt-4 w-full btn-sm">
                View Details
              </button>
            </div>

            <div className="card bg-white shadow-lg hover:shadow-xl transition duration-300 ease-in-out  rounded-lg">
              <img
                src="https://via.placeholder.com/150"
                alt="Product 3"
                className="w-full h-72 object-cover rounded-md"
              />
              <h2 className="text-xl font-semibold mt-4">Services 3</h2>
              <p className="text-gray-600 mt-2">
              Revolutionizing the way interviews are conducted and managed.
              </p>
              <button className="btn btn-primary mt-4 w-full btn-sm">
                View Details
              </button>
            </div>
          </section>
        </div>

        <section className="py-16 bg-blue-200 text-blue-600 text-center">
          <div className="container mx-auto space-y-6">
            <h3 className="text-4xl font-bold">
              Ready to Ensure Your Product?
            </h3>
            <p className="text-lg">
              Get in touch with us today and let us help you choose the best
              insurance plan for your needs.
            </p>
            <button className="btn btn-primary bg-blue-600 text-white">
              Contact Us
            </button>
          </div>
        </section>
      </div>
    </>
  );
};

export default Banner;
