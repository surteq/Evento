import { View, Text } from "react-native";
import React from "react";
import { Stack, Tabs } from "expo-router";
import { FontAwesome, FontAwesome5 } from "@expo/vector-icons";
import Colors from "@/constants/Colors";
// import { BlurView } from "expo-blur";
import CustomHeader from "@/components/CustomHeader";
import { SafeAreaProvider } from "react-native-safe-area-context";

const Layout = () => {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors.primary,
        // tabBarBackground: () => (
        //   <BlurView
        //     experimentalBlurMethod="dimezisBlurView"
        //     intensity={100}
        //     tint={"extraLight"}
        //     style={{
        //       flex: 1,
        //       backgroundColor: "rgba(0,0,0,0.05)",
        //     }}
        //   />
        // ),
        tabBarStyle: {
          backgroundColor: "rgba(245, 245, 245, 0.99)",
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
        },
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: "Home",
          tabBarIcon: ({ size, color }) => (
            <FontAwesome name="home" size={size} color={color} />
          ),
          header: () => <CustomHeader />,
          headerTransparent: true,
        }}
      />
      <Tabs.Screen
        name="mymaps"
        options={{
          title: "My maps",
          tabBarIcon: ({ size, color }) => (
            <FontAwesome name="map" size={size} color={color} />
          ),
          header: () => <CustomHeader />,
          headerTransparent: true,
        }}
      />
      <Tabs.Screen
        name="createmaps"
        options={{
          title: "Create map",
          tabBarIcon: ({ size, color }) => (
            <FontAwesome name="map-marker" size={size} color={color} />
          ),
          header: () => <CustomHeader />,
          headerTransparent: true,
        }}
      />

      <Tabs.Screen
        name="SharedMaps"
        options={{
          title: "Shared maps",
          tabBarIcon: ({ size, color }) => (
            <FontAwesome5 name="map-marked-alt" size={size} color={color} />
          ),
          header: () => <CustomHeader />,
          headerTransparent: true,
        }}
      />
      <Tabs.Screen
        name="friends"
        options={{
          title: "Friends",
          tabBarIcon: ({ size, color }) => (
            <FontAwesome name="users" size={size} color={color} />
          ),
          header: () => <CustomHeader />,
          headerTransparent: true,
        }}
      />
    </Tabs>
  );
};

export default Layout;
