import { useRouter } from "expo-router";
import { Image, ScrollView, StatusBar, TouchableOpacity, View, Text } from "react-native";
import logo from "../assets/images/image.png"

import { SafeAreaView } from "react-native-safe-area-context";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Index() {
  const router =useRouter();

  const handleGuest = async () => {
    await AsyncStorage.setItem("isGuest", "true");
    router.push("/home");
  };

  const entryImg = require("../assets/images/Frame.png");
  return (
    <SafeAreaView className={"bg-[#040720]"}>
      <StatusBar barStyle={"light-content"} backgroundColor={"#040720"} />
      <ScrollView contentContainerStyle={{ height: "100%" }}>
        <View className="m-2 flex justify-center items-center">
          <Image source={logo} style={{ width: 300, height: 300 }} />
          <View className="w-3/4 ">
            <TouchableOpacity
              onPress={() => router.push("/signup")}
              className="p-3 my-2 bg-[#F44336] border  border-[#dc143c] rounded-lg shadow-lg  active:opacity-80"
            >
              <Text className="text-lg font-semibold text-white text-center">
                Sing Up
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={handleGuest}
              className="p-3 my-2 bg-[#FF9800]  rounded-lg shadow-lg  active:opacity-80"
            >
              <Text className="text-lg font-semibold text-white text-center">
                Guest User
              </Text>
            </TouchableOpacity>
          </View>
          <View>
            <Text className="text-center text-base font-semibold my-4 text-[#fcfdfc] ">
              <View className="border-b-2 border-[#de5757] p-2 mb-1 w-24" /> Or
              {""}
              <View className="border-b-2 border-[#de5757] p-2 mb-1 w-24" />
            </Text>
            <TouchableOpacity
              className="flex flex-row justify-centeritems-center"
              onPress={() => router.push("/signin")}
            >
              <Text className="text-white font-semibold">
                Already a User? {""}
              </Text>
              <Text className="text-base font-semibold underline text-red-600">
                Sign in
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <View className="flex-1">
          <Image
            source={entryImg}
            className="w-full h-full"
            resizeMode="contain"
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
