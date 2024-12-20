import { useQuery } from "@tanstack/react-query";
import React from "react";
import Loading from "../../../shared/Loading/Loading";
import ErrorPage from "../../../shared/ErrorPage/ErrorPage";
import {
  Clock,
  MapPin,
  Phone,
  Mail,
  Building,
  Globe,
  Check,
} from "lucide-react";
import SubscriptionNotFound from "./SubscriptionNotFound";

const JobsRecuritments = () => {
  // http://localhost:3025/api/v1/company_apply/my_subscription_company
  const {
    data: my_subscription = [],
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ["my_subscription"],
    queryFn: async () => {
      const res = await fetch(
        `${
          import.meta.env.VITE_COMMON_ROOT_API
        }/api/v1/company_apply/my_subscription_company`,
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

  //   console.log(my_subscription?.data);
  const handelPaymentDetails = (id, payment_details) => {
    console.log(payment_details);
    console.log(id);
  };

  return (
    <>
      {!isLoading && my_subscription?.data?.length === 0 && (
        <SubscriptionNotFound />
      )}
      <div className="mt-16">
        <div className="p-6 bg-gray-50 min-h-screen">
          <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-6">
            {!isLoading &&
              my_subscription?.success &&
              my_subscription?.data?.map((sub) => (
                <div
                  key={sub._id}
                  className="group bg-white rounded-lg shadow-lg overflow-hidden border border-gray-200 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 hover:border-blue-400"
                >
                  {/* Header */}
                  <div className="bg-gradient-to-r from-blue-600 to-blue-800 p-6 text-white group-hover:from-blue-700 group-hover:to-blue-900 transition-all duration-300">
                    <h2 className="text-2xl font-bold mb-2 group-hover:scale-105 transition-transform duration-300">
                      {sub.subscriptionmodelId.subscriptionname}
                    </h2>
                    <div className="flex items-center justify-between">
                      <div className="text-3xl font-bold group-hover:scale-105 transition-transform duration-300">
                        ${sub.subscriptionmodelId.price}
                        <span className="text-sm font-normal">/month</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="w-5 h-5" />
                        <span>{sub.subscriptionmodelId.servicesdate}</span>
                      </div>
                    </div>
                  </div>

                  {/* Company Info */}
                  <div className="p-6 space-y-4">
                    <div className="flex items-center gap-3 hover:text-blue-600 transition-colors duration-200">
                      <Building className="w-5 h-5 text-blue-600" />
                      <span className="font-medium">{sub.companyname}</span>
                    </div>

                    <div className="flex items-center gap-3 hover:text-blue-600 transition-colors duration-200">
                      <Globe className="w-5 h-5 text-blue-600" />
                      <span>{sub.country}</span>
                    </div>

                    <div className="flex items-center gap-3 hover:text-blue-600 transition-colors duration-200">
                      <MapPin className="w-5 h-5 text-blue-600" />
                      <span>{sub.address}</span>
                    </div>

                    <div className="flex items-center gap-3 hover:text-blue-600 transition-colors duration-200">
                      <Mail className="w-5 h-5 text-blue-600" />
                      <span>{sub.email}</span>
                    </div>

                    <div className="flex items-center gap-3 hover:text-blue-600 transition-colors duration-200">
                      <Phone className="w-5 h-5 text-blue-600" />
                      <span>{sub.phonenumber}</span>
                    </div>

                    <div>
                      <p className="font-semibold mb-3">
                        <span className="font-serif bg-yellow-100 text-yellow-800">
                          Details:
                        </span>{" "}
                        {sub?.subscriptionmodelId?.subscriptiondetails}
                      </p>
                    </div>

                    {/* Benefits */}
                    <div className="mt-6">
                      <h3 className="font-semibold mb-3">Benefits:</h3>
                      <ul className="space-y-2">
                        {sub.subscriptionmodelId.subscriptionbenefit.map(
                          (benefit, index) => (
                            <li
                              key={index}
                              className="flex items-center gap-2 hover:text-blue-600 transition-colors duration-200"
                            >
                              <Check className="w-5 h-5 text-green-500" />
                              <span>{benefit}</span>
                            </li>
                          )
                        )}
                      </ul>
                    </div>

                    {/* Status Badges */}
                    <div className="flex flex-wrap gap-4 mt-4 justify-center items-center">
                      {/* Payment Status */}
                      <div
                        className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm shadow-md transition-transform transform hover:scale-105 duration-200 ${
                          sub.payment
                            ? "bg-green-100 text-green-800"
                            : "bg-yellow-100 text-yellow-800"
                        }`}
                      >
                        <div
                          className={`flex items-center justify-center w-6 h-6 rounded-full ${
                            sub.payment ? "bg-green-500" : "bg-yellow-500"
                          } text-white`}
                        >
                          💳
                        </div>
                        <div className="font-medium">
                          Payment:{" "}
                          <span className="font-semibold">
                            {sub.payment ? "Paid" : "Pending"}
                          </span>
                        </div>
                      </div>

                      {/* Company Verification Status */}
                      <div
                        className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm shadow-md transition-transform transform hover:scale-105 duration-200 ${
                          sub.isVerified
                            ? "bg-blue-100 text-blue-800"
                            : "bg-gray-100 text-gray-800"
                        }`}
                      >
                        <div
                          className={`flex items-center justify-center w-6 h-6 rounded-full ${
                            sub.isVerified ? "bg-blue-500" : "bg-gray-500"
                          } text-white`}
                        >
                          ✅
                        </div>
                        <div className="font-medium">
                          Company Verified:{" "}
                          <span className="font-semibold">
                            {sub.isVerified ? "Verified" : "Unverified"}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  {sub?.isVerified && (
                    <div className="flex justify-center">
                      <button
                        disabled={sub?.payment}
                        onClick={() =>
                          handelPaymentDetails(sub?._id, {
                            name: sub?.companyname,
                            email: sub?.email,
                            address: sub?.address,
                            amount: Number(sub?.subscriptionmodelId?.price),
                          })
                        }
                        className="btn w-full bg-gradient-to-r from-blue-200 to-blue-800 hover:from-blue-300 hover:to-blue-900 transform hover:scale-105 transition-all duration-300"
                      >
                        Buy Now
                      </button>
                    </div>
                  )}
                </div>
              ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default JobsRecuritments;
