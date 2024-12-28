import ErrorPage from "../../shared/ErrorPage/ErrorPage";

const PatchAction = async (url, selectedSpecialties, refetch) => {
  try {
    const result = await fetch(url, {
      method: "PATCH",
      headers: {
        "content-type": "application/json",
        authorization: `${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(selectedSpecialties),
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

export default PatchAction;
