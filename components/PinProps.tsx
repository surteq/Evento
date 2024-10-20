import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Modal,
  Linking,
} from "react-native";
import { Audio } from "expo-av";
import Colors from "@/constants/Colors";

type PinProps = {
  type: "INFO" | "IMAGE" | "LINK" | "AUDIO";
  content: string;
  onDelete?: () => void;
  isDeleteMode?: boolean;
};

const Pin = ({ type, content, onDelete, isDeleteMode = false }: PinProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [sound, setSound] = useState<Audio.Sound | null>(null);

  const openPin = () => {
    setIsOpen(true);
  };

  const closePin = () => {
    setIsOpen(false);
  };

  const handlePress = () => {
    if (onDelete && isDeleteMode) {
      onDelete();
    } else {
      openPin();
    }
  };

  const playAudio = async () => {
    try {
      const { sound } = await Audio.Sound.createAsync({ uri: content });
      setSound(sound);
      await sound.playAsync();
    } catch (error) {
      console.log("Error playing audio:", error);
    }
  };

  return (
    <View style={styles.pinContainer}>
      <TouchableOpacity onPress={handlePress}>
        <View style={styles.pinHead}>
          {type === "IMAGE" && (
            <Image source={{ uri: content }} style={styles.pinImage} />
          )}
          {type === "INFO" && <Text style={styles.pinText}>info</Text>}
          {type === "LINK" && <Text style={styles.pinText}>🔗</Text>}
          {type === "AUDIO" && <Text style={styles.pinText}>🎵</Text>}
        </View>

        <View style={styles.pinBody} />
      </TouchableOpacity>

      {isOpen && (
        <Modal
          transparent={true}
          visible={isOpen}
          animationType="fade"
          onRequestClose={closePin}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              {type === "IMAGE" && (
                <Image source={{ uri: content }} style={styles.modalImage} />
              )}
              {type === "INFO" && (
                <Text style={styles.modalText}>{content}</Text>
              )}
              {type === "LINK" && (
                <TouchableOpacity onPress={() => Linking.openURL(content)}>
                  <Text style={styles.modalLink}>Open Link</Text>
                </TouchableOpacity>
              )}
              {type === "AUDIO" && (
                <TouchableOpacity
                  onPress={playAudio}
                  style={styles.audioButton}
                >
                  <Text style={styles.audioText}>Play Audio</Text>
                </TouchableOpacity>
              )}
              <TouchableOpacity onPress={closePin}>
                <Text style={styles.closeButton}>Close</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  pinContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  pinHead: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: Colors.primary,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderColor: Colors.dark,
  },
  pinBody: {
    width: 4,
    height: 20,
    backgroundColor: Colors.dark,
    marginTop: -5,
    marginLeft: 13,
  },
  pinText: {
    color: Colors.lightGray,
    fontSize: 10,
  },
  pinImage: {
    width: 26,
    height: 26,
    borderRadius: 13,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: Colors.background,
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  modalText: {
    fontSize: 16,
    color: Colors.dark,
  },
  modalImage: {
    width: 200,
    height: 200,
    borderRadius: 10,
    marginBottom: 10,
  },
  modalLink: {
    fontSize: 16,
    color: Colors.primary,
    textDecorationLine: "underline",
    marginBottom: 10,
  },
  audioButton: {
    backgroundColor: Colors.primary,
    padding: 10,
    borderRadius: 5,
  },
  audioText: {
    fontSize: 16,
    color: Colors.lightGray,
  },
  closeButton: {
    fontSize: 14,
    color: Colors.gray,
    marginTop: 10,
  },
});

export default Pin;
