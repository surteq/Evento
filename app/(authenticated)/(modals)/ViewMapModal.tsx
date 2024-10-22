import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Dimensions,
  Linking,
  TextInput,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Colors from "@/constants/Colors";
import { RouteProp, useRoute } from "@react-navigation/native";
import { Link, router } from "expo-router";
import { useMapsContext } from "@/app/contexts/MapsContext";
import CloseButton from "@/components/CloseButton";
import Pin from "@/components/PinProps";
import { SafeAreaView } from "react-native-safe-area-context";
import { useUserContext } from "@/app/contexts/UserContext";
import { MapData } from "@/service/MapData";

type ViewMapModalRouteParams = {
  mapId: string;
};

const { width, height } = Dimensions.get("window");

const ViewMapModal = () => {
  const { maps, updateMap } = useMapsContext();
  const route =
    useRoute<RouteProp<{ params: ViewMapModalRouteParams }, "params">>();
  const map = maps.find((m) => m.id === route.params.mapId);

  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [isEditingDescription, setIsEditingDescription] = useState(false);
  const [newTitle, setNewTitle] = useState(map?.title || "");
  const [newDescription, setNewDescription] = useState(map?.description || "");

  if (!map) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>No map data provided.</Text>
      </View>
    );
  }

  const handleSave = () => {
    if (map) {
      const updatedMap: MapData = {
        ...map,
        title: newTitle,
        description: newDescription,
      };
      updateMap(updatedMap);
      setIsEditingTitle(false);
      setIsEditingDescription(false);
    }
  };

  return (
    // <SafeAreaView style={{ flex: 1, backgroundColor: Colors.background }}>
    <View style={styles.container}>
      <CloseButton onPress={router.back} />
      <Image
        source={typeof map.image === "string" ? { uri: map.image } : map.image}
        style={styles.image}
      />
      {/* <Image source={{ uri: map.image }} style={styles.image} /> */}

      {map.pins?.map((pin) => (
        <TouchableOpacity
          key={pin.id}
          style={[styles.pin, { left: pin.position.x, top: pin.position.y }]}
        >
          <Pin type={pin.type} content={pin.content} />
        </TouchableOpacity>
      ))}

      <View style={styles.detailsContainer}>
        <View style={styles.titleContainer}>
          {isEditingTitle ? (
            <TextInput
              style={styles.input}
              value={newTitle}
              onChangeText={setNewTitle}
              onBlur={handleSave}
              autoFocus
            />
          ) : (
            <>
              <Text style={styles.header}>{map.title}</Text>
              <TouchableOpacity onPress={() => setIsEditingTitle(true)}>
                <Ionicons
                  name="pencil-outline"
                  size={18}
                  color={Colors.lightGray}
                  style={styles.editIcon}
                />
              </TouchableOpacity>
            </>
          )}
        </View>

        <View style={styles.descriptionContainer}>
          {isEditingDescription ? (
            <TextInput
              style={styles.input}
              value={newDescription}
              onChangeText={setNewDescription}
              onBlur={handleSave}
              autoFocus
            />
          ) : (
            <>
              <Text style={styles.description}>{map.description}</Text>
              <TouchableOpacity onPress={() => setIsEditingDescription(true)}>
                <Ionicons
                  name="pencil-outline"
                  size={15}
                  color={Colors.lightGray}
                  style={styles.editIcon}
                />
              </TouchableOpacity>
            </>
          )}
        </View>
        <Link
          href={{
            pathname: "/(authenticated)/(modals)/ShareMapModal",
            params: { mapId: map.id },
          }}
          asChild
        >
          <TouchableOpacity style={styles.shareButton}>
            <Ionicons
              name="share-social-outline"
              size={34}
              color={Colors.lightGray}
            />
          </TouchableOpacity>
        </Link>
        <Link
          href={{
            pathname: "/(authenticated)/(modals)/EditMapModal",
            params: { mapId: map.id },
          }}
          asChild
        >
          <TouchableOpacity style={styles.editButton}>
            <Ionicons
              name="create-outline"
              size={34}
              color={Colors.lightGray}
            />
          </TouchableOpacity>
        </Link>
      </View>
    </View>
    // </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  errorText: {
    color: "red",
    fontSize: 16,
  },
  pin: {
    position: "absolute",
    zIndex: 1,
  },
  pinText: {
    backgroundColor: Colors.lightGray,
    padding: 5,
    borderRadius: 5,
  },
  pinImage: {
    width: 50,
    height: 50,
    borderRadius: 5,
  },
  image: {
    width: width,
    height: height,
    resizeMode: "contain",
  },
  detailsContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    padding: 20,
  },
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  descriptionContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    color: Colors.lightGray,
  },
  description: {
    fontSize: 16,
    color: Colors.lightGray,
    marginTop: 0,
  },
  editIcon: {
    marginLeft: 20,
  },
  editButton: {
    position: "absolute",
    top: 32,
    right: 50,
    zIndex: 1,
  },
  shareButton: {
    position: "absolute",
    top: 32,
    right: 100,
    zIndex: 1,
    marginTop: 2,
  },
  input: {
    fontSize: 24,
    fontWeight: "bold",
    color: Colors.lightGray,
    borderBottomWidth: 1,
    borderBottomColor: Colors.primary,
  },
});

export default ViewMapModal;
