import { useQuery } from "@tanstack/react-query";
import React from "react";
import { useParams } from "react-router-dom";
import Loading from "../../../../shared/Loading/Loading";
import ErrorPage from "../../../../shared/ErrorPage/ErrorPage";
import { Mail, Phone, MapPin, CheckCircle, XCircle } from "lucide-react";

const SpecificCompanyList = () => {
  const { id } = useParams();

  const {
    data: specific_company = [],
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ["specific_company", id],
    queryFn: async () => {
      const res = await fetch(
        `${
          import.meta.env.VITE_COMMON_ROOT_API
        }/api/v1/company_apply/find_specific_companylist/${id}`,
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

  return (
    <div className="mt-16">
      {specific_company?.success && (
        <div className="min-h-screen  flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-br from-white to-green-200 shadow-xl rounded-2xl p-8 w-full max-w-lg transform transition-all hover:shadow-2xl hover:scale-105">
            {/* Company Name */}
            <div className="text-center mb-6">
              <h1 className="text-3xl font-extrabold text-gray-800 mb-2 tracking-wide">
                {specific_company?.data?.companyname}
              </h1>
              <p className="text-sm text-gray-500 italic">
                Empowering innovation and excellence
              </p>
            </div>

            {/* Address */}
            <div className="flex items-center space-x-3 mb-4">
              <MapPin className="w-6 h-6 text-blue-600" />
              <p className="text-gray-600 text-lg font-medium">
                {specific_company?.data.address}
              </p>
            </div>

            {/* Country */}
            <div className="flex items-center space-x-3 mb-4">
              <span className="bg-blue-50 text-blue-700 px-2 py-1 rounded-md text-sm font-medium">
                Country:
              </span>
              <span className="text-gray-800 text-lg font-semibold">
                {specific_company?.data.country}
              </span>
            </div>

            {/* Email */}
            <div className="flex items-center space-x-3 mb-4">
              <Mail className="w-6 h-6 text-blue-600" />
              <a
                href={`mailto:${specific_company?.data.email}`}
                className="text-blue-700 hover:underline text-lg"
              >
                {specific_company?.data.email}
              </a>
            </div>

            {/* Phone */}
            <div className="flex items-center space-x-3 mb-4">
              <Phone className="w-6 h-6 text-blue-600" />
              <span className="text-gray-600 text-lg">
                {specific_company?.data.phonenumber}
              </span>
            </div>

            {/* Payment Status */}
            <div className="flex items-center space-x-3 mb-4">
              {specific_company?.data?.payment ? (
                <CheckCircle className="w-6 h-6 text-green-500" />
              ) : (
                <XCircle className="w-6 h-6 text-red-500" />
              )}
              <span
                className={`text-lg font-medium ${
                  specific_company?.data.payment
                    ? "text-green-600"
                    : "text-red-600"
                }`}
              >
                {specific_company?.data.payment
                  ? "Payment Completed"
                  : "Payment Pending"}
              </span>
            </div>

            {/* Verification Status */}
            <div className="flex items-center space-x-3 mb-4">
              {specific_company?.data.isVerified ? (
                <CheckCircle className="w-6 h-6 text-green-500" />
              ) : (
                <XCircle className="w-6 h-6 text-red-500" />
              )}
              <span
                className={`text-lg font-medium ${
                  specific_company?.data.isVerified
                    ? "text-green-600"
                    : "text-red-600"
                }`}
              >
                {specific_company?.data.isVerified
                  ? "Verified"
                  : "Not Verified"}
              </span>
            </div>

            {/* Timestamps */}
            <div className="bg-gray-50 rounded-lg p-4 mt-6">
              <p className="text-gray-500 text-sm">
                <strong>Created At:</strong>{" "}
                {new Date(specific_company?.data.createdAt).toLocaleString()}
              </p>
              <p className="text-gray-500 text-sm">
                <strong>Updated At:</strong>{" "}
                {new Date(specific_company?.data.updatedAt).toLocaleString()}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SpecificCompanyList;
