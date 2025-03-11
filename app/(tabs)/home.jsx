import { View, Text, Image , Platform, ImageBackground, TouchableOpacity, FlatList} from 'react-native'

import { SafeAreaView } from 'react-native-safe-area-context'
import logo from "../../assets/images/image.png";
import { ScrollView } from 'react-native';
import { BlurView } from 'expo-blur';
import homePage from "../../assets/images/homeBanner.png";
import { ActivityIndicator } from 'react-native';

import { restaurants } from '../../store/restaurants';
import { getDocs, collection, query } from 'firebase/firestore';
import { db } from '../../config/firebaseConfig';
import { useEffect, useState } from 'react';
import { useRouter } from 'expo-router';




export default function Home ()  {
  const router = useRouter();

const [restaurants, setRestaurants] = useState([]);

  const temp = async () => {
    const value = await AsyncStorage.getItem("isGuest");
    const email = await AsyncStorage.getItem("userEmail");
    console.log(value, email);
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => router.push(`/restaurant/${item.name}`)} className="bg-[#040720] max-h-64 rounded-lg justify-center  p-2 mx-2 shadow-md">
      <Image
        resizeMode="cover"
        source={{ uri: item.image }}
        className="h-28 mt-2 mb-1 rounded-lg"
      />
      <Text className="text-white text-lg font-bold mb-1">{item.name}</Text>
      <Text className="text-white text-base mb-2">{item.address}</Text>
      <Text className="text-white text-base mb-2">
        {" "}
        Open: {item.opening}-Close:{item.closing}
      </Text>
    </TouchableOpacity>
  );

  const getRestaurants= async () => {
    const q = query(collection(db, "restaurants"));
    const res = await getDocs(q);

    res.forEach((item) => {
      setRestaurants((prev) => [...prev, item.data()]);
    });
  };
  useEffect(() => {
    getRestaurants();
    temp();
  }, []);
  return (
    <SafeAreaView
      style={[
        { backgroundColor: "#2b2b2b" },
        Platform.OS === "android" && { paddingBottom: 50 },
      ]}
    >
      <View className="flex items-center">
        <View className="bg-[#040720] w-11/12 rounded-lg shadow-lg justify-between items-center p-2 flex flex-row">
          <View className="flex flex-row">
            <Text
              className={`text-base h-10 align-middle text-white 
    ${Platform.OS === "android" ? "pt-[8px]" : "pt-1"}
  `}
            >
              {""}
              Welcome to{""}
            </Text>
            <Image source={logo} className={"w-20 h-12"} />
          </View>
        </View>
      </View>
      <ScrollView stickyHeaderIndices={[0]}>
        <ImageBackground
          resizeMode="cover"
          className="mb-4 w-full h-52 items-center bg-[#5f5f5f] justify-center "
          source={homePage}
        >
          <BlurView
            intensity={Platform.OS === "android" ? 100 : 20}
            className="w-full p-2 shadow-lg "
          >
            <Text className="text-2xl text-white font-bold text-center">
              Dine with Your Friends
            </Text>
          </BlurView>
        </ImageBackground>
        <View className="flex bg-[#2b2b2b] justify-center items-center mb-2">
          <Text className="text-white text-2xl font-semibold">
            Special Discount Restaurants %
          </Text>
        </View>
        {restaurants.length > 0 ? (
          <FlatList
            data={restaurants}
            renderItem={renderItem}
            horizontal
            contentContainerStyle={{ padding: 16 }}
            showsHorizontalScrollIndicator={false}
            scrollEnabled={true}
          />
        ) : (
          <ActivityIndicator animating color={"#9B2020"} />
        )}
        <View className="flex bg-[#2b2b2b] justify-center items-center mb-2">
          <Text className="text-[#807f8f] text-2xl font-semibold">
            Our Restaurants
          </Text>
        </View>
        {restaurants.length > 0 ? (
          <FlatList
            data={restaurants}
            renderItem={renderItem}
            horizontal
            contentContainerStyle={{ padding: 16 }}
            showsHorizontalScrollIndicator={false}
            scrollEnabled={true}
          />
        ) : (
          <ActivityIndicator animating color={"#9B2020"} />
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

