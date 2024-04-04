import { Icons } from "@/components/icons";
import React, { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

function AuthProvider({ children }) {
  const [auth, setAuth] = useState(null);
  const [adminAuth, setAdminAuth] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");

    setAuth(!!token);
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("tokenAdmin");
    setAdminAuth(!!token);
  }, []); 

  useEffect(() => {
    if (auth !== null || adminAuth !== null) {
      setIsLoading(false);
    }
  }, [auth, adminAuth]);

  return (
    <AuthContext.Provider value={{ auth, setAuth, adminAuth, setAdminAuth }}>
      {isLoading ? (
        <Icons.Spinner
          className="size-40 m-auto animate-spin h-screen"
          stroke="#ea580c"
        />
      ) : (
        children
      )}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
