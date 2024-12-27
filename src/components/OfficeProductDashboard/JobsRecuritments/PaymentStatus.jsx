import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import ErrorPage from "../../../shared/ErrorPage/ErrorPage";
import PaymentSuccess from "./PaymentSuccess";
import PaymentFailed from "./PaymentFailed";

export const PaymentStatus = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const status = queryParams.get("status");
  const [IsPaymentSuccess, setPaymentSuccess] = useState(false);
  const [serverTransactionId, setServerTransactionId] = useState("");
  const [IsPaymentFailed, setIsPaymentFailed] = useState(false);

  const transactionId = localStorage.getItem(
    `${import.meta.env.VITE_TRANSACTIONID}`
  ); // Move outside useEffect

  useEffect(() => {
    if (status === "failed" && transactionId) {
      fetch(
        `${
          import.meta.env.VITE_COMMON_ROOT_API
        }/api/v1/payment/delete_failed_payment_status/${Number(transactionId)}`,
        {
          method: "DELETE",
          headers: {
            authorization: `${localStorage.getItem("token")}`,
          },
        }
      )
        .then((res) => {
          if (!res.ok) {
            throw new Error("API ERROR");
          }
          return res.json();
        })
        .then((data) => {
          if (data?.success && data?.data?.acknowledged) {
            localStorage.removeItem(`${import.meta.env.VITE_TRANSACTIONID}`);
            setIsPaymentFailed(data?.data?.acknowledged);
          }
        })
        .catch((error) => {
          if (error) {
            return <ErrorPage message={error?.message} />;
          }
        });
    }

    if (status === "success" && transactionId) {
      fetch(
        `${
          import.meta.env.VITE_COMMON_ROOT_API
        }/api/v1/payment/update_payment_status/${Number(transactionId)}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `${localStorage.getItem("token")}`,
          },
        }
      )
        .then((res) => {
          if (!res.ok) {
            throw new Error(`API Error: ${res.statusText}`);
          }
          return res.json();
        })
        .then((data) => {
          if (
            data?.success &&
            data?.data?.companyApply?.payment &&
            data?.data?.payment?.payment
          ) {
            setPaymentSuccess(data?.data?.companyApply?.payment);
            setServerTransactionId(data?.data?.payment?.transactionId);
            localStorage.removeItem(`${import.meta.env.VITE_TRANSACTIONID}`);
          }
        })
        .catch((error) => {
          if (error) {
            return <ErrorPage message={error?.message} />;
          }
        });
    }
  }, [status, transactionId]);

  return (
    <div className="mt-16">
      {status === "success" && IsPaymentSuccess && (
        <PaymentSuccess tranId={serverTransactionId} />
      )}
      {status === "failed" && IsPaymentFailed && <PaymentFailed />}
    </div>
  );
};

export default PaymentStatus;
