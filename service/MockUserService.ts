import { UserData } from "@/service/UserData";
// import { addNotification } from "./NotificationsService";

export const mockUsers: UserData[] = [
  {
    id: "user_2iCBKk2rRhjrqrSngxOHs6V9yao",
    username: "jasiek",
    friendsIds: [
      "user_2nnhYPDcbtseO9VRPKFobqAzT7q",
      // "user_2hxg8ByJ7EPcHvHyKy8cqY4U97c",
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
  {
    id: "1",
    username: "john_doe",
    friendsIds: [],
  },
];

export const getFriendsByUserId = (userId: string): UserData[] => {
  const user = mockUsers.find((u) => u.id === userId);
  if (!user) return [];

  return mockUsers.filter((u) => user.friendsIds.includes(u.id));
};

export const addFriend = (userId: string, friendId: string): void => {
  const user = mockUsers.find((u) => u.id === userId);
  const friend = mockUsers.find((u) => u.id === friendId);

  if (user && friend && !user.friendsIds.includes(friendId)) {
    user.friendsIds.push(friendId);
    friend.friendsIds.push(userId);

    // addNotification({
    //   id: Date.now().toString(),
    //   message: `You added ${friend.username} as a friend.`,
    //   timestamp: new Date(),
    //   type: "self_action",
    //   fromUserId: userId,
    //   toUserId: userId,
    // });

    // addNotification({
    //   id: Date.now().toString(),
    //   message: `${user.username} added you as a friend.`,
    //   timestamp: new Date(),
    //   type: "friend_request",
    //   fromUserId: userId,
    //   toUserId: friendId,
    // });

    console.log(`Friend added: ${userId} and ${friendId} are now friends.`);
  } else {
    console.log("Friend request failed: Users not found or already friends.");
  }
};
