import { jwtDecode } from "jwt-decode"; 
import ErrorPage from "../../shared/ErrorPage/ErrorPage";


const TokenVarified = (token) => {
  if (!token || typeof token !== "string") {
    return null;
  }

  try {
    const decoded = jwtDecode(token);

    return decoded;
  } catch (error) {
     if(error){
        return <ErrorPage message={error?.message}/>
     }
    return null;
  }
};

export default TokenVarified;