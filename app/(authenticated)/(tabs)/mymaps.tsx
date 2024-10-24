import React from "react";
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
import { useUserContext } from "@/app/contexts/UserContext";
import { Link } from "expo-router";
import { Swipeable } from "react-native-gesture-handler";
import { MapData } from "@/service/MapData";

const MyMaps = () => {
  const { maps } = useMapsContext();
  const { currentUser } = useUserContext();

  if (!currentUser) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>No user is currently logged in.</Text>
      </View>
    );
  }

  const userMaps = maps.filter((map) => map.ownerId === currentUser.id);

  const deleteMap = (id: string) => {
    // Logika do usunięcia mapy
  };

  const renderMapItem: ListRenderItem<MapData> = ({ item }) => (
    <Swipeable
      renderRightActions={() => (
        <TouchableOpacity
          style={styles.deleteButton}
          onPress={() => deleteMap(item.id)}
        >
          <Text style={styles.deleteButtonText}>Delete</Text>
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
      <Text style={styles.header}>My Maps</Text>
      <FlatList
        data={userMaps}
        renderItem={renderMapItem}
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
  errorText: {
    color: "red",
    fontSize: 16,
    textAlign: "center",
    marginTop: 20,
  },
});

export default MyMaps;
