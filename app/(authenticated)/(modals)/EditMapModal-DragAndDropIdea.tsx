// import React, { useState } from "react";
// import {
//   View,
//   Text,
//   StyleSheet,
//   TextInput,
//   TouchableOpacity,
//   Image,
//   Dimensions,
//   Linking,
//   Animated,
// } from "react-native";
// import { Ionicons } from "@expo/vector-icons";
// import Colors from "@/constants/Colors";
// import * as ImagePicker from "expo-image-picker";
// import { RouteProp, useRoute } from "@react-navigation/native";
// import { useMapsContext } from "@/app/contexts/MapsContext";
// import { useRouter } from "expo-router"; // For navigating back
// import CloseButton from "@/components/CloseButton";
// import { PinchGestureHandler, State } from "react-native-gesture-handler";

// interface Pin {
//   id: string;
//   type: "INFO" | "IMAGE" | "LINK";
//   content: string;
//   position: { x: number; y: number };
// }

// interface Map {
//   id: string;
//   title: string;
//   description: string;
//   image: string;
//   pins?: Pin[];
// }

// type EditMapModalRouteParams = {
//   mapId: string; // Pass mapId instead of the whole map
// };

// const { width, height } = Dimensions.get("window");

// const EditMapModal = () => {
//   const { maps, updateMapPins } = useMapsContext(); // Access global maps
//   const route =
//     useRoute<RouteProp<{ params: EditMapModalRouteParams }, "params">>();
//   const router = useRouter();

//   // Find the current map from the global state using the mapId
//   const map = maps.find((m) => m.id === route.params.mapId);

//   const [pinType, setPinType] = useState<"INFO" | "IMAGE" | "LINK">("INFO");
//   const [pinContent, setPinContent] = useState("");
//   const [imageUri, setImageUri] = useState<string | null>(null);

//   const [scale] = useState(new Animated.Value(1));
//   const [lastScale, setLastScale] = useState(1);
//   const [translateX] = useState(new Animated.Value(0));
//   const [translateY] = useState(new Animated.Value(0));

//   // Pinch Gesture Handler
//   const onPinchEvent = Animated.event([{ nativeEvent: { scale: scale } }], {
//     useNativeDriver: true,
//   });

//   const onPinchStateChange = (event: any) => {
//     if (event.nativeEvent.oldState === State.ACTIVE) {
//       setLastScale(lastScale * event.nativeEvent.scale);
//       scale.setValue(lastScale * event.nativeEvent.scale);
//       scale.setOffset(lastScale * event.nativeEvent.scale);
//     }
//   };

//   const addPin = (x: number, y: number) => {
//     const newPin: Pin = {
//       id: Date.now().toString(),
//       type: pinType,
//       content: pinType === "IMAGE" ? imageUri || "" : pinContent,
//       position: { x, y },
//     };
//     const updatedPins = [...(map?.pins || []), newPin];
//     updateMapPins(map!.id, updatedPins); // Update the map pins globally
//   };

//   const pickImage = async () => {
//     let result = await ImagePicker.launchImageLibraryAsync({
//       mediaTypes: ImagePicker.MediaTypeOptions.Images,
//       allowsEditing: true,
//       aspect: [4, 3],
//       quality: 1,
//     });

//     if (!result.canceled) {
//       setImageUri(result.assets[0].uri);
//     }
//   };

//   const handleMapPress = (e: any) => {
//     const x = e.nativeEvent.locationX;
//     const y = e.nativeEvent.locationY;
//     addPin(x, y); // Add pin to the global state
//   };

//   return (
//     <View style={styles.container}>
//       <CloseButton onPress={router.back} />

//       {/* Użycie PinchGestureHandler */}
//       <PinchGestureHandler
//         onGestureEvent={onPinchEvent}
//         onHandlerStateChange={onPinchStateChange}
//       >
//         <Animated.View
//           style={{
//             transform: [
//               { scale: scale },
//               { translateX: translateX },
//               { translateY: translateY },
//             ],
//           }}
//         >
//           <TouchableOpacity onPress={handleMapPress}>
//             <Image
//               source={{ uri: map?.image }}
//               style={[styles.image, { resizeMode: "contain" }]}
//             />
//           </TouchableOpacity>
//         </Animated.View>
//       </PinchGestureHandler>

//       {/* Display Pins on the Map */}
//       {map?.pins?.map((pin: Pin) => (
//         <Animated.View
//           key={pin.id}
//           style={[
//             styles.pin,
//             {
//               left: pin.position.x,
//               top: pin.position.y,
//               transform: [{ scale }],
//             },
//           ]}
//         >
//           <TouchableOpacity
//             onPress={() => {
//               if (pin.type === "LINK") {
//                 Linking.openURL(pin.content).catch((err) =>
//                   console.error("Failed to open URL:", err)
//                 );
//               }
//             }}
//           >
//             {pin.type === "INFO" && (
//               <Text style={styles.pinText}>{pin.content}</Text>
//             )}
//             {pin.type === "IMAGE" && (
//               <Image source={{ uri: pin.content }} style={styles.pinImage} />
//             )}
//             {pin.type === "LINK" && (
//               <Ionicons name="link-outline" size={24} color={Colors.primary} />
//             )}
//           </TouchableOpacity>
//         </Animated.View>
//       ))}

//       {/* Panel to Choose Pin Type */}
//       <View style={styles.pinPanel}>
//         <Text style={styles.header}>Choose Pin Type</Text>
//         <View style={styles.buttonContainer}>
//           <TouchableOpacity
//             style={[styles.button, pinType === "INFO" && styles.activeButton]}
//             onPress={() => setPinType("INFO")}
//           >
//             <Text style={styles.buttonText}>INFO</Text>
//           </TouchableOpacity>
//           <TouchableOpacity
//             style={[styles.button, pinType === "IMAGE" && styles.activeButton]}
//             onPress={() => setPinType("IMAGE")}
//           >
//             <Text style={styles.buttonText}>IMAGE</Text>
//           </TouchableOpacity>
//           <TouchableOpacity
//             style={[styles.button, pinType === "LINK" && styles.activeButton]}
//             onPress={() => setPinType("LINK")}
//           >
//             <Text style={styles.buttonText}>LINK</Text>
//           </TouchableOpacity>
//         </View>

//         {pinType === "INFO" && (
//           <TextInput
//             style={styles.input}
//             placeholder="Enter text for pin"
//             value={pinContent}
//             onChangeText={setPinContent}
//           />
//         )}
//         {pinType === "IMAGE" && (
//           <TouchableOpacity onPress={pickImage} style={styles.imagePicker}>
//             <Text style={styles.buttonText}>
//               {imageUri ? "Change Image" : "Pick Image"}
//             </Text>
//           </TouchableOpacity>
//         )}
//         {pinType === "LINK" && (
//           <TextInput
//             style={styles.input}
//             placeholder="Enter link URL"
//             value={pinContent}
//             onChangeText={setPinContent}
//           />
//         )}
//       </View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: Colors.background,
//   },
//   image: {
//     width: width,
//     height: height,
//   },
//   pinPanel: {
//     position: "absolute",
//     bottom: 0,
//     left: 0,
//     right: 0,
//     backgroundColor: "rgba(0, 0, 0, 0.6)", // Changed for better visibility
//     padding: 10,
//     borderRadius: 10,
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
//   header: {
//     fontSize: 18,
//     color: Colors.lightGray,
//     textAlign: "center",
//     marginBottom: 10,
//   },
//   buttonContainer: {
//     flexDirection: "row",
//     justifyContent: "space-around",
//     marginBottom: 10,
//   },
//   button: {
//     paddingVertical: 8,
//     paddingHorizontal: 16,
//     backgroundColor: Colors.primary,
//     borderRadius: 8,
//   },
//   activeButton: {
//     backgroundColor: Colors.secondary,
//   },
//   buttonText: {
//     color: Colors.lightGray,
//     fontSize: 14,
//   },
//   input: {
//     backgroundColor: Colors.lightGray,
//     borderRadius: 8,
//     padding: 8,
//     marginBottom: 10,
//     fontSize: 14,
//   },
//   imagePicker: {
//     backgroundColor: Colors.primary,
//     padding: 10,
//     borderRadius: 8,
//     alignItems: "center",
//     marginBottom: 10,
//   },
// });

// export default EditMapModal;
