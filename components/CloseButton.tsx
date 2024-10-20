import React from "react";
import { TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Colors from "@/constants/Colors";

type CloseButtonProps = {
  onPress: () => void;
};

const CloseButton: React.FC<CloseButtonProps> = ({ onPress }) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.closeButton}>
      <Ionicons name="close-outline" size={34} color={Colors.gray} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  closeButton: {
    position: "absolute",
    top: 20,
    left: 10,
    zIndex: 100,
    width: 44,
    height: 44,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default CloseButton;
