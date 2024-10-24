import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { useUserContext } from "@/app/contexts/UserContext";
import CloseButton from "@/components/CloseButton";
import { router } from "expo-router";
import Colors from "@/constants/Colors";

const AddFriendModal = () => {
  const { addFriend } = useUserContext();
  const [friendId, setFriendId] = useState<string>("");

  const handleAddFriend = () => {
    if (friendId) {
      addFriend(friendId);
      router.back();
    }
  };

  return (
    <View style={styles.container}>
      <CloseButton onPress={router.back} />
      <Text style={styles.header}>Add friends</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter friend's username or ID"
        value={friendId}
        onChangeText={setFriendId}
      />
      <TouchableOpacity onPress={handleAddFriend} style={styles.addButton}>
        <Text style={styles.addButtonText}>Add Friend</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: Colors.background,
    marginTop: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    alignSelf: "center",
  },
  input: {
    marginTop: 20,
    padding: 10,
    borderWidth: 1,
    borderColor: "gray",
  },
  addButton: {
    marginTop: 20,
    padding: 15,
    backgroundColor: Colors.primary,
  },
  addButtonText: {
    color: "white",
    textAlign: "center",
  },
});

export default AddFriendModal;
