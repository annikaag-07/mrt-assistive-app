import { useLocalSearchParams, useRouter } from "expo-router";
import * as Speech from "expo-speech";
import { useEffect, useState } from "react";
import { Pressable, StyleSheet, Text, Vibration, View } from "react-native";

export default function GuidedExit() {
  const router = useRouter();
  const params = useLocalSearchParams();

  const mode = Array.isArray(params.mode) ? params.mode[0] : params.mode;

  const [step, setStep] = useState(0);
  const [flash, setFlash] = useState(false);

  const steps = [
    "Exit the train and follow the yellow tactile line.",
    "Walk forward for approximately ten steps.",
    "Turn left towards the escalator.",
    "Tap your card and exit the station safely.",
  ];

  // 🔵 Partially Blind Mode (Speech)
  useEffect(() => {
    if (mode === "partialBlind") {
      Speech.speak(steps[step] + ". Say next when you are ready.", {
        rate: 0.9,
      });
    }

    // 🔴 Deaf Mode (Strong vibration + flash)
    if (mode === "deaf") {
      Vibration.vibrate([0, 200, 100, 200]);
      setFlash(true);

      setTimeout(() => {
        setFlash(false);
      }, 500);
    }
  }, [step]);

  const nextStep = () => {
    if (step < steps.length - 1) {
      setStep((prev) => prev + 1);
    } else {
      router.replace({
        pathname: "/journey",
        params: { mode },
      });
    }
  };

  const progressPercentage = ((step + 1) / steps.length) * 100;

  return (
    <View
      style={[styles.container, mode === "deaf" && flash && styles.flashScreen]}
    >
      <Text style={styles.title}>Guided Exit</Text>

      {/* 🔴 Large Step Number for Deaf */}
      {mode === "deaf" && <Text style={styles.bigStep}>STEP {step + 1}</Text>}

      <Text style={styles.instruction}>{steps[step]}</Text>

      {/* 🔴 Visual Progress Bar */}
      {mode === "deaf" && (
        <View style={styles.progressContainer}>
          <View
            style={[styles.progressBar, { width: `${progressPercentage}%` }]}
          />
        </View>
      )}

      <Pressable style={styles.button} onPress={nextStep}>
        <Text style={styles.buttonText}>
          {step < steps.length - 1 ? "Next Step" : "Return Home"}
        </Text>
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
  flashScreen: {
    backgroundColor: "#1e3a8a",
  },
  title: {
    color: "#FFD700",
    fontSize: 24,
    marginBottom: 20,
  },
  bigStep: {
    fontSize: 40,
    fontWeight: "bold",
    color: "#FFD700",
    marginBottom: 20,
  },
  instruction: {
    color: "#FFF",
    fontSize: 20,
    textAlign: "center",
    marginBottom: 40,
  },
  button: {
    backgroundColor: "#FFD700",
    padding: 15,
    borderRadius: 12,
    width: 250,
    alignItems: "center",
  },
  buttonText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  progressContainer: {
    width: "100%",
    height: 10,
    backgroundColor: "#333",
    borderRadius: 5,
    marginBottom: 30,
  },
  progressBar: {
    height: 10,
    backgroundColor: "#FFD700",
    borderRadius: 5,
  },
});
