'use client'
import { Appointment, History } from "@/types/PatientType";
import axios from "axios";
import { useSession } from "next-auth/react";
import { createContext, useCallback, useEffect, useState, ReactNode, useContext } from "react";

interface UserDetails {
  id: string;
  email: string;
  name: string;
  createdAt: string;
  city: string;
  appointments: Appointment[];
  history: History[];
}

interface UserContextProps {
  userDetails: UserDetails | null;
  selectedCity: string;
  setSelectedCity: React.Dispatch<React.SetStateAction<string>>;
  updatePatient: () => void;
}

const UserContext = createContext<UserContextProps | null>(null);

const UserProvider = ({ children }: { children: ReactNode }) => {
  const [userDetails, setUserDetails] = useState<UserDetails | null>(null);
  const [selectedCity, setSelectedCity] = useState<string>("");

  const { data: session } = useSession();

  const fetchUser = useCallback(async () => {
    if (session?.user?.email) {
      try {
        const res = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/patient/user/${session.user.email}`);
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

  const updatePatient = () => {
    fetchUser();
  }

  return (
    <UserContext.Provider value={{ userDetails, selectedCity, setSelectedCity, updatePatient }}>
      {children}
    </UserContext.Provider>
  );
};

function useUser(): UserContextProps {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};

export { UserProvider, useUser };
