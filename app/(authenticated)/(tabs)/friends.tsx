import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
} from "react-native";
import { useUserContext } from "@/app/contexts/UserContext";
import {
  getFriendsByUserId,
  sendFriendRequest,
} from "@/service/MockUserService";
import { UserData } from "@/service/UserData";
import { Ionicons } from "@expo/vector-icons";
import Colors from "@/constants/Colors";

const Friends = () => {
  const { currentUser } = useUserContext();
  const [friends, setFriends] = useState<UserData[]>([]);
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    if (currentUser) {
      const userFriends = getFriendsByUserId(currentUser.id);

      const filteredFriends = userFriends.filter((friend) =>
        friend.username.toLowerCase().includes(searchText.toLowerCase())
      );

      setFriends(filteredFriends);
    }
  }, [currentUser, searchText]);

  const handleAddFriend = (friendId: string) => {
    if (currentUser) {
      sendFriendRequest(currentUser.id, friendId);
    }
  };

  const renderFriend = ({ item }: { item: UserData }) => (
    <View style={styles.friendContainer}>
      <View style={styles.friendDetails}>
        <Image
          source={require("@/assets/images/profileImage.png")}
          style={styles.profileImage}
        />
        <Text style={styles.friendName}>{item.username}</Text>
      </View>

      <TouchableOpacity
        style={styles.addFriendButton}
        onPress={() => handleAddFriend(item.id)}
      >
        <Ionicons name="person-add" size={24} color={Colors.primary} />
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Search Input */}
      <View style={styles.searchSection}>
        <Ionicons
          style={styles.searchIcon}
          name="search"
          size={20}
          color={Colors.dark}
        />
        <TextInput
          style={[styles.input, { height: 40 }]}
          placeholder="Search"
          placeholderTextColor={Colors.dark}
          value={searchText}
          onChangeText={setSearchText}
        />
      </View>

      <FlatList
        data={friends}
        keyExtractor={(item) => item.id}
        renderItem={renderFriend}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    paddingHorizontal: 15,
    paddingTop: 100,
  },
  searchSection: {
    flexDirection: "row",
    backgroundColor: Colors.lightGray,
    borderRadius: 20,
    justifyContent: "flex-start",
    alignItems: "center",
    marginBottom: 20,
    height: 40,
    width: "100%",
    paddingHorizontal: 10,
  },
  searchIcon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    color: Colors.dark,
  },
  friendContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: Colors.lightGray,
  },
  friendName: {
    fontSize: 18,
    fontWeight: "bold",
  },
  friendDetails: {
    flexDirection: "row",
    alignItems: "center",
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 20,
  },
  addFriendButton: {
    alignSelf: "center",
    paddingVertical: 8,
    paddingHorizontal: 8,
  },
});

export default Friends;
