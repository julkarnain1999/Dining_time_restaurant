import { View, Text, TouchableOpacity } from "react-native";
import React from "react";

const GuestPickerComponent = ({ selectedNumber, setSelectedNumber }) => {
  const decrement = () => {
    if (selectedNumber > 1) setSelectedNumber(selectedNumber - 1);
  };
  const increment = () => {
    if (selectedNumber < 12) setSelectedNumber(selectedNumber + 1);
  };
  return (
    <View className="flex flex-row items-center rounded-lg text-white text-base">
      <TouchableOpacity onPress={decrement} className="rounded">
        <Text className="text-white text-lg border border-[#dc143c] rounded-l-lg px-3">
          -
        </Text>
      </TouchableOpacity>
      <Text className="px-3 text-white bg-[#040720] border border-[#474747] text-lg">
        {selectedNumber}
      </Text>
      <TouchableOpacity onPress={increment} className="rounded">
        <Text className="text-white text-lg border border-[#dc143c] rounded-r-lg px-3">
          +
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default GuestPickerComponent;
