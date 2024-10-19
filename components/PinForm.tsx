import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";
import Colors from "@/constants/Colors";
import { Pin } from "@/constants/types";

interface PinFormProps {
  onAddPin: (pin: Pin) => void;
}

const PinForm: React.FC<PinFormProps> = ({ onAddPin }) => {
  const [pinType, setPinType] = useState<"info" | "image" | "link">("info");
  const [description, setDescription] = useState("");
  const [imageUri, setImageUri] = useState("");
  const [url, setUrl] = useState("");

  const handleSubmit = () => {
    let newPin: Pin;

    switch (pinType) {
      case "info":
        newPin = {
          id: Date.now().toString(),
          type: "info",
          description,
          coordinates: { x: 0, y: 0 }, // na razie na stałe, później użytkownik wybierze pozycję
        };
        break;
      case "image":
        newPin = {
          id: Date.now().toString(),
          type: "image",
          imageUri,
          coordinates: { x: 0, y: 0 },
        };
        break;
      case "link":
        newPin = {
          id: Date.now().toString(),
          type: "link",
          url,
          coordinates: { x: 0, y: 0 },
        };
        break;
      default:
        return;
    }

    onAddPin(newPin);
    // Resetowanie pól po dodaniu pinezki
    setDescription("");
    setImageUri("");
    setUrl("");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Choose Pin Type</Text>
      <View style={styles.buttonContainer}>
        <Button title="Info" onPress={() => setPinType("info")} />
        <Button title="Image" onPress={() => setPinType("image")} />
        <Button title="Link" onPress={() => setPinType("link")} />
      </View>

      {pinType === "info" && (
        <View>
          <Text style={styles.label}>Description</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter description"
            value={description}
            onChangeText={setDescription}
          />
        </View>
      )}

      {pinType === "image" && (
        <View>
          <Text style={styles.label}>Image URL</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter image URL"
            value={imageUri}
            onChangeText={setImageUri}
          />
        </View>
      )}

      {pinType === "link" && (
        <View>
          <Text style={styles.label}>Link URL</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter link URL"
            value={url}
            onChangeText={setUrl}
          />
        </View>
      )}

      <Button title="Add Pin" onPress={handleSubmit} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: Colors.background,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    color: Colors.primary,
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: Colors.lightGray,
    padding: 10,
    borderRadius: 8,
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 20,
  },
});

export default PinForm;
