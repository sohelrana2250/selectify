const PostAction = async(url, selectedSpecialties) => {

    const result= await fetch(url, {
        method: "POST",
        headers: {
          "content-type": "application/json",
          authorization: `${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(selectedSpecialties),
      });
      const data=await result.json();
     
      
      return data;
};

export default PostAction;