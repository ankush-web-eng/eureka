'use client'
import axios from "axios";
import { useSession } from "next-auth/react";
import { createContext, useCallback, useEffect, useState, ReactNode, useContext } from "react";

interface UserDetails {
  id: string;
  email: string;
  createdAt: string;
  city: string;
  appointments: any[];
  history: any[];
}

interface UserContextProps {
  userDetails: UserDetails | null;
  selectedCity: string;
  setSelectedCity: React.Dispatch<React.SetStateAction<string>>;
}

const UserContext = createContext<UserContextProps | null>(null);

const UserProvider = ({ children }: { children: ReactNode }) => {
  const [userDetails, setUserDetails] = useState<UserDetails | null>(null);
  const [selectedCity, setSelectedCity] = useState<string>("");

  const { data: session } = useSession();

  const fetchUser = useCallback(async () => {
    if (session?.user?.email) {
      try {
        const res = await axios.get(`http://localhost:4000/patient/user/${session.user.email}`);
        setUserDetails(res.data);
        setSelectedCity(res.data.city);
      } catch (error) {
        console.log('Error fetching user:', error);
      }
    }
  }, [session]);

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  return (
    <UserContext.Provider value={{ userDetails, selectedCity, setSelectedCity }}>
      {children}
    </UserContext.Provider>
  );
};

const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};

export { UserProvider, useUser };
