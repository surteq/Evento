import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { ResizeMode, Video } from "expo-av";
import { useAssets } from "expo-asset";
import React from "react";
import { Link } from "expo-router";
import { defaultStyles } from "@/constants/Styles";
import Colors from "@/constants/Colors";

const Page = () => {
  // const [assets] = useAssets([require("@/assets/videos/kot.mp4")]);
  //const [assets] = useAssets([require("@/assets/images/OIG3.png")]);

  return (
    <View style={styles.container}>
      {/* {assets && (
        <Video
          resizeMode={ResizeMode.COVER}
          shouldPlay
          isLooping
          isMuted
          source={{ uri: assets[0].uri }}
          style={styles.video}
        />
      )} */}

      <Image
        source={require("@/assets/images/OIG3.png")}
        style={styles.image}
      ></Image>

      {/* Overlay */}
      <View style={styles.overlay}></View>

      <View style={{ padding: 20, marginTop: 60 }}>
        <Text style={styles.header}>Evento</Text>
      </View>

      <View
        style={{
          padding: 20,
          marginTop: 480,
        }}
      >
        <Text style={styles.text}>
          Create interactive maps for places and events
        </Text>
      </View>

      <View style={styles.buttons}>
        <Link
          href={"/login"}
          style={[
            defaultStyles.pillButton,
            { flex: 1, backgroundColor: Colors.dark },
          ]}
          asChild
        >
          <TouchableOpacity>
            <Text style={{ color: "white", fontSize: 22, fontWeight: "500" }}>
              Log in
            </Text>
          </TouchableOpacity>
        </Link>
        <Link
          href={"/signup"}
          style={[
            defaultStyles.pillButton,
            { flex: 1, backgroundColor: "#fff" },
          ]}
          asChild
        >
          <TouchableOpacity>
            <Text style={{ fontSize: 22, fontWeight: "500" }}>Sign up</Text>
          </TouchableOpacity>
        </Link>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  // video: {
  //   position: "absolute",
  //   width: "100%",
  //   height: "100%",
  // },
  container: {
    flex: 1,
    justifyContent: "space-between",
    position: "relative",
  },
  image: {
    position: "absolute",
    width: "100%",
    height: "100%",
  },
  overlay: {
    position: "absolute",
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Semi-transparent overlay
  },
  header: {
    fontSize: 50,
    fontWeight: "900",
    textTransform: "uppercase",
    color: Colors.lightGray,
    textAlign: "center",
    textShadowColor: "rgba(79, 54, 82, 0.9)",
    textShadowOffset: { width: 5, height: 5 },
    textShadowRadius: 10,
  },
  text: {
    fontSize: 30.5,
    fontWeight: "800",
    textTransform: "uppercase",
    color: Colors.lightGray,
    textAlign: "center",
    textShadowColor: "rgba(79, 54, 82, 0.9)",
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 10,
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 20,
    marginBottom: 60,
    paddingHorizontal: 20,
  },
});

export default Page;
