import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  TextInput,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useAuth, useUser } from "@clerk/clerk-expo";
import { Ionicons } from "@expo/vector-icons";
import Colors from "@/constants/Colors";
import * as ImagePicker from "expo-image-picker";
import { useUserContext } from "@/app/contexts/UserContext";

const Account = () => {
  const { user } = useUser();
  const { signOut } = useAuth();
  const { userImage, username, setUserImage, setUsername, loading } =
    useUserContext();
  const [edit, setEdit] = useState(false);

  useEffect(() => {
    if (user?.imageUrl) {
      setUserImage(user.imageUrl);
    }
    if (user?.username) {
      setUsername(user.username);
    }
  }, [user]);

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

      await user?.setProfileImage({
        file: base64,
      });
      setUserImage(user!.imageUrl);
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={Colors.primary} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={{ alignItems: "center", paddingTop: 40 }}>
        <TouchableOpacity onPress={onCaptureImage} style={styles.captureBtn}>
          {userImage ? (
            <Image source={{ uri: userImage }} style={styles.avatar} />
          ) : (
            <Text style={{ color: "#fff", fontWeight: "500", fontSize: 16 }}>
              JK
            </Text>
          )}
        </TouchableOpacity>
        <View style={{ alignItems: "center" }}>
          {!edit && (
            <View style={styles.editRow}>
              <Text style={{ fontSize: 26, color: "#fff" }}>{username}</Text>
              <TouchableOpacity onPress={() => setEdit(true)}>
                <Ionicons name="ellipsis-horizontal" size={24} color={"#fff"} />
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
  container: {
    flex: 1,
    paddingTop: 20,
    backgroundColor: "rgba(0, 0, 0, 0.9)",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
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
    backgroundColor: Colors.lightGray,
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
