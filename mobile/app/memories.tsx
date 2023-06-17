import { Link, useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import Icon from "@expo/vector-icons/Feather";
import * as SecureStore from "expo-secure-store";
import dayjs from "dayjs";
import ptBr from "dayjs/locale/pt-br";

import Logo from "../src/assets/logo.svg";
import { useEffect, useState } from "react";
import { api } from "../src/lib/api";

interface IMemories {
  id: string;
  coverUrl: string;
  excerpt: string;
  createdAt: string;
}

dayjs.locale(ptBr);

export default function Memories() {
  const router = useRouter();
  const { bottom, top } = useSafeAreaInsets();
  const [memories, setMemories] = useState<IMemories[]>([]);

  async function signOut() {
    await SecureStore.deleteItemAsync("token");

    router.push("/");
  }

  async function loadMemories() {
    const token = await SecureStore.getItemAsync("token");

    try {
      const response = await api.get<IMemories[]>("/memories", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setMemories(response.data);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    loadMemories();
  }, []);

  return (
    <ScrollView
      className="flex-1"
      contentContainerStyle={{ paddingBottom: bottom, paddingTop: top }}
    >
      <View className="flex-row items-center justify-between mt-4 px-6">
        <Logo />

        <View className="flex-row gap-2">
          <Link href="/new" asChild>
            <TouchableOpacity className="h-10 w-10 items-center justify-center rounded-full bg-green-500">
              <Icon name="plus" size={16} color="#000" />
            </TouchableOpacity>
          </Link>

          <TouchableOpacity
            className="h-10 w-10 items-center justify-center rounded-full bg-red-500"
            onPress={signOut}
          >
            <Icon name="log-out" size={16} color="#000" />
          </TouchableOpacity>
        </View>
      </View>

      <View className="mt-6 space-y-10">
        {memories.map((memory) => (
          <View key={memory.id} className="space-y-4">
            <View className="flex-row items-center gap-2">
              <View className="h-px  w-5 bg-gray-50" />
              <Text className="font-body text-xs text-gray-100">
                {dayjs(memory.createdAt).format("D[ de ]MMMM[, ]YYYY")}
              </Text>
            </View>

            <View className="space-y-4 px-6">
              <Image
                source={{
                  uri: memory.coverUrl,
                }}
                className="aspect-video w-full rounded-lg"
                alt=""
              />

              <Text className="font-body text-base leading-relaxed text-gray-100">
                {memory.excerpt}
              </Text>

              <Link href={`/memories/${memory.id}`}>
                <TouchableOpacity className="flex-row gap-2 items-center">
                  <Text className="font-body text-sm text-gray-200">
                    Ler mais
                  </Text>
                  <Icon name="arrow-right" size={16} color="#9e9ea0" />
                </TouchableOpacity>
              </Link>
            </View>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}
