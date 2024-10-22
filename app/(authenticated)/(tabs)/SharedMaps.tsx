import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
  ListRenderItem,
} from "react-native";
import Colors from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import { useMapsContext } from "@/app/contexts/MapsContext";
import { Link } from "expo-router";
import { Swipeable } from "react-native-gesture-handler";
import { useUserContext } from "@/app/contexts/UserContext";
import { MapData } from "@/service/MapData";

const SharedMaps = () => {
  const { maps } = useMapsContext();
  const { currentUser } = useUserContext();
  if (!currentUser) {
    return <Text>No current user found.</Text>;
  }
  const sharedMaps = maps.filter((map) =>
    map.sharedWith?.includes(currentUser.id)
  );
  const renderSharedMapItem: ListRenderItem<MapData> = ({ item }) => (
    <Swipeable
      renderRightActions={() => (
        <TouchableOpacity style={styles.deleteButton} onPress={() => {}}>
          <Text style={styles.deleteButtonText}>Remove</Text>
        </TouchableOpacity>
      )}
    >
      <Link
        href={{
          pathname: "/(authenticated)/(modals)/ViewMapModal",
          params: { mapId: item.id },
        }}
        asChild
      >
        <TouchableOpacity style={styles.mapItem}>
          <Image
            source={
              typeof item.image === "string" ? { uri: item.image } : item.image
            }
            style={styles.mapImage}
          />
          <View style={styles.mapDetails}>
            <Text style={styles.mapTitle}>{item.title}</Text>
            <Text style={styles.mapDescription}>{item.description}</Text>
          </View>
          <Ionicons name="chevron-forward" size={24} color={Colors.lightGray} />
        </TouchableOpacity>
      </Link>
    </Swipeable>
  );
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Shared Maps</Text>
      <FlatList
        data={sharedMaps}
        renderItem={renderSharedMapItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.mapList}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    padding: 20,
    paddingTop: 100,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    color: Colors.primary,
    marginBottom: 10,
  },
  mapList: {
    paddingBottom: 20,
  },
  mapItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.lightGray,
    borderRadius: 10,
    padding: 10,
    marginBottom: 20,
  },
  mapImage: {
    width: 50,
    height: 50,
    borderRadius: 10,
    borderWidth: 3,
    borderColor: Colors.gray,
    marginRight: 10,
  },
  mapDetails: {
    flex: 1,
  },
  mapTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: Colors.gray,
  },
  mapDescription: {
    fontSize: 14,
    color: Colors.gray,
  },
  deleteButton: {
    justifyContent: "center",
    alignItems: "center",
    width: 75,
    backgroundColor: "red",
    borderRadius: 10,
    marginRight: 10,
    height: 70,
  },
  deleteButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});

export default SharedMaps;
