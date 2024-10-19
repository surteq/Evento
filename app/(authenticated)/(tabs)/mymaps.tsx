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

interface Map {
  id: string;
  title: string;
  description: string;
  image: string;
}

const MyMaps = () => {
  const { maps } = useMapsContext();

  const renderMapItem: ListRenderItem<Map> = ({ item }) => (
    <Link
      href={{
        pathname: "/(authenticated)/(modals)/ViewMapModal",
        params: { map: JSON.stringify(item) },
      }}
      asChild
    >
      <TouchableOpacity style={styles.mapItem}>
        <Image source={{ uri: item.image }} style={styles.mapImage} />
        <View style={styles.mapDetails}>
          <Text style={styles.mapTitle}>{item.title}</Text>
          <Text style={styles.mapDescription}>{item.description}</Text>
        </View>
        <Ionicons name="chevron-forward" size={24} color={Colors.lightGray} />
      </TouchableOpacity>
    </Link>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>My Maps</Text>
      <FlatList
        data={maps}
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
});

export default MyMaps;
