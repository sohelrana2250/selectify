import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import ErrorPage from "../../../shared/ErrorPage/ErrorPage";
import Loading from "../../../shared/Loading/Loading";
import { Check, Clock, Crown } from "lucide-react";
import AppyCompanyModal from "../ApplyCompany/AppyCompanyModal";

const Subscription = () => {
  const { subscriptionId } = useParams();
  const [subscriptionmodelId,setSubscriptionmodelId]=useState('')

  const {
    data: specifcsubscription = null,
    isLoading,
    error,
    refetch
  } = useQuery({
    queryKey: ["specifcsubscription", subscriptionId],
    queryFn: async () => {
      const res = await fetch(
        `${
          import.meta.env.VITE_COMMON_ROOT_API
        }/api/v1/subscriptionmodel/find_specific_subscription/${subscriptionId}`,
        {
          method: "GET",
          headers: {
            authorization: `${localStorage.getItem("token")}`,
          },
        }
      );

      if (!res.ok) {
        throw new Error("Network response was not ok");
      }
      return res.json();
    },
  });
  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return <ErrorPage message={error?.message} />;
  }
  if (!specifcsubscription) {
    return <ErrorPage message="No subscription data found." />;
  }

   const handelApplyCompanySubScription=(subscriptionmodelId)=>{
   document.getElementById('apply_company_modal').showModal();
   setSubscriptionmodelId(subscriptionmodelId)

   }

  return (
   <>
    <div className="mt-16">
      {/* <pre className="bg-gray-100 p-4 rounded mt-4">
        {JSON.stringify(specifcsubscription, null, 2)}
      </pre> */}

      {!isLoading && specifcsubscription?.success && (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 py-12 px-4 flex justify-center items-center">
          <div className="grid lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-1 gap-6 items-center w-full max-w-6xl">
            {/* Image Section */}
            <div className="relative w-full h-full overflow-hidden bg-white rounded-lg shadow-lg">
              <img
                src={specifcsubscription?.data?.photo}
                alt="Subscription"
                className="w-full h-full object-cover rounded-lg"
              />
            </div>

            {/* Card Section */}
            <div
              className="card w-full h-full bg-white rounded-lg shadow-lg overflow-hidden"
              style={{
                backgroundImage: `url('https://wallpapers.com/images/hd/yellow-and-blue-background-bqfg6r5bom6fxrvm.jpg')`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              <div className="card-body p-6 backdrop-blur-sm bg-white/80">
                {/* Header Section */}
                <div className="text-center">
                  <div className="flex justify-center mb-4">
                    <Crown className="w-16 h-16 text-blue-600 hover:text-indigo-600 transition duration-300" />
                  </div>
                  <h1 className="mb-4 inline-block bg-blue-100 text-blue-700 px-4 py-1 rounded-lg shadow-sm hover:bg-blue-200 transition">
                    Most Popular
                  </h1>
                  <h1 className="text-3xl font-bold text-gray-900 mb-2 hover:text-blue-600 transition">
                    {specifcsubscription?.data?.subscriptionname}
                  </h1>
                  <div className="flex items-baseline justify-center gap-2">
                    <span className="text-5xl font-bold text-blue-600">
                      ${specifcsubscription?.data?.price}
                    </span>
                    <span className="text-gray-500">/month</span>
                  </div>
                </div>

                {/* Content Section */}
                <div className="space-y-6 mt-8">
                  {/* Service Duration */}
                  <div className="flex items-center gap-4 p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition">
                    <Clock className="w-8 h-8 text-blue-600 flex-shrink-0 hover:text-indigo-600 transition" />
                    <div>
                      <h3 className="font-semibold text-gray-900">
                        Service Duration
                      </h3>
                      <p className="text-gray-600">
                        {specifcsubscription?.data?.servicesdate}
                      </p>
                    </div>
                  </div>

                  {/* Description */}
                  <div className="p-4 bg-indigo-50 rounded-lg hover:bg-indigo-100 transition">
                    <h3 className="font-semibold text-gray-900 mb-2">
                      Plan Details
                    </h3>
                    <p className="text-gray-600">
                      {specifcsubscription?.data?.subscriptiondetails}
                    </p>
                  </div>

                  {/* Benefits */}
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-4">
                      What's Included
                    </h3>
                    <ul className="space-y-4">
                      {specifcsubscription?.data?.subscriptionbenefit.map(
                        (benefit, index) => (
                          <li
                            key={index}
                            className="flex items-center gap-3 p-2 hover:bg-blue-50 rounded-lg transition"
                          >
                            <div className="flex-shrink-0 w-6 h-6 bg-green-100 rounded-full flex items-center justify-center hover:bg-green-200 transition">
                              <Check className="w-4 h-4 text-green-600" />
                            </div>
                            <span className="text-gray-700">{benefit}</span>
                          </li>
                        )
                      )}
                    </ul>
                  </div>

                  {/* CTA Button */}
                  <button onClick={()=> handelApplyCompanySubScription(specifcsubscription?.data?._id)}  className="w-full flex items-center justify-center bg-blue-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-blue-700 hover:scale-105 transition-transform duration-300 shadow-lg hover:shadow-xl gap-2">
                    <span>Apply Company</span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M3 10h11M9 21h6M9 3h6M3 14h18"
                      />
                    </svg>
                  </button>

                  {/* Additional Info */}
                  <p className="text-center text-sm text-gray-500">
                    Last updated:{" "}
                    {new Date(
                      specifcsubscription?.data?.updatedAt
                    ).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <AppyCompanyModal subscriptionmodelId={subscriptionmodelId} refetch={refetch} />
        </div>
      )}
    </div>
   
   </>
  );
};

export default Subscription;
