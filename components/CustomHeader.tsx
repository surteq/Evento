import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
} from "react-native";
import React from "react";
import Colors from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import { Link } from "expo-router";
// import { useSafeAreaInsets } from "react-native-safe-area-context";

const CustomHeader = () => {
  //   const { top } = useSafeAreaInsets();
  return (
    <View
      style={{ paddingTop: 40, backgroundColor: "rgba(245, 245, 245, 0.99)" }}
    >
      <View style={styles.container}>
        <Link href="/(authenticated)/(modals)/account" asChild>
          <TouchableOpacity style={styles.roundBtn}>
            <Text style={{ color: "#fff", fontWeight: "500", fontSize: 16 }}>
              JK
            </Text>
          </TouchableOpacity>
        </Link>
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
          />
        </View>

        <View style={styles.circle}>
          <Ionicons name="stats-chart" size={20} color={Colors.dark} />
        </View>

        <View style={styles.circle}>
          <Ionicons name="card" size={20} color={Colors.dark} />
        </View>
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
  roundBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.gray,
    justifyContent: "center",
    alignItems: "center",
  },
  searchSection: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: Colors.lightGray,
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
});

export default CustomHeader;
