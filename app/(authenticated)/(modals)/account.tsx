import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  TextInput,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useAuth, useUser } from "@clerk/clerk-expo";
import { Ionicons } from "@expo/vector-icons";
import Colors from "@/constants/Colors";
import * as ImagePicker from "expo-image-picker";

const Account = () => {
  const { user } = useUser();
  const { signOut } = useAuth();
  const [username, setUsername] = useState(user?.username);
  const [edit, setEdit] = useState(false);
  // const [initialUsernameSet, setInitialUsernameSet] = useState(false);

  // useEffect(() => {
  //   if (user && user.emailAddresses.length > 0 && !initialUsernameSet) {
  //     const email = user.emailAddresses[0].emailAddress;
  //     const defaultUsername = email.split("@")[0];
  //     setUsername(defaultUsername);
  //     setInitialUsernameSet(true);
  //   }
  // }, [user, initialUsernameSet]);

  const onSaveUser = async () => {
    try {
      await user?.update({ username: username! });
      setEdit(false);
    } catch (err) {
      console.error(err);
    } finally {
      setEdit(false);
    }
  };

  const onCaptureImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.75,
      base64: true,
    });

    if (!result.canceled) {
      const base64 = `data:image/png;base64,${result.assets[0].base64}`;

      user?.setProfileImage({
        file: base64,
      });
    }
  };

  return (
    <View
      style={{
        flex: 1,
        paddingTop: 20,
        backgroundColor: "rgba(0, 0, 0, 0.9)",
      }}
    >
      <View style={{ alignItems: "center", paddingTop: 40 }}>
        <TouchableOpacity onPress={onCaptureImage} style={styles.captureBtn}>
          {user?.imageUrl && (
            <Image source={{ uri: user?.imageUrl }} style={styles.avatar} />
          )}
        </TouchableOpacity>
        {user && (
          <View style={{ alignItems: "center" }}>
            {!edit && (
              <View style={styles.editRow}>
                <Text style={{ fontSize: 26, color: "#fff" }}>{username}</Text>
                <TouchableOpacity onPress={() => setEdit(true)}>
                  <Ionicons
                    name="ellipsis-horizontal"
                    size={24}
                    color={"#fff"}
                  />
                </TouchableOpacity>
              </View>
            )}

            {edit && (
              <View style={styles.editRow}>
                <TextInput
                  placeholder="Username"
                  value={username || ""}
                  onChangeText={setUsername}
                  style={[styles.inputField]}
                />
                <TouchableOpacity onPress={onSaveUser}>
                  <Ionicons name="checkmark-outline" size={24} color={"#fff"} />
                </TouchableOpacity>
              </View>
            )}
          </View>
        )}
      </View>
      <View style={styles.actions}>
        <TouchableOpacity style={styles.btn} onPress={() => signOut()}>
          <Ionicons name="log-out" size={24} color={"#fff"} />
          <Text style={{ color: "#fff", fontSize: 18 }}>Log out</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btn}>
          <Ionicons name="person" size={24} color={"#fff"} />
          <Text style={{ color: "#fff", fontSize: 18 }}>Account</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btn}>
          <Ionicons name="bulb" size={24} color={"#fff"} />
          <Text style={{ color: "#fff", fontSize: 18 }}>Learn</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btn}>
          <Ionicons name="megaphone" size={24} color={"#fff"} />
          <Text style={{ color: "#fff", fontSize: 18, flex: 1 }}>Inbox</Text>
          <View
            style={{
              backgroundColor: Colors.primary,
              paddingHorizontal: 10,
              borderRadius: 10,
              justifyContent: "center",
            }}
          >
            <Text style={{ color: "#fff", fontSize: 12 }}>14</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  editRow: {
    flexDirection: "row",
    gap: 12,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
  },
  captureBtn: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: Colors.gray,
    alignItems: "center",
    justifyContent: "center",
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: Colors.gray,
  },
  inputField: {
    width: 200,
    height: 44,
    borderWidth: 1,
    borderColor: Colors.gray,
    borderRadius: 8,
    padding: 10,
    backgroundColor: "#fff",
  },
  actions: {
    backgroundColor: "rgba(256, 256, 256, 0.1)",
    borderRadius: 16,
    gap: 0,
    margin: 20,
  },
  btn: {
    padding: 14,
    flexDirection: "row",
    gap: 20,
  },
});

export default Account;
