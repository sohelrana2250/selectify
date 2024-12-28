import ErrorPage from "../../shared/ErrorPage/ErrorPage";

const GenerateImage = async (image) => {
  try {
    const formData = new FormData();
    formData.append("image", image);
    const url = `https://api.imgbb.com/1/upload?key=${
      import.meta.env.VITE_imgbb_key
    }`;
    const res = await fetch(url, {
      method: "POST",
      body: formData,
    });
    const imgData = await res.json();
    return imgData?.data?.url;
  } catch (error) {
    if (error) {
      return <ErrorPage message={error?.message} />;
    }
  }
};

export default GenerateImage;
