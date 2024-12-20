

const PatchAction = async(url, selectedSpecialties, refetch) => {

   
    const result= await fetch(url, {
        method: "PATCH",
        headers: {
          "content-type": "application/json",
          authorization: `${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(selectedSpecialties),
      });
      const data=await result.json();
      refetch();
      
      return data;
};

export default PatchAction;