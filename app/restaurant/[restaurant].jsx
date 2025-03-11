import {
  View,
  Image,
  Text,
  Platform,
  ScrollView,
  Dimensions,
  FlatList,
  Linking,
} from "react-native";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../config/firebaseConfig";
import React, { useRef, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useLocalSearchParams } from "expo-router";
import { useEffect } from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import DatePickerComponent from "../../components/restaurant/DatePickerComponent";
import GuestPickerComponent from "../../components/restaurant/GuestPickerComponent";
import FindSlots from "../../components/restaurant/FindSlots";

export default function Restaurants() {
  const { restaurant } = useLocalSearchParams();

  const flatListRef = useRef(null);
 

  const windowWidth = Dimensions.get("window").width;
  const [currentIndex, setCurrentIndex] = useState(0);

  const [restaurantData, setRestaurantData] = useState({});
  const [carouselData, setCarouselData] = useState({});
  const [date, setDate] = useState(new Date());

  const [slotsData, setSlotsData] = useState({});
  const [selectedNumber, setSelectedNumber] = useState(2);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const handleNextImage = () => {
    const carouselLength = carouselData[0]?.images.length;
    if (currentIndex < carouselLength - 1) {
      const nextIndex = currentIndex + 1;
      setCurrentIndex(nextIndex);
      flatListRef?.current?.scrollToIndex({
        index: nextIndex,
        animated: true,
      });
    }

    if (currentIndex === carouselLength - 1) {
      setCurrentIndex(0);
      flatListRef?.current?.scrollToIndex({
        index: 0,
        animated: true,
      });
    }
  };

  const handlePreviousImage = () => {
    const carouselLength = carouselData[0]?.images.length;
    if (currentIndex > 0) {
      const previousIndex = currentIndex - 1;
      setCurrentIndex(previousIndex);
      flatListRef?.current?.scrollToIndex({
        index: previousIndex,
        animated: true,
      });
    }

    if (currentIndex === 0) {
      setCurrentIndex(carouselLength - 1);
      flatListRef?.current?.scrollToIndex({
        index: carouselLength - 1,
        animated: true,
      });
    }
  };

  const carouselItem = ({ item }) => {
    return (
      <View style={{ width: windowWidth - 2 }} className="h-64 relative">
        <View
          style={{
            position: "absolute",
            top: "50%",
            backgroundColor: "rgba(0,0,0,0.6)",
            borderRadius: 50,
            padding: 5,
            zIndex: 10,
            right: "6%",
          }}
        >
          <Ionicons
            onPress={handleNextImage}
            name="arrow-forward"
            size={24}
            color="white"
          />
        </View>
        <View
          style={{
            position: "absolute",
            top: "50%",
            backgroundColor: "rgba(0,0,0,0.5)",
            borderRadius: 50,
            padding: 5,
            zIndex: 10,
            left: "2%",
          }}
        >
          <Ionicons
            onPress={handlePreviousImage}
            name="arrow-back"
            size={24}
            color="white"
          />
        </View>
        <View
          style={{
            position: "absolute",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "row",
            left: "50%",
            transform: [{ translateX: -50 }],
            zIndex: 10,
            buttom: 15,
          }}
        >
          {carouselData[0].images?.map((_, i) => (
            <View
              key={i}
              className={`bg-white h-2 w-2 ${
                i == currentIndex && "h-3 w-3"
              } p-1 mx-1 rounded-full `}
            />
          ))}
        </View>

        <Image
          source={{ uri: item }}
          style={{
            Opacity: 1,
            backgroundColor: "black",
            marginRight: 20,
            marginLeft: 5,
            borderRadius: 25,
          }}
          className="h-64"
        />
      </View>
    );
  };

const getRestaurantData = async () => {
  try {
    const restaurantQuery = query(
      collection(db, "restaurants"),
      where("name", "==", restaurant)
    );
    const restaurantSnapshot = await getDocs(restaurantQuery);

    if (restaurantSnapshot.empty) {
      console.log("No matching restaurant found");
      return;
    }

    for (const doc of restaurantSnapshot.docs) {
      const restaurantData = doc.data();
      setRestaurantData(restaurantData);

      const carouselQuery = query(
        collection(db, "carousel"),
        where("res_id", "==", doc.ref)
      );
      const carouselSnapshot = await getDocs(carouselQuery);
      const carouselImages = [];
      if (carouselSnapshot.empty) {
        console.log("No matching carousel found");
        return;
      }
      carouselSnapshot.forEach((carouselDoc) => {
        carouselImages.push(carouselDoc.data());
      });
      setCarouselData(carouselImages);

      const slotsQuery = query(
        collection(db, "slots"),
        where("ref_id", "==", doc.ref)
      );
      const slotsSnapshot = await getDocs(slotsQuery);
      const slots = [];
      if (carouselSnapshot.empty) {
        console.log("No matching slots found");
        return;
      }
      slotsSnapshot.forEach((slotDoc) => {
        slots.push(slotDoc.data());
      });
      setSlotsData(slots[0]?.slot);
    }
  } catch (error) {
    console.log("Error fetching data", error);
  }
};
  const handleLocation = async () => {
    const url = "https://maps.app.goo.gl/pdrCCxDTFmnMGyWq6";
    const supported = await Linking.canOpenURL(url);
    if (supported) {
      await Linking.openURL(url);
    } else {
      Alert.alert("Location services not enabled");
    }
  };
  useEffect(() => {
    getRestaurantData();

  }, []);

  return (
    <SafeAreaView
      style={[
        { backgroundColor: "#040720" },
        Platform.OS === "android" && { paddingBottom: 50 },
      ]}
    >
      <ScrollView className=" h-full">
        <View className="flex-1 my-2 p-1 ">
          <Text className="text-[#dc143c] text-center text-2xl font-semibold  ">
            {restaurant}
          </Text>
          <View className="border-b-2 border-[#dc143c] " />
        </View>
        <View className="h-64 max-w-[98%] mx-2 rounded-[25px]">
          <FlatList
            ref={flatListRef}
            data={carouselData[0]?.images}
            renderItem={carouselItem}
            horizontal
            scrollEnabled={false}
            showsHorizontalScrollIndicator={false}
            style={{ borderRadius: 25 }}
          />
        </View>
        <View className="flex-1 flex-row mt-2 p-2">
          <Ionicons name="location-sharp" size={24} color="#dc143c" />
          <Text className="max-w-[75%] text-white">
            {restaurantData?.address} |{"  "}
            <Text
              onPress={handleLocation}
              className="underline flex items-center mt-1 text-[#dc143c] italic font-semibold"
            >
              Get Direction
            </Text>
          </Text>
        </View>
        <View className="flex-1 flex-row p-2">
          <Ionicons name="time" size={20} color="#dc143c" />
          <Text className="max-w-[75%] mx-2 font-semibold text-white">
            {restaurantData?.opening} - {restaurantData?.closing}
          </Text>
        </View>
        <View className="flex-1 border m-2 p-2 border-[#040720] rounded-lg">
          <View className="flex-1 flex-row m-2 p-2 justify-end items-center">
            <View className="flex-1 flex-row">
              <Ionicons name="calendar" size={20} color="#dc143c" />
              <Text className="text-white mx-2 text-base">
                Select booking date
              </Text>
            </View>
            <DatePickerComponent date={date} setDate={setDate} />
          </View>
          <View className="flex-1 flex-row bg-[#040720] rounded-lg  m-2 p-2 justify-end items-center">
            <View className="flex-1 flex-row">
              <Ionicons name="people" size={20} color="#dc143c" />
              <Text className="text-white mx-2 text-base">
                Select number of guests
              </Text>
            </View>
            <GuestPickerComponent
              selectedNumber={selectedNumber}
              setSelectedNumber={setSelectedNumber}
            />
          </View>
        </View>
        <View className="flex-1 ">
          <FindSlots
            restaurant={restaurant}
            date={date}
            selectedNumber={selectedNumber}
            slots={slotsData}
            selectedSlot={selectedSlot}
            setSelectedSlot={setSelectedSlot}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
