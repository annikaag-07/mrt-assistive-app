import React, { useRef } from "react";
import {
  Animated,
  Pressable,
  StyleSheet,
  Text,
  TextStyle,
  ViewStyle,
} from "react-native";

type AnimatedButtonProps = {
  title: string;
  onPress?: () => void;
  onLongPress?: () => void;
  style?: ViewStyle;
  textStyle?: TextStyle;
};

export default function AnimatedButton({
  title,
  onPress,
  onLongPress,
  style,
  textStyle,
}: AnimatedButtonProps) {
  const scale = useRef(new Animated.Value(1)).current;

  const pressIn = () => {
    Animated.spring(scale, {
      toValue: 0.95,
      useNativeDriver: true,
    }).start();
  };

  const pressOut = () => {
    Animated.spring(scale, {
      toValue: 1,
      friction: 4,
      useNativeDriver: true,
    }).start();
  };

  return (
    <Animated.View style={{ transform: [{ scale }] }}>
      <Pressable
        style={[styles.button, style]}
        onPress={onPress}
        onLongPress={onLongPress}
        delayLongPress={3000} // 🔥 HOLD 3 seconds
        onPressIn={pressIn}
        onPressOut={pressOut}
      >
        <Text style={[styles.text, textStyle]}>{title}</Text>
      </Pressable>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  button: {
    padding: 15,
    borderRadius: 12,
    marginVertical: 10,
    width: 280,
    alignItems: "center",
  },
  text: {
    fontSize: 18,
    fontWeight: "bold",
  },
});
