import { View, Text, TouchableOpacity, ScrollView, StatusBar,  Image, TextInput } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import logo from "../../assets/images/image.png";
import validationSchema from '../../utils/authSchema';
import {Formik}  from 'formik';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import { getFirestore, setDoc,doc } from 'firebase/firestore';
import { Alert } from "react-native";

 const entryImg = require("../../assets/images/Frame.png");

const Signup = () => {
  const router = useRouter(); 
    const auth = getAuth();
    const db = getFirestore();

      const handleGuest = async () => {
       
        await AsyncStorage.setItem("isGuest", "true");
        router.push("/home");
      };
  const handleSignup = async (values) => {
    try {
      const userCredentials = await createUserWithEmailAndPassword(
        auth,
        values.email,
        values.password
      );
      const user = userCredentials.user;

      await setDoc(doc(db, "users", user.uid), {
        email: values.email,
        createdAt: new Date(),
      });
      await AsyncStorage.setItem("userEmail", values.email);
      router.push("/home");
    } catch (error) {
      if (error.code === "auth/email-already-in-use") {
        Alert.alert(
          "Signup Failed!",
          "This email address is already in use. Please use a different email.",
          [{ text: "OK" }]
        );
      } else {
        Alert.alert(
          "Signup Error",
          "An unexpected error occurred. Please try again later.",
          [{ text: "OK" }]
        );
      }
    }
  };
 
  return (
    <SafeAreaView className={"bg-[#2b2b2b]"}>
      <ScrollView contentContainerStyle={{ height: "100%" }}>
        <View className="m-3 flex justify-center items-center">
          <Image source={logo} style={{ width: 200, height: 100 }} />
          <Text className="text-lg text-center text-white font-bold mb-9">
            Let's get you started
          </Text>

          <View className="w-5/6">
            <Formik
              initialValues={{ email: "", password: "" }}
              validationSchema={validationSchema}
              onSubmit={handleSignup}
            >
              {({
                handleChange,
                handleBlur,
                handleSubmit,

                values,
                touched,
                errors,
              }) => (
                <View className="w-full">
                  <Text className="text-[#de5757] mt-3 mb-2">Email</Text>
                  <TextInput
                    className="my-2  border border-[#de5757]  rounded-lg text-white px-2 justify-center items-center"
                    keyboardType="email-address"
                    value={values.email}
                    onChangeText={handleChange("email")}
                    onBlur={handleBlur("email")}
                    placeholder="Enter your email"
                    placeholderTextColor={"#de5757"}
                  />
                  {errors.email && touched.email && (
                    <Text className="text-red-500 text-xs mb-2">
                      {errors.email}
                    </Text>
                  )}
                  <Text className="text-[#de5757] mt-3 mb-2">Password</Text>
                  <TextInput
                    className="my-2  border border-[#de5757]  rounded-lg text-white px-2 justify-center items-center"
                    secureTextEntry
                    value={values.password}
                    onChangeText={handleChange("password")}
                    onBlur={handleBlur("password")}
                    placeholder="Enter your password"
                    placeholderTextColor={"#de5757"}
                  />
                  {errors.password && touched.password && (
                    <Text className="text-red-500 text-xs mb-2">
                      {errors.password}
                    </Text>
                  )}
                  <TouchableOpacity
                    onPress={handleSubmit}
                    className="p-2 my-2 bg-[#de5757] text-black rounded-lg"
                  >
                    <Text className="text-lg text-white font-semibold  text-center">
                      Sign Up
                    </Text>
                  </TouchableOpacity>
                </View>
              )}
            </Formik>

            <View className="flex justify-center items-center">
              <TouchableOpacity
                className="flex flex-row mt-5 p-2 justify-center items-center"
                onPress={() => router.push("/signin")}
              >
                <Text className="text-white font-semibold">
                  Already a User ? {""}
                </Text>
                <Text className="text-base font-semibold underline text-[#e88383]">
                  Sign in
                </Text>
              </TouchableOpacity>
              <Text className="text-center text-base font-semibold mb-4 text-[#fcfdfc] ">
                <View className="border-b-2 border-[#de5757] p-2 mb-1 w-24" />{" "}
                Or
                {""}
                <View className="border-b-2 border-[#de5757] p-2 mb-1 w-24" />
              </Text>
              <TouchableOpacity
                className="flex flex-row mb-5 p-2 justify-center items-center"
                onPress={handleGuest}
              >
                <Text className="text-white font-semibold">Be a-</Text>
                <Text className="text-base font-semibold underline text-[#e88383]">
                  {" "}
                  {""}
                  Guest User
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <View className="flex-1">
          <Image
            source={entryImg}
            className="w-full h-full"
            resizeMode="contain"
          />
        </View>

        <StatusBar barStyle={"light-content"} backgroundColor={"#181B34"} />
      </ScrollView>
    </SafeAreaView>
  );
}

export default Signup;