import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
} from "react-native";
import Colors from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { useRouter } from "expo-router";
import { useMapsContext } from "@/app/contexts/MapsContext";

interface Pin {
  id: string;
  type: "INFO" | "IMAGE" | "LINK";
  content: string;
  position: { x: number; y: number };
}

interface Map {
  id: string;
  title: string;
  description: string;
  image: string;
  pins: Pin[];
}
const CreateMap = () => {
  const { addMap } = useMapsContext();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState<string | null>(null);
  const router = useRouter();

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      // allowsEditing: true,
      // aspect: [9, 16],
      allowsEditing: false,
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const saveMap = () => {
    const newMap: Map = {
      id: Date.now().toString(),
      title,
      description,
      image: image || "",
      pins: [],
    };
    addMap(newMap);
    setTitle("");
    setDescription("");
    setImage(null);

    router.push({
      pathname: "/(authenticated)/(modals)/ViewMapModal",
      params: { mapId: newMap.id },
    });
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Create Map</Text>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Title</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter map title"
          value={title}
          onChangeText={setTitle}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Description</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter map description"
          value={description}
          onChangeText={setDescription}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Image</Text>
        {image ? (
          <Image source={{ uri: image }} style={styles.image} />
        ) : (
          <TouchableOpacity onPress={pickImage} style={styles.imagePlaceholder}>
            <Ionicons name="image" size={40} color={Colors.lightGray} />
            <Text style={styles.imagePlaceholderText}>Pick an image</Text>
          </TouchableOpacity>
        )}
      </View>
      <TouchableOpacity onPress={saveMap} style={styles.saveButton}>
        <Text style={styles.saveButtonText}>Save Map</Text>
      </TouchableOpacity>
    </ScrollView>
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
    marginBottom: 20,
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    color: Colors.gray,
    marginBottom: 5,
  },
  input: {
    backgroundColor: Colors.lightGray,
    padding: 10,
    borderRadius: 8,
    fontSize: 16,
    color: Colors.primary,
  },
  image: {
    width: "100%",
    height: 200,
    borderRadius: 8,
  },
  imagePlaceholder: {
    backgroundColor: Colors.lightGray,
    height: 200,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  imagePlaceholderText: {
    color: Colors.gray,
    marginBottom: 30,
  },
  saveButton: {
    backgroundColor: Colors.primary,
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
  },
  saveButtonText: {
    color: Colors.lightGray,
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default CreateMap;
