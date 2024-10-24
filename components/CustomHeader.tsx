import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Image,
} from "react-native";
import React from "react";
import Colors from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import { Link } from "expo-router";
import { useUserContext } from "@/app/contexts/UserContext";
// import { useSafeAreaInsets } from "react-native-safe-area-context";
import FontAwesome from "@expo/vector-icons/FontAwesome";

const CustomHeader = () => {
  //   const { top } = useSafeAreaInsets();
  const { userImage } = useUserContext();
  return (
    <View
      style={{ paddingTop: 40, backgroundColor: "rgba(245, 245, 245, 0.99)" }}
    >
      <View style={styles.container}>
        <Link href="/(authenticated)/(modals)/account" asChild>
          <TouchableOpacity style={styles.roundBtn}>
            {userImage ? (
              <Image source={{ uri: userImage }} style={styles.profileImage} />
            ) : (
              <FontAwesome name="user-o" size={24} color={Colors.lightGray} />
            )}
          </TouchableOpacity>
        </Link>
        <View style={styles.logoSection}>
          <Text style={styles.header}>Evento</Text>
        </View>
        {/* <View style={styles.searchSection}>
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
          />
        </View> */}
        <Link
          style={styles.circle}
          href="/(authenticated)/(modals)/NotificationsModal"
          asChild
        >
          <TouchableOpacity>
            <FontAwesome name="comment" size={20} color={"#8A2BE2"} />
          </TouchableOpacity>
        </Link>
        <Link
          style={styles.circle}
          href={"/(authenticated)/(modals)/AddFriendsModal"}
          asChild
        >
          <TouchableOpacity>
            <Ionicons name="person-add" size={20} color={"#8A2BE2"} />
          </TouchableOpacity>
        </Link>

        {/* <View style={styles.circle}>
          <Ionicons name="card" size={20} color={Colors.dark} />
        </View> */}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "rgba(245, 245, 245, 0.99)",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
    height: 60,
    paddingHorizontal: 20,
  },
  header: {
    width: "100%",
    fontSize: 40,
    fontWeight: "900",
    textTransform: "uppercase",
    color: Colors.primary,
    textAlign: "center",
    textShadowColor: "rgba(207, 156, 214, 0.9)",
    textShadowOffset: { width: 5, height: 5 },
    textShadowRadius: 10,
    marginBottom: 10,
    marginLeft: 20,
  },
  roundBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.gray,
    justifyContent: "center",
    alignItems: "center",
  },
  logoSection: {
    flex: 1,
    flexDirection: "row",
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  searchIcon: {
    padding: 10,
  },
  input: {
    flex: 1,
    paddingTop: 10,
    paddingRight: 10,
    paddingBottom: 10,
    paddingLeft: 0,
    color: Colors.dark,
  },
  circle: {
    width: 40,
    height: 40,
    borderRadius: 30,
    backgroundColor: Colors.lightGray,
    justifyContent: "center",
    alignItems: "center",
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
});

export default CustomHeader;
