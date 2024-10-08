/* eslint-disable react-refresh/only-export-components */
import { createContext, ReactNode, useContext, useState } from "react";

type UserType = {
  email: string;
  token: string;
};
type UserContextType = {
  user: UserType | null;
  updateUser: (user: UserType | null) => void;
};

const UserContext = createContext<UserContextType | null>(null);

const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<UserType | null>(null);

 
  const updateUser = (user: UserType | null) => {
    if (user) {
      setUser({ email: user.email, token: user.token });
    } else {
      setUser(null);
    }
  };
  const value = { user, updateUser };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

const useUser = () => {
  const context = useContext(UserContext);

  if (context == null) {
    throw new Error("UserContext must be used within UserProvider");
  }
  return context;
};

export { UserProvider, useUser };
