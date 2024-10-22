import { UserData } from "@/service/UserData";

export const mockUsers: UserData[] = [
  {
    id: "user_2iCBKk2rRhjrqrSngxOHs6V9yao",
    username: "jasiek",
    friendsIds: [
      "user_2nnhYPDcbtseO9VRPKFobqAzT7q",
      "user_2hxg8ByJ7EPcHvHyKy8cqY4U97c",
    ],
  },
  {
    id: "user_2nnhYPDcbtseO9VRPKFobqAzT7q",
    username: "user2",
    friendsIds: [
      "user_2hxg8ByJ7EPcHvHyKy8cqY4U97c",
      "user_2iCBKk2rRhjrqrSngxOHs6V9yao",
    ],
  },
  {
    id: "user_2hxg8ByJ7EPcHvHyKy8cqY4U97c",
    username: "jane_doe",
    friendsIds: ["user_2iCBKk2rRhjrqrSngxOHs6V9yao"],
  },
];

export const getFriendsByUserId = (userId: string): UserData[] => {
  const user = mockUsers.find((u) => u.id === userId);
  if (!user) return [];

  return mockUsers.filter((u) => user.friendsIds.includes(u.id));
};

export const sendFriendRequest = (userId: string, friendId: string): void => {
  console.log(`Friend request sent from ${userId} to ${friendId}`);
};
