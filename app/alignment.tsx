import { useLocalSearchParams, useRouter } from "expo-router";
import * as Speech from "expo-speech";
import { useRef, useState } from "react";
import { Animated, StyleSheet, Text, Vibration, View } from "react-native";
import AnimatedButton from "../components/AnimatedButton";

export default function Alignment() {
  const router = useRouter();
  const { mode } = useLocalSearchParams();

  const glowAnim = useRef(new Animated.Value(0)).current;
  const [glowText, setGlowText] = useState<string | null>(null);

  const triggerGlow = (text: string, pulses = 1) => {
    setGlowText(text);

    const animations = [];

    for (let i = 0; i < pulses; i++) {
      animations.push(
        Animated.timing(glowAnim, {
          toValue: 0.8,
          duration: 250,
          useNativeDriver: true,
        }),
        Animated.timing(glowAnim, {
          toValue: 0,
          duration: 250,
          useNativeDriver: true,
        }),
      );
    }

    Animated.sequence(animations).start(() => {
      setGlowText(null);
    });
  };

  const goLeft = () => {
    Vibration.vibrate([0, 200]);

    if (mode === "partialBlind") {
      Speech.speak("Move left and follow the yellow tactile line.");
    }

    triggerGlow("VIBRATION 1x", 1);
  };

  const goRight = () => {
    Vibration.vibrate([0, 200, 100, 200]);

    if (mode === "partialBlind") {
      Speech.speak("Move right and follow the yellow tactile line.");
    }

    triggerGlow("VIBRATION 2x", 2);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Platform Alignment</Text>

      <AnimatedButton
        title="⬅ Move Left"
        onPress={goLeft}
        style={{ backgroundColor: "#FFD700" }}
      />

      <AnimatedButton
        title="Move Right ➡"
        onPress={goRight}
        style={{ backgroundColor: "#FFD700" }}
      />

      <AnimatedButton
        title="Proceed to Guided Exit"
        onPress={() =>
          router.push({
            pathname: "/guidedexit",
            params: { mode },
          })
        }
        style={{ backgroundColor: "#FFD700" }}
      />

      {glowText && (
        <Animated.View
          pointerEvents="none"
          style={[
            styles.glowOverlay,
            {
              opacity: glowAnim,
            },
          ]}
        >
          <Text style={styles.glowText}>{glowText}</Text>
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
    fontSize: 24,
    marginBottom: 40,
  },
  glowOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(255, 255, 0, 0.6)", // brighter yellow
    justifyContent: "center",
    alignItems: "center",
  },
  glowText: {
    fontSize: 36,
    fontWeight: "bold",
    color: "black",
  },
});
