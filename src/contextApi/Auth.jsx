import { createContext, useContext, useState } from "react";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [openDialog, setOpenDialog] = useState(false);

  const getUserProfile = (tokenInfo) => {
    axios
      .get(
        `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${tokenInfo?.access_token}`,
        {
          headers: {
            Authorization: `Bearer ${tokenInfo?.access_token}`,
            Accept: "application/json",
          },
        }
      )
      .then((res) => {
        console.log(res);
        localStorage.setItem("user", JSON.stringify(res.data));
        setOpenDialog(false);
        // onGenerateTrip()
      });
  };

  const handleLogin = useGoogleLogin({
    onSuccess: (tokenResponse) => getUserProfile(tokenResponse),
    onError: (error) => console.log(error),
  });

  const handleClose = () => {
    setOpenDialog(false);
  };

  return (
    <AuthContext.Provider
      value={{
        handleLogin,
        handleClose,
        getUserProfile,
        openDialog,
        setOpenDialog,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
