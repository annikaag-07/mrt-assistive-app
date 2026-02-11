import { useRouter } from "expo-router";
import { useState } from "react";
import {
    Keyboard,
    KeyboardAvoidingView,
    Platform,
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableWithoutFeedback
} from "react-native";

export default function Signup() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [contactName, setContactName] = useState("");
  const [contactNumber, setContactNumber] = useState("");

  const handleContinue = () => {
    if (!name || !contactName || !contactNumber) return;

    router.push({
      pathname: "/mode",
      params: {
        name,
        contactName,
        contactNumber,
      },
    });
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <ScrollView contentContainerStyle={styles.container}>
          <Text style={styles.title}>MRT Helper Signup</Text>

          <TextInput
            placeholder="Your Name"
            placeholderTextColor="#999"
            style={styles.input}
            value={name}
            onChangeText={setName}
            returnKeyType="next"
          />

          <TextInput
            placeholder="Emergency Contact Name"
            placeholderTextColor="#999"
            style={styles.input}
            value={contactName}
            onChangeText={setContactName}
            returnKeyType="next"
          />

          <TextInput
            placeholder="Emergency Contact Number"
            placeholderTextColor="#999"
            style={styles.input}
            keyboardType="phone-pad"
            value={contactNumber}
            onChangeText={setContactNumber}
            returnKeyType="done"
            onSubmitEditing={Keyboard.dismiss}
          />

          <Pressable style={styles.button} onPress={handleContinue}>
            <Text style={styles.buttonText}>Continue</Text>
          </Pressable>
        </ScrollView>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#000",
    alignItems: "center",
    justifyContent: "center",
    padding: 30,
  },
  title: {
    color: "#FFD700",
    fontSize: 26,
    marginBottom: 40,
    fontWeight: "bold",
  },
  input: {
    width: "100%",
    backgroundColor: "#222",
    color: "white",
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
  },
  button: {
    backgroundColor: "#FFD700",
    padding: 15,
    borderRadius: 10,
    width: "100%",
    alignItems: "center",
  },
  buttonText: {
    fontSize: 18,
    fontWeight: "bold",
  },
});
