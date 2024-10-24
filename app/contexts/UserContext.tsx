// import React, {
//   createContext,
//   useState,
//   useContext,
//   useEffect,
//   ReactNode,
// } from "react";
// import { useUser } from "@clerk/clerk-expo";

// interface UserContextProps {
//   userImage: string | null;
//   username: string | null;
//   loading: boolean;
//   setUserImage: (image: string | null) => void;
//   setUsername: (name: string) => void;
// }

// const UserContext = createContext<UserContextProps | undefined>(undefined);

// export const UserProvider = ({ children }: { children: ReactNode }) => {
//   const { user, isLoaded } = useUser();
//   const [userImage, setUserImage] = useState<string | null>(null);
//   const [username, setUsername] = useState<string | null>(null);
//   const [loading, setLoading] = useState<boolean>(true);

//   useEffect(() => {
//     if (isLoaded && user) {
//       setUserImage(user.imageUrl);
//       setUsername(user.username);
//       setLoading(false);
//     }
//   }, [user, isLoaded]);

//   return (
//     <UserContext.Provider
//       value={{ userImage, username, loading, setUserImage, setUsername }}
//     >
//       {children}
//     </UserContext.Provider>
//   );
// };

// export const useUserContext = () => {
//   const context = useContext(UserContext);
//   if (!context) {
//     throw new Error("useUserContext must be used within a UserProvider");
//   }
//   return context;
// };

import React, {
  createContext,
  useState,
  useContext,
  useEffect,
  ReactNode,
} from "react";
import { useUser } from "@clerk/clerk-expo";
import {
  mockUsers,
  addFriend as mockAddFriend,
  getFriendsByUserId,
} from "@/service/MockUserService";
import { UserData } from "@/service/UserData";
import { addNotification } from "@/service/NotificationsService";

interface UserContextProps {
  currentUser: UserData | null;
  userImage: string | null;
  username: string | null;
  loading: boolean;
  friends: UserData[];
  addFriend: (friendId: string) => void;
  setUserImage: (image: string | null) => void;
  setUsername: (name: string) => void;
}

const UserContext = createContext<UserContextProps | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const { user, isLoaded } = useUser();
  const [userImage, setUserImage] = useState<string | null>(null);
  const [username, setUsername] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [currentUser, setCurrentUser] = useState<UserData | null>(null);
  const [friends, setFriends] = useState<UserData[]>([]);

  useEffect(() => {
    if (isLoaded && user) {
      setUserImage(user.imageUrl);
      setUsername(user.username);
      setLoading(false);

      const foundUser = mockUsers.find((mockUser) => mockUser.id === user.id);
      setCurrentUser(foundUser || null);

      if (foundUser) {
        setFriends(getFriendsByUserId(foundUser.id));
      }
    }
  }, [user, isLoaded]);

  const addFriend = (friendId: string) => {
    if (currentUser) {
      mockAddFriend(currentUser.id, friendId);

      addNotification({
        id: Date.now().toString(),
        message: `You added ${friendId} as a friend.`,
        timestamp: new Date(),
        type: "self_action",
        fromUserId: currentUser.id,
        toUserId: currentUser.id,
      });

      // Dodaj powiadomienie dla nowego znajomego
      addNotification({
        id: Date.now().toString(),
        message: `${currentUser.username} added you as a friend.`,
        timestamp: new Date(),
        type: "friend_request",
        fromUserId: currentUser.id,
        toUserId: friendId,
      });

      // Update the friends list after adding a new friend
      const updatedFriends = getFriendsByUserId(currentUser.id);
      setFriends(updatedFriends);
    }
  };

  return (
    <UserContext.Provider
      value={{
        currentUser,
        userImage,
        username,
        loading,
        friends,
        addFriend,
        setUserImage,
        setUsername,
      }}
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
