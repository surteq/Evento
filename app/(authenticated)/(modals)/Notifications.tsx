import React from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { useNotificationsContext } from "@/app/contexts/NotificationsContext";
import { useRouter } from "expo-router";
import { NotificationData } from "@/service/NotificationData";
import CloseButton from "@/components/CloseButton";
import Colors from "@/constants/Colors";

const NotificationsModal = () => {
  const { notifications, markAsRead } = useNotificationsContext();
  const router = useRouter();

  const renderNotification = ({ item }: { item: NotificationData }) => (
    <TouchableOpacity
      onPress={() => {
        if (item.mapId) {
          router.push({
            pathname: "/(authenticated)/(modals)/ViewMapModal",
            params: { mapId: item.mapId },
          });
        }
        markAsRead(item.id);
      }}
      style={styles.notificationItem}
    >
      <Text>{item.message}</Text>
      <Text>{new Date(item.timestamp).toLocaleString()}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <CloseButton onPress={router.back} />
      <Text style={styles.header}>Notifications</Text>
      <FlatList
        data={notifications}
        renderItem={renderNotification}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "white",
    marginTop: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 40,
    color: Colors.primary,
  },
  notificationItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
});

export default NotificationsModal;
