import React from "react";
import ErrorPage from "../../shared/ErrorPage/ErrorPage";

const DeleteAction = async (url, refetch) => {
  try {
    const result = await fetch(url, {
      method: "DELETE",
      headers: {
        authorization: `${localStorage.getItem("token")}`,
      },
    });
    const data = await result.json();
    refetch();

    return data;
  } catch (error) {
    if (error) {
      return <ErrorPage message={error?.message} />;
    }
  }
};

export default DeleteAction;
