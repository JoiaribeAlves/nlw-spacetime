import React from "react";
import { StatusBar } from "expo-status-bar";
import { Text, View } from "react-native";

export default function App() {
  return (
    <View className="bg-zinc-950 flex-1 items-center justify-center">
      <Text className={"text-zinc-50 font-bold text-5xl"}>
        Olá, mundo
      </Text>
      <StatusBar style="auto" translucent />
    </View>
  );
}
