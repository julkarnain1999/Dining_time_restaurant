import React, { useState } from "react";
import { TouchableOpacity, View, Text, Platform } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";

export default function DatePickerComponent({ date, setDate }) {

  const [show, setShow] = useState(false);

  const handleChange = (event, selectedDate) => {
    if (selectedDate) {
      setDate(selectedDate);
    }
    if (Platform.OS === "android") {
      setShow(false); // Hide picker on Android after selection
    }
  };

  return (
    <View className="flex flex-row space-x-1 ">
      {/* Button with selected date inside */}
      <TouchableOpacity
        onPress={() => setShow(true)}
        className="px-2 py-2 rounded-lg bg-transparent border border-[#dc143c]"
      >
        <Text className="text-white">
          {date ? date.toDateString() : "Pick a Date"}
        </Text>
      </TouchableOpacity>

      {/* Show Date Picker when needed */}
      {show && (
        <DateTimePicker
          value={date}
          mode="date"
          display="default"
          minimumDate={new Date()}
          maximumDate={new Date().setDate(new Date().getDate() + 7)}
          onChange={handleChange}
        />
      )}
    </View>
  );
}
