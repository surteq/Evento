import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  FlatList,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { useMapsContext } from "@/app/contexts/MapsContext";
import { useUserContext } from "@/app/contexts/UserContext";
import { getFriendsByUserId } from "@/service/MockUserService";
import Colors from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import { UserData } from "@/service/UserData";
import CloseButton from "@/components/CloseButton";
import { router } from "expo-router";
import { RouteProp, useRoute } from "@react-navigation/native";

type ViewMapModalRouteParams = {
  mapId: string;
};

const ShareMapModal = () => {
  const { maps } = useMapsContext();
  const route =
    useRoute<RouteProp<{ params: ViewMapModalRouteParams }, "params">>();
  const map = maps.find((m) => m.id === route.params.mapId);
  const { currentUser } = useUserContext();
  const [friends, setFriends] = useState<UserData[]>([]);
  const [searchText, setSearchText] = useState("");
  const { shareMapWithUser } = useMapsContext();
  const [selectedUserId, setSelectedUserId] = useState(""); // Id użytkownika, z którym udostepnia sie mape

  useEffect(() => {
    if (currentUser) {
      const userFriends = getFriendsByUserId(currentUser.id);
      setFriends(userFriends);
    }
  }, [currentUser]);

  const filteredFriends = friends.filter((friend) =>
    friend.username.toLowerCase().includes(searchText.toLowerCase())
  );
  if (!map) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>No map data provided.</Text>
      </View>
    );
  }
  const handleShare = (userId: string) => {
    if (userId) {
      shareMapWithUser(map.id, userId); // Udostępnienie mapy userowi
    }
  };

  const renderFriendItem = ({ item }: { item: UserData }) => (
    <View style={styles.friendContainer}>
      <View style={styles.friendDetails}>
        <Image
          source={require("@/assets/images/profileImage.png")}
          style={styles.profileImage}
        />
        <Text style={styles.friendName}>{item.username}</Text>
      </View>
      <TouchableOpacity
        style={styles.sendMapButton}
        onPress={() => handleShare(item.id)}
      >
        <Ionicons name="send" size={24} color={Colors.primary} />
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <CloseButton onPress={router.back} />

      <Text style={styles.header}>Share to</Text>

      <View style={styles.mapPreviewContainer}>
        {map && (
          <>
            {/* <Image source={{ uri: map.image }} style={styles.mapImage} /> */}
            <Image
              source={
                typeof map?.image === "string" ? { uri: map.image } : map?.image
              }
              style={styles.mapImage}
            />
            <View style={styles.mapDetails}>
              <Text style={styles.mapTitle}>{map.title}</Text>
              <Text style={styles.mapDescription}>{map.description}</Text>
            </View>
          </>
        )}
      </View>

      <View style={styles.searchSection}>
        <Ionicons name="search" size={20} color={Colors.dark} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search"
          value={searchText}
          onChangeText={setSearchText}
        />
      </View>

      <FlatList
        data={filteredFriends}
        keyExtractor={(item) => item.id}
        renderItem={renderFriendItem}
        contentContainerStyle={styles.friendList}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    marginTop: 20,
    backgroundColor: Colors.background,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    color: Colors.primary,
    marginBottom: 20,
    textAlign: "center",
  },
  mapPreviewContainer: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.lightGray,
    borderRadius: 10,
    padding: 10,
    marginBottom: 20,
  },
  mapImage: {
    width: 100,
    height: 100,
    borderRadius: 10,
    marginBottom: 5,
  },
  mapDetails: { alignItems: "center" },
  mapTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: Colors.dark,
  },
  mapDescription: {
    fontSize: 14,
    color: Colors.gray,
  },
  searchSection: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.lightGray,
    borderRadius: 20,
    padding: 10,
    marginBottom: 20,
  },
  searchInput: {
    flex: 1,
    paddingLeft: 10,
    color: Colors.dark,
  },
  friendList: {
    paddingBottom: 20,
  },
  friendContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: Colors.lightGray,
  },
  friendName: {
    fontSize: 16,
    fontWeight: "bold",
    color: Colors.dark,
  },
  friendDetails: {
    flexDirection: "row",
    alignItems: "center",
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 20,
  },
  sendMapButton: {
    alignSelf: "center",
    paddingVertical: 8,
    paddingHorizontal: 8,
  },
  errorText: {
    color: "red",
    fontSize: 16,
  },
});

export default ShareMapModal;
