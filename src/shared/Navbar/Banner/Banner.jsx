import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import Loading from "../../Loading/Loading";
import ErrorPage from "../../ErrorPage/ErrorPage";
import { Animation } from "./Animation";
import { Link } from "react-router-dom";

const Banner = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  // fetching subscription data
  const {
    data: allsubscription = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["allsubscription"],
    queryFn: async () => {
      try {
        const res = await fetch(
          `${
            import.meta.env.VITE_COMMON_ROOT_API
          }/api/v1/subscriptionmodel/find_all_home_subscriptionmodal`,
          { method: "GET" }
        );

        if (!res.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await res.json();
        return data;
      } catch (error) {
        throw error;
      }
    },
  });

  useEffect(() => {
    if (!allsubscription?.data?.length) return;

    const interval = setInterval(() => {
      setActiveIndex(
        (prevIndex) => (prevIndex + 5) % allsubscription.data.length
      );
    }, 5000);

    return () => clearInterval(interval);
  }, [allsubscription?.data?.length]);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return <ErrorPage message={error?.message} />;
  }

  const currentProducts = allsubscription?.data?.slice(
    activeIndex,
    activeIndex + 5
  );

  return (
    <div className="mt-16">
      {/* Hero Section */}
      <section className="relative">
        <div
          className="h-[600px] bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://media.licdn.com/dms/image/C4E12AQGe0IMnU0RIWg/article-cover_image-shrink_720_1280/0/1629901226168?e=2147483647&v=beta&t=-ZO_9PDBtbeCJKOOpskY7d1DeFsysFxkPuMVrqPmhug')",
          }}
        >
          <div className="absolute inset-0 bg-black bg-opacity-60 flex flex-col justify-center items-center text-center">
            <h1 className="text-white text-6xl font-extrabold mb-6">
              Welcome to Selectify
            </h1>
            <p className="text-white text-lg max-w-3xl mx-auto mb-8 leading-relaxed">
              Discover amazing destinations and Selectify experiences with our
              expert planning and services.
            </p>
            <button className="btn bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold text-lg">
              Explore Now
            </button>
          </div>
        </div>
      </section>

      {/* Subscription Models Section */}
      <div className="relative py-16 overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-transparent via-blue-500 to-transparent transform scale-x-0 animate-scale-x"></div>

        <div className="container mx-auto px-4">
          <div
            className={`transform transition-all duration-1000 ${
              isVisible
                ? "translate-y-0 opacity-100"
                : "translate-y-10 opacity-0"
            }`}
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-center">
              <span className="bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent animate-gradient">
                Our Subscription Models
              </span>
            </h1>

            <div className="mt-4 flex justify-center gap-2">
              <span className="inline-block w-2 h-2 bg-blue-600 rounded-full animate-bounce delay-100"></span>
              <span className="inline-block w-2 h-2 bg-blue-500 rounded-full animate-bounce delay-200"></span>
              <span className="inline-block w-2 h-2 bg-blue-400 rounded-full animate-bounce delay-300"></span>
            </div>

            <p className="mt-6 text-gray-600 text-center max-w-2xl mx-auto text-lg transform transition-all duration-1000 delay-300 animate-fade-in">
              Choose the perfect plan that fits your needs and unlock premium
              features
            </p>
          </div>
        </div>

        {/* Bottom decorative line */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-transparent via-blue-500 to-transparent transform scale-x-0 animate-scale-x delay-500"></div>
        {Animation}
      </div>
      <div className="flex justify-center items-center  py-10">
        <div className="carousel w-full max-w-7xl mx-auto p-8  rounded-lg shadow-md">
          <div className="grid lg:grid-cols-5 md:grid-cols-2 sm:grid-cols-1 gap-6">
            {!isLoading &&
              currentProducts?.map((product,index) => (
                <div
                  key={index}
                  className="card shadow-lg hover:shadow-xl hover:scale-105 transition-transform duration-200 rounded-lg"
                >
                  <figure className="p-4">
                    <img
                      src="https://i.imghippo.com/files/VT1434yx.webp"
                      alt=""
                      className="w-full h-48 object-cover rounded-lg"
                    />
                  </figure>
                  <div className="card-body text-center p-4">
                    <h2 className="text-xl font-semibold text-gray-800">
                      {product?.subscriptionname}
                    </h2>
                    <p className="text-lg font-bold text-blue-600 my-2">
                      <b>Price :</b> {product?.price}
                    </p>
                    <p className="text-gray-700">
                      {" "}
                      Limit: {product?.servicesdate}
                    </p>
                    <div className="card-actions justify-center mt-4">
                      <Link
                        to={`/subscription_details/${product?._id}`}
                        className="btn btn-sm bg-blue-600 hover:bg-blue-900 text-white px-4 py-2 rounded-md"
                      >
                        More Details
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>

      {/* Products Section */}
      <div className="bg-gray-100 py-12 px-6">
        <div className="max-w-6xl mx-auto text-center mb-12">
          <h1 className="text-4xl font-extrabold text-blue-600">
            Selectify Interview Controlling System
          </h1>
          <p className="mt-4 text-lg text-gray-700">
            Revolutionizing the way interviews are conducted and managed.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {/* Example Product Cards */}
          {[...Array(3)].map((_, idx) => (
            <div
              key={idx}
              className="card bg-white shadow-md hover:shadow-lg transition-shadow duration-300 rounded-lg overflow-hidden"
            >
              <div className="relative">
                <img
                  src="https://i.imghippo.com/files/fR4508LjU.webp"
                  alt=""
                  border="0"
                />
                <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300">
                  <p className="text-white text-lg font-semibold">Learn More</p>
                </div>
              </div>
              <div className="p-6">
                <h2 className="text-xl font-semibold text-gray-800">
                  Service {idx + 1}
                </h2>
                <p className="text-gray-600 mt-2">
                  Revolutionizing the way interviews are conducted and managed.
                </p>
                <Link className="btn btn-primary bg-blue-600 hover:bg-blue-700 text-white mt-4 w-full rounded-md py-2">
                  View Details
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-blue-800 via-blue-300 to-blue-400 text-blue-600 text-center">
        <div className="container mx-auto space-y-8 max-w-4xl">
          <h3 className="text-5xl font-extrabold tracking-tight">
            Ready to Ensure Your Product?
          </h3>
          <p className="text-lg leading-relaxed text-gray-800">
            Get in touch with us today and let us help you choose the best plan
            for your needs.
          </p>
          <Link
            to="/contact"
            className="btn bg-blue-600 hover:bg-blue-800 text-white px-8 py-3 rounded-full shadow-lg hover:shadow-xl transition-transform transform hover:scale-105 font-semibold"
          >
            Contact Us
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Banner;
