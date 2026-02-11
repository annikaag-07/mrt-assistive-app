import { useLocalSearchParams, useRouter } from "expo-router";
import * as Speech from "expo-speech";
import { useEffect } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

export default function ModeSelection() {
  const router = useRouter();
  const params = useLocalSearchParams();

  const name = params.name || "User";
  const contactName = params.contactName || "";
  const contactNumber = params.contactNumber || "";

  useEffect(() => {
    Speech.speak(
      `Welcome ${name}. Please choose your mode. ` +
        "Tap Partially Blind mode or Deaf mode to continue.",
      { rate: 0.9 },
    );
  }, []);

  const startPartiallyBlindTutorial = () => {
    Speech.stop();

    Speech.speak(
      "You have selected partially blind mode. " +
        "During platform alignment, you will feel different vibration patterns for left and right directions. " +
        "The app will speak instructions clearly. " +
        "In guided exit mode, you can say next when you are ready. " +
        "You are now ready to proceed.",
      { rate: 0.9 },
    );

    setTimeout(() => {
      router.replace({
        pathname: "/journey",
        params: {
          mode: "partialBlind",
          name,
          contactName,
          contactNumber,
        },
      });
    }, 5000);
  };

  const startDeafMode = () => {
    Speech.stop();

    Speech.speak(
      "You have selected deaf mode. " +
        "When you arrive at your destination, the phone will continuously vibrate until you manually stop the alert. " +
        "Visual signals will guide you through the journey.",
      { rate: 0.9 },
    );

    setTimeout(() => {
      router.replace({
        pathname: "/journey",
        params: {
          mode: "deaf",
          name,
          contactName,
          contactNumber,
        },
      });
    }, 4000);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Choose Your Mode</Text>

      <Text style={styles.welcomeText}>Welcome, {name}</Text>

      <Pressable style={styles.button} onPress={startPartiallyBlindTutorial}>
        <Text style={styles.buttonText}>Partially Blind Mode</Text>
      </Pressable>

      <Pressable style={styles.button} onPress={startDeafMode}>
        <Text style={styles.buttonText}>Deaf Mode</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    alignItems: "center",
    justifyContent: "center",
    padding: 30,
  },
  title: {
    color: "#FFD700",
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 20,
  },
  welcomeText: {
    color: "white",
    fontSize: 18,
    marginBottom: 40,
  },
  button: {
    backgroundColor: "#FFD700",
    padding: 15,
    borderRadius: 10,
    marginVertical: 10,
    width: "100%",
    alignItems: "center",
  },
  buttonText: {
    fontSize: 18,
    fontWeight: "bold",
  },
});
