import React, { useEffect } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import * as SplashScreen from "expo-splash-screen";
import { useRouter } from "expo-router";

SplashScreen.preventAutoHideAsync();

const SplashScreenComponent = () => {
  const router = useRouter();

  useEffect(() => {
    console.log("SplashScreenComponent mounted");
    // Symulacja ładowania zasobów
    const timeout = setTimeout(async () => {
      console.log("Navigating to (tabs) after timeout");
      await SplashScreen.hideAsync();
      router.replace("(tabs)"); // Przechodzimy do zakładek po ekranie powitalnym
    }, 2000); // Możesz dostosować czas opóźnienia

    return () => clearTimeout(timeout); // Czyścimy timeout po zakończeniu
  }, [router]);

  const handlePress = () => {
    console.log("Button pressed, navigating to (tabs)");
    router.replace("(tabs)"); // Przechodzimy do zakładek po ekranie powitalnym
  };

  return (
    <View style={styles.container}>
      <Image
        source={require("../assets/images/splash.png")}
        style={styles.image}
      />
      <Text style={styles.title}>Evento</Text>
      <Text style={styles.subtitle}>
        Twórz interaktywne mapy dla miejsc i wydarzeń.
      </Text>
      <TouchableOpacity style={styles.button} onPress={handlePress}>
        <Text style={styles.buttonText}>Rozpocznij!</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#3a3a3a", // Upewnij się, że tło ma odpowiedni kolor
    padding: 20,
  },
  image: {
    width: 200,
    height: 200,
    marginBottom: 20,
    resizeMode: "contain",
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#ffffff",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: "#cccccc",
    textAlign: "center",
    marginBottom: 20,
  },
  button: {
    backgroundColor: "#888888",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 25,
  },
  buttonText: {
    fontSize: 18,
    color: "#ffffff",
    fontWeight: "bold",
  },
});

export default SplashScreenComponent;
