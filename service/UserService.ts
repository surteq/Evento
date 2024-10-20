// class UserService {
//     mockUser: User = {
//       uid: "test-user-1",
//       displayName: "Test User",
//       email: "testemail@gmail.com",
//       emailVerified: true,
//       photoURL: "https://test.com/test.jpg",
//       role: "standard",
//       providerId: "google",
//       subscriptionStatus: "standard",
//       createdAt: new Date(2024, 10, 20),
//       lastSignInTime: new Date(2024, 10, 21),
//       workouts: [],
//     };

//     interface UserData {
//         id: string,
//         username: string,
//         friendsId: string[],
//     }

//     mockFriends: UserData[] = [{}, {}]

//     getFriendsByUserId(UserId: string) {
//         return this.mockUser;
//       }
//   }

//   export const userService = new UserService();
