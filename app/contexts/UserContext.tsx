import React, {
  createContext,
  useState,
  useContext,
  useEffect,
  ReactNode,
} from "react";
import { useUser } from "@clerk/clerk-expo";

interface UserContextProps {
  userImage: string | null;
  username: string | null;
  loading: boolean;
  setUserImage: (image: string | null) => void;
  setUsername: (name: string) => void;
}

const UserContext = createContext<UserContextProps | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const { user, isLoaded } = useUser();
  const [userImage, setUserImage] = useState<string | null>(null);
  const [username, setUsername] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (isLoaded && user) {
      setUserImage(user.imageUrl);
      setUsername(user.username);
      setLoading(false);
    }
  }, [user, isLoaded]);

  return (
    <UserContext.Provider
      value={{ userImage, username, loading, setUserImage, setUsername }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUserContext must be used within a UserProvider");
  }
  return context;
};
