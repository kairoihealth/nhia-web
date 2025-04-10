import React from "react";
import Auth from "../api/Auth";

export default function useAuth() {
  const authenticatedUser = Auth.getDecodedJwt();
  const isLoggedIn = Auth.isAuthenticated();
  const logOut = Auth.removeToken;

  const user = React.useMemo(() => {
    return authenticatedUser;
  }, [authenticatedUser]);

  console.log("Decoded User:", user);
  console.log("Is Logged In:", isLoggedIn);

  return {
    user,
    logOut,
    authenticatedUser,
    isLoggedIn
  };
}
