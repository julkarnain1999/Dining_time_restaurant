import { View, Text, TouchableOpacity, Alert, Image } from "react-native";
import React, { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import { getAuth, signOut } from "firebase/auth";

export default function Profile() {
  const router = useRouter();
  const auth = getAuth();
  const [userEmail, setUserEmail] = useState(null);

  useEffect(() => {
    const fetchUserEmail = async () => {
      const email = await AsyncStorage.getItem("userEmail");
      setUserEmail(email);
    };

    fetchUserEmail();
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      await AsyncStorage.removeItem("userEmail");
      setUserEmail(null);
      Alert.alert("Logged out", "You have been logged out successfully.");
      router.push("/signin");
    } catch (error) {
      Alert.alert("Error", "Something went wrong while logging out.");
    }
  };

  const handleSignup = () => {
    router.push("/signup");
  };

  return (
    <View className="flex-1 justify-center items-center bg-[#040720] p-6">
      <Image
        source={{
          uri: "https://media.licdn.com/dms/image/v2/D5603AQF8Cuf2bXlc1w/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1720038788229?e=1746662400&v=beta&t=0wBpk28IKhY8lEzDBsdmEBbKQgDMSkrq3jWhXfldfOs",
        }}
        className="w-28 h-28 rounded-full border-4 border-[#dc143c] mb-4"
      />

      <Text className="text-2xl text-[#dc143c] font-bold mb-2">Profile</Text>

      {userEmail ? (
        <>
          <View className="bg-[#1a1a2e] w-full p-4 rounded-lg shadow-lg mb-6">
            <Text className="text-white text-lg text-center">
              Email: {userEmail}
            </Text>
          </View>

          <TouchableOpacity
            onPress={handleLogout}
            className="p-3 w-full bg-[#20206a] rounded-lg shadow-md"
          >
            <Text className="text-lg font-semibold text-white text-center">
              Logout
            </Text>
          </TouchableOpacity>
        </>
      ) : (
        <>
          <TouchableOpacity
            onPress={handleSignup}
            className="p-3 w-full bg-[#dc143c] rounded-lg shadow-md"
          >
            <Text className="text-lg font-semibold text-white text-center">
              Sign Up
            </Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
}
