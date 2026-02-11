import { useRouter } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";

export default function Onboarding() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Select Mode</Text>

      <Pressable style={styles.button} onPress={() => router.push("/journey")}>
        <Text style={styles.buttonText}>Partially Blind Mode</Text>
      </Pressable>

      <Pressable style={styles.button}>
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
  },
  title: {
    color: "#FFD700",
    fontSize: 24,
    marginBottom: 30,
  },
  button: {
    backgroundColor: "#FFD700",
    padding: 15,
    borderRadius: 10,
    marginVertical: 10,
    width: 250,
    alignItems: "center",
  },
  buttonText: {
    fontSize: 18,
    fontWeight: "bold",
  },
});
