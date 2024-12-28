import React, { useEffect, useState } from "react";
import {
  Calendar,
  CheckCircle,
  DollarSign,
  Mail,
  MapPin,
  Phone,
  User,
  XCircle,
} from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import Loading from "../../../../shared/Loading/Loading";
import ErrorPage from "../../../../shared/ErrorPage/ErrorPage";

const AllPayment = () => {
  const [page, setPage] = useState(1);
  const [isPageLoading, setIsPageLoading] = useState(false);

  const {
    data: all_payment_list = [],
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ["all_payment_list"],
    queryFn: async () => {
      const res = await fetch(
        `${
          import.meta.env.VITE_COMMON_ROOT_API
        }/api/v1/payment/all_payment_list_admin?page=${page}`,
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
    enabled: true,
    refetchOnWindowFocus: false,
    refetchOnMount: true,
    refetchOnReconnect: true,
  });

  useEffect(() => {
    refetch();
  }, [page, refetch]);

  const handlePageChange = async (newPage) => {
    setIsPageLoading(true);
    setPage(newPage);

    try {
      await refetch();
    } catch (error) {
      if (error) {
        return <ErrorPage message={error?.message} />;
      }
    } finally {
      setIsPageLoading(false);
    }
  };

  if (isLoading || isPageLoading) {
    return <Loading />;
  }

  if (error) {
    return <ErrorPage message={error?.message} />;
  }

  if (isLoading) {
    return <Loading />;
  }
  if (error) {
    return <ErrorPage message={error?.message} />;
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleTimeString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  //console.log(all_payment_list?.data?.meta);

  return (
    <div className="w-full bg-gradient-to-br from-white to-green-300  rounded-lg shadow-lg p-2">
      <h1 className="animate-pulse text-4xl font-serif text-center mb-8 text-gray-800 tracking-tight animate-fade-in">
        Payment <span className="text-blue-900 animate-pulse">Records</span>
      </h1>
      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">
                User
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">
                Device Details
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">
                Company
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">
                Contact Info
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">
                Payment
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">
                User_Varification
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">
                Payment_Varification
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">
                Payment_Date
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">
                User_CreatedAt
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {!isLoading &&
              all_payment_list?.data?.result?.map((payment) => (
                <tr
                  key={payment._id}
                  className="hover:bg-gray-50 transition-colors"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-3">
                      <img
                        src={payment.userId.photo}
                        alt={payment.userId.name}
                        className="h-10 w-10 rounded-full object-cover"
                      />
                      <div>
                        <div className="flex items-center space-x-1">
                          <User className="w-4 h-4 text-gray-500" />
                          <p className="text-sm font-medium text-gray-900">
                            {payment.userId.name}
                          </p>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Mail className="w-4 h-4 text-gray-500" />
                          <p className="text-sm text-gray-500">
                            {payment.userId.email}
                          </p>
                        </div>
                      </div>
                    </div>
                  </td>

                  {/* device */}
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-1">
                      <p className="text-sm font-medium text-gray-900">
                        {payment.userId.os}
                      </p>
                    </div>
                    <div className="flex items-center space-x-1">
                      <MapPin className="w-4 h-4 text-gray-500" />
                      <p className="text-sm text-gray-500 inline-block">
                        {payment.userId.browser
                          .concat(" - ")
                          .concat(payment?.userId.device)}
                      </p>
                    </div>
                  </td>

                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-1">
                      <p className="text-sm font-medium text-gray-900">
                        {payment.name}
                      </p>
                    </div>
                    <div className="flex items-center space-x-1">
                      <MapPin className="w-4 h-4 text-gray-500" />
                      <p className="text-sm text-gray-500">{payment.address}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-1">
                      <Phone className="w-4 h-4 text-gray-500" />
                      <p className="text-sm text-gray-500">
                        {payment.contractNumber}
                      </p>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Mail className="w-4 h-4 text-gray-500" />
                      <p className="text-sm text-gray-500">{payment.email}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-1">
                      <DollarSign className="w-4 h-4 text-green-500" />
                      <p className="text-sm font-medium text-gray-900">
                        ${payment.amount}
                      </p>
                    </div>
                    <div className="flex items-center space-x-1">
                      <p className="text-xs text-gray-500">
                        TXN: {payment.transactionId}
                      </p>
                    </div>
                  </td>

                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-3 mb-4">
                      {payment?.userId?.isVerify ? (
                        <CheckCircle className="w-4 h-4 text-green-500" />
                      ) : (
                        <XCircle className="w-4 h-4 text-red-500" />
                      )}
                      <span
                        className={`text-sm font-medium ${
                          payment?.userId?.isVerify
                            ? "text-green-600"
                            : "text-red-600"
                        }`}
                      >
                        {payment?.userId?.isVerify
                          ? "Verified"
                          : "Not Verified"}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-3 mb-4">
                      {payment?.payment ? (
                        <CheckCircle className="w-4 h-4 text-green-500" />
                      ) : (
                        <XCircle className="w-4 h-4 text-red-500" />
                      )}
                      <span
                        className={`text-sm font-medium ${
                          payment?.payment ? "text-green-600" : "text-red-600"
                        }`}
                      >
                        {payment?.payment ? "Payment_Verified" : "Not Verified"}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-1">
                      <Calendar className="w-6 h-6 text-gray-500" />
                      <p className="text-sm text-gray-500">
                        {formatDate(payment.createdAt)}
                      </p>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-1">
                      <Calendar className="w-6 h-6 text-gray-500" />
                      <p className="text-sm text-gray-500">
                        {formatDate(payment.userId.createdAt)}
                      </p>
                    </div>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <nav aria-label="Page navigation" className="mt-6">
        <ul className="inline-flex -space-x-px text-sm">
          <li>
            <button
              onClick={() => handlePageChange(page - 1)}
              disabled={page === 1}
              className={`flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 ${
                page === 1 ? "cursor-not-allowed opacity-50" : ""
              }`}
            >
              Previous
            </button>
          </li>
          {Array.from(
            { length: all_payment_list?.data?.meta?.totalPage || 0 },
            (_, index) => (
              <li key={index}>
                <button
                  onClick={() => handlePageChange(index + 1)}
                  className={`flex items-center justify-center px-3 h-8 leading-tight ${
                    page === index + 1
                      ? "text-blue-600 border border-gray-300 bg-blue-50"
                      : "text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700"
                  }`}
                >
                  {index + 1}
                </button>
              </li>
            )
          )}
          <li>
            <button
              onClick={() => handlePageChange(page + 1)}
              disabled={page === all_payment_list?.data?.meta?.totalPage}
              className={`flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 ${
                page === all_payment_list?.data?.meta?.totalPage
                  ? "cursor-not-allowed opacity-50"
                  : ""
              }`}
            >
              Next
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default AllPayment;
