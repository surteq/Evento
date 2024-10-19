// import {
//   View,
//   Text,
//   TouchableOpacity,
//   StyleSheet,
//   TextInput,
//   Image,
// } from "react-native";
// import React, { useState } from "react";
// import Colors from "@/constants/Colors";
// import { Ionicons } from "@expo/vector-icons";
// import { Link, router } from "expo-router";
// import { useUserContext } from "@/app/contexts/UserContext";
// // import { useSafeAreaInsets } from "react-native-safe-area-context";
// import FontAwesome from "@expo/vector-icons/FontAwesome";
// import { useMapsContext } from "@/app/contexts/MapsContext";
// import { RouteProp, useRoute } from "@react-navigation/native";

// type ViewMapModalRouteParams = {
//   mapId: string;
// };

// const CustomHeaderMap = () => {
//   //   const { top } = useSafeAreaInsets();
//   const { userImage } = useUserContext();
//   const { maps, updateMap } = useMapsContext();
//   const route =
//     useRoute<RouteProp<{ params: ViewMapModalRouteParams }, "params">>();
//   const map = maps.find((m) => m.id === route.params.mapId);

//   const [isEditingTitle, setIsEditingTitle] = useState(false);
//   const [isEditingDescription, setIsEditingDescription] = useState(false);
//   const [newTitle, setNewTitle] = useState(map?.title || "");
//   const [newDescription, setNewDescription] = useState(map?.description || "");

//   const handleSave = () => {
//     if (map) {
//       const updatedMap = {
//         ...map,
//         title: newTitle,
//         description: newDescription,
//       };
//       updateMap(updatedMap);
//       setIsEditingTitle(false);
//       setIsEditingDescription(false);
//     }
//   };
//   return (
//     <View>
//       <View
//         style={{
//           paddingTop: 20,
//           backgroundColor: "rgba(245, 245, 245, 0.99)",
//         }}
//       ></View>
//       <View style={styles.container}>
//         <TouchableOpacity onPress={router.back}>
//           <Ionicons name="close-outline" size={34} color={Colors.dark} />
//         </TouchableOpacity>
//         <View style={styles.detailsContainer}>
//           <View style={styles.titleContainer}>
//             {isEditingTitle ? (
//               <TextInput
//                 style={styles.input}
//                 value={newTitle}
//                 onChangeText={setNewTitle}
//                 onBlur={handleSave} // Save changes on blur (when editing is finished)
//                 autoFocus
//               />
//             ) : (
//               <>
//                 <Text style={styles.header}>{map?.title}</Text>
//                 <TouchableOpacity onPress={() => setIsEditingTitle(true)}>
//                   <Ionicons
//                     name="pencil-outline"
//                     size={18}
//                     color={Colors.lightGray}
//                     style={styles.editIcon}
//                   />
//                 </TouchableOpacity>
//               </>
//             )}
//           </View>

//           <View style={styles.descriptionContainer}>
//             {isEditingDescription ? (
//               <TextInput
//                 style={styles.input}
//                 value={newDescription}
//                 onChangeText={setNewDescription}
//                 onBlur={handleSave}
//                 autoFocus
//               />
//             ) : (
//               <>
//                 <Text style={styles.description}>{map?.description}</Text>
//                 <TouchableOpacity onPress={() => setIsEditingDescription(true)}>
//                   <Ionicons
//                     name="pencil-outline"
//                     size={15}
//                     color={Colors.lightGray}
//                     style={styles.editIcon}
//                   />
//                 </TouchableOpacity>
//               </>
//             )}
//           </View>

//           <Link
//             href={{
//               pathname: "/(authenticated)/(modals)/EditMapModal",
//               params: { mapId: map?.id },
//             }}
//             asChild
//           >
//             <TouchableOpacity style={styles.editButton}>
//               <Ionicons
//                 name="create-outline"
//                 size={34}
//                 color={Colors.lightGray}
//               />
//             </TouchableOpacity>
//           </Link>
//         </View>
//       </View>
//       {/* <Link href="/(authenticated)/(modals)/account" asChild>
//         <TouchableOpacity style={styles.roundBtn}>
//           {userImage ? (
//             <Image source={{ uri: userImage }} style={styles.profileImage} />
//           ) : (
//             <FontAwesome name="user-o" size={24} color={Colors.lightGray} />
//           )}
//         </TouchableOpacity>
//       </Link> */}
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     backgroundColor: "rgba(0, 0, 0, 0.5)",
//     flexDirection: "row",
//     justifyContent: "center",
//     alignItems: "center",
//     gap: 10,
//     height: 60,
//     paddingHorizontal: 20,
//   },
//   roundBtn: {
//     width: 40,
//     height: 40,
//     borderRadius: 20,
//     backgroundColor: Colors.gray,
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   searchSection: {
//     flex: 1,
//     flexDirection: "row",
//     backgroundColor: Colors.lightGray,
//     borderRadius: 30,
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   searchIcon: {
//     padding: 10,
//   },
//   // input: {
//   //   flex: 1,
//   //   paddingTop: 10,
//   //   paddingRight: 10,
//   //   paddingBottom: 10,
//   //   paddingLeft: 0,
//   //   color: Colors.dark,
//   // },
//   circle: {
//     width: 40,
//     height: 40,
//     borderRadius: 30,
//     backgroundColor: Colors.lightGray,
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   profileImage: {
//     width: 40,
//     height: 40,
//     borderRadius: 20,
//   },
//   detailsContainer: {
//     position: "absolute",
//     bottom: 0,
//     left: 0,
//     right: 0,
//     backgroundColor: "rgba(0, 0, 0, 0.5)",
//     padding: 20,
//   },
//   titleContainer: {
//     flexDirection: "row",
//     alignItems: "center", // Keep icon aligned with text
//   },
//   descriptionContainer: {
//     flexDirection: "row",
//     alignItems: "center", // Keep icon aligned with text
//   },
//   header: {
//     fontSize: 24,
//     fontWeight: "bold",
//     color: Colors.lightGray,
//   },
//   description: {
//     fontSize: 16,
//     color: Colors.lightGray,
//     marginTop: 0,
//   },
//   editIcon: {
//     marginLeft: 20, // Adjust margin to control distance between text and icon
//   },
//   editButton: {
//     position: "absolute",
//     top: 32,
//     right: 50,
//     zIndex: 1,
//   },
//   input: {
//     fontSize: 24,
//     fontWeight: "bold",
//     color: Colors.lightGray,
//     borderBottomWidth: 1,
//     borderBottomColor: Colors.primary,
//   },
// });

// export default CustomHeaderMap;

import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Image,
} from "react-native";
import React, { useState } from "react";
import Colors from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import { Link, router } from "expo-router";
import { useUserContext } from "@/app/contexts/UserContext";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useMapsContext } from "@/app/contexts/MapsContext";
import { RouteProp, useRoute } from "@react-navigation/native";

type ViewMapModalRouteParams = {
  mapId: string;
};

const CustomHeaderMap = () => {
  const { userImage } = useUserContext();
  const { maps, updateMap } = useMapsContext();
  const route =
    useRoute<RouteProp<{ params: ViewMapModalRouteParams }, "params">>();
  const map = maps.find((m) => m.id === route.params.mapId);

  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [isEditingDescription, setIsEditingDescription] = useState(false);
  const [newTitle, setNewTitle] = useState(map?.title || "");
  const [newDescription, setNewDescription] = useState(map?.description || "");

  const handleSave = () => {
    if (map) {
      const updatedMap = {
        ...map,
        title: newTitle,
        description: newDescription,
      };
      updateMap(updatedMap);
      setIsEditingTitle(false);
      setIsEditingDescription(false);
    }
  };

  return (
    <View>
      <View
        style={{
          paddingTop: 40,
          backgroundColor: "rgba(245, 245, 245, 0.99)",
        }}
      ></View>
      <View style={styles.headerContainer}>
        {/* Ikona X po lewej stronie */}
        <TouchableOpacity onPress={router.back} style={styles.closeButton}>
          <Ionicons name="close-outline" size={34} color={Colors.lightGray} />
        </TouchableOpacity>

        {/* Tytuł i opis w środku */}
        <View style={styles.centerContainer}>
          <View style={styles.titleContainer}>
            {isEditingTitle ? (
              <TextInput
                style={styles.input}
                value={newTitle}
                onChangeText={setNewTitle}
                onBlur={handleSave}
                autoFocus
              />
            ) : (
              <>
                <Text style={styles.header}>{map?.title}</Text>
                <TouchableOpacity onPress={() => setIsEditingTitle(true)}>
                  <Ionicons
                    name="pencil-outline"
                    size={18}
                    color={Colors.lightGray}
                    style={styles.editIcon}
                  />
                </TouchableOpacity>
              </>
            )}
          </View>

          <View style={styles.descriptionContainer}>
            {isEditingDescription ? (
              <TextInput
                style={styles.input}
                value={newDescription}
                onChangeText={setNewDescription}
                onBlur={handleSave}
                autoFocus
              />
            ) : (
              <>
                <Text style={styles.description}>{map?.description}</Text>
                <TouchableOpacity onPress={() => setIsEditingDescription(true)}>
                  <Ionicons
                    name="pencil-outline"
                    size={15}
                    color={Colors.lightGray}
                    style={styles.editIcon}
                  />
                </TouchableOpacity>
              </>
            )}
          </View>
        </View>

        {/* Ikona Edit po prawej stronie */}
        <Link
          href={{
            pathname: "/(authenticated)/(modals)/EditMapModal",
            params: { mapId: map?.id },
          }}
          asChild
        >
          <TouchableOpacity style={styles.editButton}>
            <Ionicons
              name="create-outline"
              size={34}
              color={Colors.lightGray}
            />
          </TouchableOpacity>
        </Link>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingTop: 10,
    paddingHorizontal: 10,
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    height: 60,
  },
  closeButton: {
    flex: 1,
    justifyContent: "center",
    alignItems: "flex-start",
  },
  centerContainer: {
    flex: 5,
    alignItems: "center", // Wyśrodkowuje tytuł i opis
    marginBottom: 20,
  },
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  descriptionContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    color: Colors.lightGray,
  },
  description: {
    fontSize: 16,
    color: Colors.lightGray,
    marginTop: 0,
  },
  editIcon: {
    marginLeft: 8,
  },
  editButton: {
    flex: 1,
    justifyContent: "center",
    alignItems: "flex-end",
  },
  input: {
    fontSize: 24,
    fontWeight: "bold",
    color: Colors.lightGray,
    borderBottomWidth: 1,
    borderBottomColor: Colors.primary,
  },
});

export default CustomHeaderMap;
