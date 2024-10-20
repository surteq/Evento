import React from "react";
import { TouchableOpacity, StyleSheet } from "react-native";
import { EvilIcons } from "@expo/vector-icons";
import Colors from "@/constants/Colors";

type UndoButtonProps = {
  onPress: () => void;
};

const UndoButton: React.FC<UndoButtonProps> = ({ onPress }) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.undoButton}>
      <EvilIcons name="undo" size={34} color={Colors.gray} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  undoButton: {
    position: "absolute",
    top: 20,
    right: 10,
    zIndex: 100,
    width: 44,
    height: 44,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default UndoButton;
