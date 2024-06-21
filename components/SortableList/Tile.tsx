import React from "react";
import { StyleSheet, View, Text } from "react-native";

import { SIZE } from "./Config";
import Colors from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

const styles = StyleSheet.create({
  container: {
    width: SIZE - 20,
    height: 150,
    backgroundColor: "white",
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.25,
    shadowRadius: 2,
    elevation: 5,
    padding: 14,
    alignSelf: "center",
  },
});
interface TileProps {
  id: string;
  onLongPress: () => void;
}

const Tile = ({ id }: TileProps) => {
  if (id === "events") {
    return (
      <View
        style={[
          styles.container,
          { alignItems: "center", justifyContent: "center" },
        ]}
        pointerEvents="none"
      >
        <Text style={{ color: Colors.gray, fontWeight: "bold", fontSize: 18 }}>
          Events
        </Text>
        <MaterialIcons
          name="event"
          size={50}
          color={Colors.primaryMuted}
          style={{ marginTop: 20, alignSelf: "center" }}
        />
      </View>
    );
  }

  if (id === "places") {
    return (
      <View
        style={[
          styles.container,
          { alignItems: "center", justifyContent: "center" },
        ]}
        pointerEvents="none"
      >
        <Text style={{ color: Colors.gray, fontWeight: "bold", fontSize: 18 }}>
          Places
        </Text>
        <MaterialIcons
          name="my-location"
          size={50}
          color={Colors.primaryMuted}
          style={{ marginTop: 20, alignSelf: "center" }}
        />
      </View>
    );
  }

  if (id === "favorites") {
    return (
      <View
        style={[
          styles.container,
          { alignItems: "center", justifyContent: "center" },
        ]}
        pointerEvents="none"
      >
        <Text style={{ color: Colors.gray, fontWeight: "bold", fontSize: 18 }}>
          Favorites
        </Text>
        <MaterialIcons
          name="favorite"
          size={50}
          color={Colors.primaryMuted}
          style={{ marginTop: 20, alignSelf: "center" }}
        />
      </View>
    );
  }

  if (id === "nearby") {
    return (
      <View
        style={[
          styles.container,
          { alignItems: "center", justifyContent: "center" },
        ]}
        pointerEvents="none"
      >
        <Text style={{ color: Colors.gray, fontWeight: "bold", fontSize: 18 }}>
          Nearby
        </Text>
        <Ionicons
          name="navigate-circle-outline"
          size={50}
          color={Colors.primaryMuted}
          style={{ marginTop: 20, alignSelf: "center" }}
        />
      </View>
    );
  }
};

export default Tile;
