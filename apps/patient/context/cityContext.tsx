import axios from "axios";
import { useSession } from "next-auth/react";
import { createContext, useCallback, useEffect, useState, ReactNode, useContext } from "react";

interface CityContextProps {
  selectedCity: string;
  setSelectedCity: React.Dispatch<React.SetStateAction<string>>;
}

const CityContext = createContext<CityContextProps | null>(null);

const CityProvider = ({ children }: { children: ReactNode }) => {
  const [selectedCity, setSelectedCity] = useState<string>("");

  const { data: session } = useSession();

  const fetchUser = useCallback(async () => {
    if (session?.user?.email) {
      try {
        const res = await axios.get(`http://localhost:4000/patient/user/${session.user.email}`);
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
    <CityContext.Provider value={{ selectedCity, setSelectedCity }}>
      {children}
    </CityContext.Provider>
  );
};

// Custom hook for using the city context
const useCity = () => {
  const context = useContext(CityContext);
  if (!context) {
    throw new Error("useCity must be used within a CityProvider");
  }
  return context;
};

export { CityProvider, useCity };
