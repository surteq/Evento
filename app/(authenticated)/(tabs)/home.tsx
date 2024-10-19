import RoundBtn from "@/components/RoundBtn";
import WidgetList from "@/components/SortableList/WidgetList";
import Colors from "@/constants/Colors";
import { defaultStyles } from "@/constants/Styles";
import { events } from "@/constants/events";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  Image,
} from "react-native";

export default function HomeScreen() {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Popular</Text>
        <View style={styles.actionRow}>
          <RoundBtn icon={"map"} text={"Map"} />
          <RoundBtn icon={"map-outline"} text={"Map"} />
          <RoundBtn icon={"map"} text={"Map"} />
          <RoundBtn icon={"map-outline"} text={"Map"} />
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Events nearby</Text>
        <View style={styles.events}>
          {events.length === 0 && (
            <Text style={{ padding: 14, color: Colors.gray }}>
              No events yet
            </Text>
          )}
          {events.map((event) => (
            <View
              key={event.id}
              style={{
                flexDirection: "row",
                alignItems: "center",
                gap: 16,
                marginBottom: 10,
              }}
            >
              <View style={styles.circle}>
                <Ionicons name="calendar" size={24} color={Colors.primary} />
              </View>

              <View style={{ flex: 1 }}>
                <Text style={{ fontWeight: "bold" }}>{event.title}</Text>
                <Text style={{ color: Colors.gray, fontSize: 12 }}>
                  {new Date(event.date).toLocaleDateString()}
                </Text>
                <Text style={{ color: Colors.gray, fontSize: 12 }}>
                  {event.location}
                </Text>
                <Text style={{ color: Colors.gray, fontSize: 12 }}>
                  {event.description}
                </Text>
              </View>
            </View>
          ))}
        </View>
      </View>

      <Text style={defaultStyles.sectionHeader}>Map Categories</Text>
      <WidgetList />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 100,
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
  },
  section: {
    padding: 10,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  mapCircle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "#f5f5f5",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },
  eventList: {},
  categoryList: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  categoryItem: {
    backgroundColor: "#f5f5f5",
    padding: 20,
    borderRadius: 8,
    margin: 5,
    alignItems: "center",
    justifyContent: "center",
    width: "45%",
  },
  actionRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 20,
  },
  events: {
    marginHorizontal: 20,
    padding: 14,
    backgroundColor: "#fff",
    borderRadius: 16,
    gap: 20,
  },
  circle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.lightGray,
    justifyContent: "center",
    alignItems: "center",
  },
});

// import RoundBtn from "@/components/RoundBtn";
// import WidgetList from "@/components/SortableList/WidgetList";
// import Colors from "@/constants/Colors";
// import { defaultStyles } from "@/constants/Styles";
// import { events } from "@/constants/events";

// import { Link } from "expo-router";
// import { Ionicons } from "@expo/vector-icons";
// import React from "react";
// import { View, Text, StyleSheet, ScrollView } from "react-native";
// import { useMapsContext } from "@/app/contexts/MapsContext";

// export default function HomeScreen() {
//   const { maps } = useMapsContext();

//   return (
//     <ScrollView style={styles.container}>
//       <View style={styles.section}>
//         <Text style={styles.sectionTitle}>Popular</Text>

//           {maps.length === 0 ? (
//               <View style={styles.actionRow}>
//               <RoundBtn icon={"map"} text={"Map"} />
//               <RoundBtn icon={"map-outline"} text={"Map"} />
//               <RoundBtn icon={"map"} text={"Map"} />
//               <RoundBtn icon={"map-outline"} text={"Map"} />
//               </View>
//           ) : (
//             maps.slice(0, 4).map((map) => (

//               <Link
//                 key={map.id}
//                 href={{
//                   pathname: "/(authenticated)/(modals)/view-map",
//                   params: { map: JSON.stringify(map) },
//                 }}
//                 asChild
//               >
//                 <RoundBtn icon="map" text={map.title} />
//               </Link>
//             ))
//           )}

//       </View>

//       <View style={styles.section}>
//         <Text style={styles.sectionTitle}>Events nearby</Text>
//         <View style={styles.events}>
//           {events.length === 0 && (
//             <Text style={{ padding: 14, color: Colors.gray }}>
//               No events yet
//             </Text>
//           )}
//           {events.map((event) => (
//             <View
//               key={event.id}
//               style={{
//                 flexDirection: "row",
//                 alignItems: "center",
//                 gap: 16,
//                 marginBottom: 10,
//               }}
//             >
//               <View style={styles.circle}>
//                 <Ionicons name="calendar" size={24} color={Colors.primary} />
//               </View>

//               <View style={{ flex: 1 }}>
//                 <Text style={{ fontWeight: "bold" }}>{event.title}</Text>
//                 <Text style={{ color: Colors.gray, fontSize: 12 }}>
//                   {new Date(event.date).toLocaleDateString()}
//                 </Text>
//                 <Text style={{ color: Colors.gray, fontSize: 12 }}>
//                   {event.location}
//                 </Text>
//                 <Text style={{ color: Colors.gray, fontSize: 12 }}>
//                   {event.description}
//                 </Text>
//               </View>
//             </View>
//           ))}
//         </View>
//       </View>

//       <Text style={defaultStyles.sectionHeader}>Map Categories</Text>
//       <WidgetList />
//     </ScrollView>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     marginTop: 100,
//     flex: 1,
//     backgroundColor: "#fff",
//   },
//   header: {
//     flexDirection: "row",
//     alignItems: "center",
//     padding: 10,
//   },
//   profileImage: {
//     width: 40,
//     height: 40,
//     borderRadius: 20,
//     marginRight: 10,
//   },
//   searchInput: {
//     flex: 1,
//     height: 40,
//     borderColor: "#ccc",
//     borderWidth: 1,
//     borderRadius: 8,
//     paddingHorizontal: 10,
//   },
//   section: {
//     padding: 10,
//   },
//   sectionTitle: {
//     fontSize: 20,
//     fontWeight: "bold",
//     marginBottom: 10,
//   },
//   mapCircle: {
//     width: 100,
//     height: 100,
//     borderRadius: 50,
//     backgroundColor: "#f5f5f5",
//     justifyContent: "center",
//     alignItems: "center",
//     marginRight: 10,
//   },
//   eventList: {
//     // Add your styles for the event list here
//   },
//   categoryList: {
//     flexDirection: "row",
//     flexWrap: "wrap",
//   },
//   categoryItem: {
//     backgroundColor: "#f5f5f5",
//     padding: 20,
//     borderRadius: 8,
//     margin: 5,
//     alignItems: "center",
//     justifyContent: "center",
//     width: "45%",
//   },
//   actionRow: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     padding: 20,
//   },
//   events: {
//     marginHorizontal: 20,
//     padding: 14,
//     backgroundColor: "#fff",
//     borderRadius: 16,
//     gap: 20,
//   },
//   circle: {
//     width: 40,
//     height: 40,
//     borderRadius: 20,
//     backgroundColor: Colors.lightGray,
//     justifyContent: "center",
//     alignItems: "center",
//   },
// });
