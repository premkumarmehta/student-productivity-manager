import {
  createContext,
  useContext,
  useState,
  useEffect,
} from "react";

const AuthContext =
  createContext();

export const AuthProvider = ({
  children,
}) => {
  const [user, setUser] =
    useState(null);

  // Restore user on refresh
  useEffect(() => {
    const savedUser =
      localStorage.getItem("user");

    if (savedUser) {
      setUser(
        JSON.parse(savedUser)
      );
    }
  }, []);

  // Login
  const login = (userData) => {
    localStorage.setItem(
      "user",
      JSON.stringify(userData)
    );

    localStorage.setItem(
      "token",
      userData.token
    );

    setUser(userData);
  };

  // Logout
  const logout = () => {
    localStorage.removeItem(
      "user"
    );

    localStorage.removeItem(
      "token"
    );

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

export const useAuth = () =>
  useContext(AuthContext);