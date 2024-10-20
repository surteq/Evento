import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
  Dimensions,
  Linking,
  Alert,
} from "react-native";
import Colors from "@/constants/Colors";
import * as ImagePicker from "expo-image-picker";
import { Audio } from "expo-av";
import { RouteProp, useRoute } from "@react-navigation/native";
import { useMapsContext } from "@/app/contexts/MapsContext";
import { useRouter } from "expo-router";
import CloseButton from "@/components/CloseButton";
import Pin from "@/components/PinProps";
import UndoButton from "@/components/UndoButton";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";

interface PinData {
  id: string;
  type: "INFO" | "IMAGE" | "LINK" | "AUDIO";
  content: string;
  position: { x: number; y: number };
}

interface Map {
  id: string;
  title: string;
  description: string;
  image: string;
  pins?: PinData[];
}

type EditMapModalRouteParams = {
  mapId: string;
};

const { width, height } = Dimensions.get("window");

const EditMapModal = () => {
  const { maps, updateMapPins } = useMapsContext();
  const route =
    useRoute<RouteProp<{ params: EditMapModalRouteParams }, "params">>();
  const router = useRouter();

  const map = maps.find((m) => m.id === route.params.mapId);

  const [pinType, setPinType] = useState<"INFO" | "IMAGE" | "LINK" | "AUDIO">(
    "INFO"
  );
  const [pinContent, setPinContent] = useState<string | null>("");
  const [imageUri, setImageUri] = useState<string | null>(null);
  const [audioUri, setAudioUri] = useState<string | null>(null);
  const [recording, setRecording] = useState<Audio.Recording | null>(null);
  const [history, setHistory] = useState<PinData[][]>([
    ...(map?.pins ? [map.pins] : [[]]),
  ]);
  const [isDeleteMode, setIsDeleteMode] = useState(false);

  const toggleDeleteMode = () => {
    setIsDeleteMode((prevMode) => !prevMode);
  };

  const deletePin = (id: string) => {
    const map = maps.find((m) => m.id === route.params.mapId);
    const updatedPins = map?.pins?.filter((pin) => pin.id !== id) || [];
    updateMapPins(map!.id, updatedPins);
  };

  const addPin = (x: number, y: number) => {
    if (pinType !== "IMAGE" && pinContent?.trim() === "") {
      Alert.alert("Error", "Please enter content for the pin.");
      return;
    }
    if (pinType == "IMAGE" && !imageUri) {
      Alert.alert("No Image", "Please upload or select an image first.");
      return;
    }

    const newPin: PinData = {
      id: Date.now().toString(),
      type: pinType,
      content:
        pinType === "IMAGE"
          ? imageUri || ""
          : pinType === "AUDIO"
          ? audioUri || ""
          : pinContent || "",
      position: { x: x - 20, y: y - 40 },
    };
    const updatedPins = [...(map?.pins || []), newPin];
    updateMapPins(map!.id, updatedPins);
    setHistory((prevHistory) => [...prevHistory, updatedPins]);
    console.log(`New pin added at position: X: ${x}, Y: ${y}`);
    console.log(newPin);
    setPinContent("");
    setImageUri(null);
    setAudioUri(null);
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: false,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImageUri(result.assets[0].uri);
    }
  };

  const startRecording = async () => {
    try {
      console.log("Requesting permissions..");
      const permission = await Audio.requestPermissionsAsync();

      if (permission.status !== "granted") {
        Alert.alert("Permission to access audio was denied");
        return;
      }

      console.log("Starting recording..");
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      });

      const { recording } = await Audio.Recording.createAsync(
        Audio.RecordingOptionsPresets.HIGH_QUALITY
      );
      setRecording(recording);
      console.log("Recording started");
    } catch (err) {
      console.error("Failed to start recording", err);
    }
  };

  const stopRecording = async () => {
    if (recording) {
      console.log("Stopping recording..");
      await recording.stopAndUnloadAsync();
      const uri = recording.getURI();
      setAudioUri(uri);
      setPinContent(uri);
      console.log("Recording stopped and stored at", uri);
      setRecording(null);
    } else {
      console.warn("No active recording to stop");
    }
  };

  const handleMapPress = (e: any) => {
    const x = e.nativeEvent.locationX;
    const y = e.nativeEvent.locationY;
    addPin(x, y);
  };

  const undoLastPin = () => {
    if (history.length > 1) {
      const newHistory = [...history];
      newHistory.pop();
      const previousPins = newHistory[newHistory.length - 1];
      setHistory(newHistory);
      updateMapPins(map!.id, previousPins);
    } else {
      Alert.alert("No more actions to undo.");
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.background }}>
      <View style={styles.container}>
        <CloseButton onPress={router.back} />
        <UndoButton onPress={undoLastPin} />
        <TouchableOpacity
          onPress={toggleDeleteMode}
          style={styles.deleteToggleButton}
        >
          <Ionicons
            name="trash"
            size={24}
            color={isDeleteMode ? Colors.primary : Colors.gray}
          />
          <Text>{isDeleteMode ? "Exit Delete Mode" : "Delete Mode"}</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={handleMapPress}>
          <Image source={{ uri: map?.image }} style={styles.image} />
        </TouchableOpacity>

        {map?.pins?.map((pin: PinData) => (
          <TouchableOpacity
            key={pin.id}
            style={[styles.pin, { left: pin.position.x, top: pin.position.y }]}
            onPress={() => {
              if (pin.type === "LINK") {
                Linking.openURL(pin.content).catch((err) =>
                  console.error("Failed to open URL:", err)
                );
              }
            }}
          >
            <Pin
              type={pin.type}
              content={pin.content}
              isDeleteMode={isDeleteMode}
              onDelete={() => deletePin(pin.id)}
            />
          </TouchableOpacity>
        ))}

        <View style={styles.pinPanel}>
          <Text style={styles.header}>Choose Pin Type</Text>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={[styles.button, pinType === "INFO" && styles.activeButton]}
              onPress={() => setPinType("INFO")}
            >
              <Text style={styles.buttonText}>INFO</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.button,
                pinType === "IMAGE" && styles.activeButton,
              ]}
              onPress={() => setPinType("IMAGE")}
            >
              <Text style={styles.buttonText}>IMAGE</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, pinType === "LINK" && styles.activeButton]}
              onPress={() => setPinType("LINK")}
            >
              <Text style={styles.buttonText}>LINK</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.button,
                pinType === "AUDIO" && styles.activeButton,
              ]}
              onPress={() => setPinType("AUDIO")}
            >
              <Text style={styles.buttonText}>AUDIO</Text>
            </TouchableOpacity>
          </View>

          {pinType === "INFO" && (
            <TextInput
              style={styles.input}
              placeholder="Enter text for pin"
              value={pinContent || ""}
              onChangeText={setPinContent}
            />
          )}
          {pinType === "IMAGE" && (
            <TouchableOpacity onPress={pickImage} style={styles.imagePicker}>
              <Text style={styles.buttonText}>
                {imageUri ? "Change Image" : "Pick Image"}
              </Text>
            </TouchableOpacity>
          )}
          {pinType === "LINK" && (
            <TextInput
              style={styles.input}
              placeholder="Enter link URL"
              value={pinContent || ""}
              onChangeText={setPinContent}
            />
          )}
          {pinType === "AUDIO" && (
            <TouchableOpacity
              style={[styles.button]}
              onPress={() => {
                if (recording) {
                  stopRecording();
                } else {
                  startRecording();
                }
              }}
            >
              <Text style={styles.buttonText}>
                {recording ? "Stop Recording" : "Record Audio"}
              </Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  image: {
    width: width,
    height: height,
    resizeMode: "contain",
  },
  deleteToggleButton: {
    position: "absolute",
    top: 32,
    right: 60,
    flexDirection: "row",
    alignItems: "center",
    zIndex: 100,
  },
  pinPanel: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    padding: 20,
  },
  pin: {
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
  },
  header: {
    fontSize: 18,
    color: Colors.lightGray,
    textAlign: "center",
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 20,
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: Colors.primary,
    borderRadius: 8,
  },
  activeButton: {
    backgroundColor: Colors.secondary,
  },
  buttonText: {
    color: Colors.lightGray,
    fontSize: 16,
  },
  input: {
    backgroundColor: Colors.lightGray,
    borderRadius: 8,
    padding: 10,
    marginBottom: 20,
  },
  imagePicker: {
    backgroundColor: Colors.primary,
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 16.5,
    marginLeft: "20%",
    marginRight: "20%",
  },
});

export default EditMapModal;
