import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import TokenVarified from "./TokenVarified";



const Auth = () => {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (!token) {
      navigate("/login");
      return;
    }
    const verifiedUser = TokenVarified(token);

    if (!verifiedUser) {
      navigate("/login");
    } else {
      setUser(verifiedUser);
    }
  }, [token, navigate]);
  if (!user) {
    return null;
  }

  return user;
};

export default Auth;