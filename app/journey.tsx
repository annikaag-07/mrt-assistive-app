import { useLocalSearchParams, useRouter } from "expo-router";
import * as Speech from "expo-speech";
import { useRef, useState } from "react";
import { Animated, StyleSheet, Text, Vibration, View } from "react-native";
import AnimatedButton from "../components/AnimatedButton";

export default function Journey() {
  const router = useRouter();
  const params = useLocalSearchParams();

  const mode = Array.isArray(params.mode) ? params.mode[0] : params.mode;
  const name = Array.isArray(params.name) ? params.name[0] : params.name;

  const [sosActive, setSosActive] = useState(false);
  const [arrivalAlert, setArrivalAlert] = useState(false);
  const [glowColor, setGlowColor] = useState<string | null>(null);

  const glowAnim = useRef(new Animated.Value(0)).current;

  // Glow animation loop
  const startGlow = (color: string) => {
    setGlowColor(color);

    Animated.loop(
      Animated.sequence([
        Animated.timing(glowAnim, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.timing(glowAnim, {
          toValue: 0,
          duration: 500,
          useNativeDriver: true,
        }),
      ]),
    ).start();
  };

  const stopGlow = () => {
    glowAnim.stopAnimation();
    glowAnim.setValue(0);
    setGlowColor(null);
  };

  const simulateArrival = () => {
    if (mode === "partialBlind") {
      Vibration.vibrate([0, 500]);
      Speech.speak("Arrived at destination station.");
      startGlow("yellow");

      setTimeout(() => {
        stopGlow();
      }, 1200);

      return;
    }

    if (mode === "deaf") {
      setArrivalAlert(true);
      Vibration.vibrate([0, 1000, 500, 1000], true);
      startGlow("blue");
      return;
    }

    Speech.speak("Mode not detected.");
  };

  const stopArrivalAlert = () => {
    Vibration.cancel();
    setArrivalAlert(false);
    stopGlow();
  };

  const stopSOS = () => {
    Vibration.cancel();
    setSosActive(false);
    stopGlow();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Journey Simulation 🚇</Text>
      <Text style={styles.welcome}>Welcome {name || "User"}</Text>

      <AnimatedButton
        title="Simulate Arrival"
        onPress={simulateArrival}
        style={{ backgroundColor: "#FFD700" }}
      />

      <AnimatedButton
        title="Platform Alignment"
        onPress={() =>
          router.push({
            pathname: "/alignment",
            params: { mode, name },
          })
        }
        style={{ backgroundColor: "#FFD700" }}
      />

      <AnimatedButton
        title="Guided Exit Mode"
        onPress={() =>
          router.push({
            pathname: "/guidedexit",
            params: { mode, name },
          })
        }
        style={{ backgroundColor: "#FFD700" }}
      />

      {/* 🔴 SOS BUTTON */}
      <View style={styles.sosWrapper}>
        <AnimatedButton
          title="HOLD FOR SOS"
          onLongPress={() => {
            setSosActive(true);
            Vibration.vibrate([0, 500, 200, 500, 200, 500]);
            startGlow("red");
          }}
          style={{ backgroundColor: "red", borderRadius: 30 }}
          textStyle={{ color: "white" }}
        />
      </View>

      {/* 🔴 SOS SCREEN */}
      {sosActive && (
        <View style={styles.sosScreen}>
          <Text style={styles.sosText}>EMERGENCY MESSAGE SENT TO CONTACT</Text>

          <AnimatedButton
            title="Stop Alert"
            onPress={stopSOS}
            style={{ backgroundColor: "#FFD700" }}
          />
        </View>
      )}

      {/* 🔵 DEAF ARRIVAL SCREEN */}
      {arrivalAlert && (
        <View style={styles.sosScreen}>
          <Text style={styles.sosText}>DESTINATION REACHED</Text>

          <AnimatedButton
            title="Stop Vibration"
            onPress={stopArrivalAlert}
            style={{ backgroundColor: "#FFD700" }}
          />
        </View>
      )}

      {/* 🌟 GLOW OVERLAY */}
      {glowColor && (
        <Animated.View
          pointerEvents="none"
          style={[
            styles.glowOverlay,
            {
              backgroundColor:
                glowColor === "red"
                  ? "rgba(255,0,0,0.4)"
                  : glowColor === "blue"
                    ? "rgba(0,0,255,0.3)"
                    : "rgba(255,215,0,0.3)",
              opacity: glowAnim,
            },
          ]}
        >
          <Text style={styles.glowText}>VIBRATING</Text>
        </Animated.View>
      )}
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
    fontSize: 26,
    marginBottom: 10,
    fontWeight: "bold",
  },
  welcome: {
    color: "white",
    marginBottom: 20,
  },
  sosWrapper: {
    position: "absolute",
    bottom: 40,
    alignSelf: "center",
  },
  sosScreen: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "red",
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
  },
  sosText: {
    color: "white",
    fontSize: 22,
    marginBottom: 30,
    fontWeight: "bold",
    textAlign: "center",
  },
  glowOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
  },
  glowText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
  },
});
