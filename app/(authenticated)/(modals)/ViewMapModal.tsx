import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { useNavigation } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import Colors from "@/constants/Colors";
import { RouteProp, useRoute } from "@react-navigation/native";

type ViewMapModalRouteParams = {
  map: string;
};

const { width, height } = Dimensions.get("window");

const ViewMapModal = () => {
  const navigation = useNavigation();
  const route =
    useRoute<RouteProp<{ params: ViewMapModalRouteParams }, "params">>();

  if (!route.params || !route.params.map) {
    // Handle the case where there are no params
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>No map data provided.</Text>
        <TouchableOpacity
          style={styles.closeButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="close" size={34} color={Colors.lightGray} />
        </TouchableOpacity>
      </View>
    );
  }

  const map = JSON.parse(route.params.map);

  return (
    <View style={styles.container}>
      <Image source={{ uri: map.image }} style={styles.image} />
      <View style={styles.detailsContainer}>
        <Text style={styles.header}>{map.title}</Text>
        <Text style={styles.description}>{map.description}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  closeButton: {
    position: "absolute",
    top: 40,
    right: 20,
    zIndex: 1,
  },
  image: {
    width: width,
    height: height,
    resizeMode: "cover",
  },
  detailsContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    color: Colors.lightGray,
  },
  description: {
    fontSize: 16,
    color: Colors.lightGray,
    marginTop: 10,
  },
  errorText: {
    fontSize: 18,
    color: Colors.lightGray,
    textAlign: "center",
    marginTop: 20,
  },
});

export default ViewMapModal;
