
import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    try {
      const savedUser = localStorage.getItem("user");
      return savedUser ? JSON.parse(savedUser) : null;
    } catch (error) {
      console.error("Failed to load user:", error);
      localStorage.removeItem("user");
      return null;
    }
  });

  const login = (data) => {
    console.log("LOGIN RESPONSE:", data);
    console.log("LOGIN USER:", data?.user);

    const userData = data?.user;

    if (!userData) {
      console.error("User data missing from login response");
      return;
    }

    // Create a normalized user object
    const normalizedUser = {
      ...userData,

      // Support different possible backend field names
      name:
        userData.name ||
        userData.fullName ||
        userData.username ||
        userData.firstName ||
        "Buyer",
    };

    console.log("NORMALIZED USER:", normalizedUser);

    // Save token
    if (data?.token) {
      localStorage.setItem("token", data.token);
    }

    // Save complete user
    localStorage.setItem("user", JSON.stringify(normalizedUser));

    // Update React state
    setUser(normalizedUser);
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};

