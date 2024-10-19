// import React from "react";
// import {
//   View,
//   Text,
//   StyleSheet,
//   Image,
//   TouchableOpacity,
//   Dimensions,
//   Linking,
// } from "react-native";
// import { Ionicons } from "@expo/vector-icons";
// import Colors from "@/constants/Colors";
// import { RouteProp, useRoute } from "@react-navigation/native";
// import { Link, router, Stack, useNavigation } from "expo-router"; // Używamy Link z expo-router

// type ViewMapModalRouteParams = {
//   map: string;
// };

// const { width, height } = Dimensions.get("window");

// const ViewMapModal = () => {
//   const navigation = useNavigation();
//   const route =
//     useRoute<RouteProp<{ params: ViewMapModalRouteParams }, "params">>();

//   if (!route.params || !route.params.map) {
//     return (
//       <View style={styles.container}>
//         <Text style={styles.errorText}>No map data provided.</Text>
//         <TouchableOpacity
//           style={styles.closeButton}
//           onPress={() => navigation.goBack()}
//         >
//           <Ionicons name="close" size={34} color={Colors.lightGray} />
//         </TouchableOpacity>
//       </View>
//     );
//   }

//   const map = JSON.parse(route.params.map);

//   const move = () => {
//     router.push({
//       pathname: "/(authenticated)/(modals)/EditMapModal",
//       params: { map: JSON.stringify(map) },
//     });
//   };

//   return (
//     <>
//       <Stack.Screen options={{ headerShown: true }} />
//       <View style={styles.container}>
//         <Image source={{ uri: map.image }} style={styles.image} />
//         {map.pins?.map((pin: any) => (
//           <TouchableOpacity
//             key={pin.id}
//             style={[styles.pin, { left: pin.position.x, top: pin.position.y }]}
//           >
//             {pin.type === "INFO" && (
//               <Text style={styles.pinText}>{pin.content}</Text>
//             )}
//             {pin.type === "IMAGE" && (
//               <Image source={{ uri: pin.content }} style={styles.pinImage} />
//             )}
//             {pin.type === "LINK" && (
//               <TouchableOpacity onPress={() => Linking.openURL(pin.content)}>
//                 <Ionicons
//                   name="link-outline"
//                   size={24}
//                   color={Colors.primary}
//                 />
//               </TouchableOpacity>
//             )}
//           </TouchableOpacity>
//         ))}
//         <View style={styles.detailsContainer}>
//           <Text style={styles.header}>{map.title}</Text>
//           <Text style={styles.description}>{map.description}</Text>
//           {/* <Link
//             href={{
//               pathname: "/(authenticated)/(modals)/EditMapModal",
//               params: { map: JSON.stringify(map) },
//             }}
//             asChild
//           > */}
//           <TouchableOpacity style={styles.editButton} onPress={move}>
//             <Ionicons
//               name="create-outline"
//               size={34}
//               color={Colors.lightGray}
//             />
//           </TouchableOpacity>
//           {/* </Link> */}
//         </View>
//       </View>
//     </>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: Colors.background,
//   },
//   pin: {
//     position: "absolute",
//     zIndex: 1,
//   },
//   pinText: {
//     backgroundColor: Colors.lightGray,
//     padding: 5,
//     borderRadius: 5,
//   },
//   pinImage: {
//     width: 50,
//     height: 50,
//     borderRadius: 5,
//   },
//   closeButton: {
//     position: "absolute",
//     top: 40,
//     right: 20,
//     zIndex: 1,
//   },
//   editButton: {
//     position: "absolute",
//     top: 32,
//     right: 50,
//     zIndex: 1,
//   },
//   image: {
//     width: width,
//     height: height,
//     resizeMode: "cover",
//   },
//   detailsContainer: {
//     position: "absolute",
//     bottom: 0,
//     left: 0,
//     right: 0,
//     backgroundColor: "rgba(0, 0, 0, 0.5)",
//     padding: 20,
//   },
//   header: {
//     fontSize: 24,
//     fontWeight: "bold",
//     color: Colors.lightGray,
//   },
//   description: {
//     fontSize: 16,
//     color: Colors.lightGray,
//     marginTop: 10,
//   },
//   errorText: {
//     fontSize: 18,
//     color: Colors.lightGray,
//     textAlign: "center",
//     marginTop: 20,
//   },
// });

// export default ViewMapModal;

import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Dimensions,
  Linking,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Colors from "@/constants/Colors";
import { RouteProp, useRoute } from "@react-navigation/native";
import { Link } from "expo-router"; // For navigation
import { useMapsContext } from "@/app/contexts/MapsContext"; // Access global state
import { red } from "react-native-reanimated/lib/typescript/reanimated2/Colors";

type ViewMapModalRouteParams = {
  mapId: string; // Instead of the whole map, just pass the mapId
};

const { width, height } = Dimensions.get("window");

const ViewMapModal = () => {
  const { maps } = useMapsContext(); // Access global maps
  const route =
    useRoute<RouteProp<{ params: ViewMapModalRouteParams }, "params">>();

  // Find the current map in the global state using the mapId
  const map = maps.find((m) => m.id === route.params.mapId);

  if (!map) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>No map data provided.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Image source={{ uri: map.image }} style={styles.image} />
      {map.pins?.map((pin) => (
        <TouchableOpacity
          key={pin.id}
          style={[styles.pin, { left: pin.position.x, top: pin.position.y }]}
        >
          {pin.type === "INFO" && (
            <Text style={styles.pinText}>{pin.content}</Text>
          )}
          {pin.type === "IMAGE" && (
            <Image source={{ uri: pin.content }} style={styles.pinImage} />
          )}
          {pin.type === "LINK" && (
            <TouchableOpacity onPress={() => Linking.openURL(pin.content)}>
              <Ionicons name="link-outline" size={24} color={Colors.primary} />
            </TouchableOpacity>
          )}
        </TouchableOpacity>
      ))}
      <View style={styles.detailsContainer}>
        <Text style={styles.header}>{map.title}</Text>
        <Text style={styles.description}>{map.description}</Text>
        <Link
          href={{
            pathname: "/(authenticated)/(modals)/EditMapModal",
            params: { mapId: map.id }, // Pass mapId instead of the full map object
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
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  errorText: {
    color: "red",
    fontSize: 16,
  },
  pin: {
    position: "absolute",
    zIndex: 1,
  },
  pinText: {
    backgroundColor: Colors.lightGray,
    padding: 5,
    borderRadius: 5,
  },
  pinImage: {
    width: 50,
    height: 50,
    borderRadius: 5,
  },
  image: {
    width: width,
    height: height,
    resizeMode: "cover",
  },
  detailsContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    color: Colors.lightGray,
  },
  description: {
    fontSize: 16,
    color: Colors.lightGray,
    marginTop: 10,
  },
  editButton: {
    position: "absolute",
    top: 32,
    right: 50,
    zIndex: 1,
  },
});

export default ViewMapModal;
