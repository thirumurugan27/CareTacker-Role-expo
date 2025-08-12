import React, {useState} from "react";
import {View, Text, Pressable, Modal, FlatList, TextInput} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import {Feather} from "@expo/vector-icons";

const MealMenuModal = ({visible, onClose}) => {
  const [selectedMeal, setSelectedMeal] = useState("Dinner");
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [feedbackVisible, setFeedbackVisible] = useState(false);
  const [feedbackText, setFeedbackText] = useState("");

  const mealMenus = {
    Breakfast: ["Idli", "Dosa", "Sambar", "Coconut Chutney", "Tea/Coffee"],
    Lunch: ["Rice", "Sambar", "Vegetable Curry", "Curd", "Papad"],
    Dinner: [
      "Bread Jam",
      "Butter",
      "Semiya Uppuma",
      "Coconut Chutney",
      "Coffee/Milk/Tea",
    ],
  };

  const formatDate = (date) =>
    `${date.getDate().toString().padStart(2, "0")}-${(date.getMonth() + 1)
      .toString()
      .padStart(2, "0")}-${date.getFullYear()}`;

  const getDayOfWeek = (date) =>
    [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ][date.getDay()];

  return (
    <Modal className="min-[50%]" transparent visible={visible} animationType="fade">
      <View className="flex-1 bg-black/50 justify-center items-center">
        <View className="w-[85%] bg-white p-5 rounded-lg">
          {/* Header */}
          <View className="flex-row justify-between items-center w-full mb-4">
            <Text className="text-lg font-medium text-black text-center flex-1">
              Menu
            </Text>
            <Pressable
              onPress={onClose}
              className="w-8 h-8 rounded-full bg-gray-300 justify-center items-center"  
            >
              <Text className="text-black text-lg">✕</Text>
            </Pressable>
          </View>

          {/* Date Row */}
          <View className="flex-row items-center justify-between w-full mb-4">
            <Text className="text-base text-gray-700">
              {getDayOfWeek(selectedDate)} ({formatDate(selectedDate)})
            </Text>
            <Pressable onPress={() => setShowDatePicker(true)}>
              <Feather name="calendar" size={24} color="#6B7280" />
            </Pressable>
          </View>

          {showDatePicker && (
            <DateTimePicker
              value={selectedDate}
              mode="date"
              display="default"
              onChange={(event, date) => {
                setShowDatePicker(false);
                if (date) setSelectedDate(date);
              }}
            />
          )}

          {/* Meal Selection Tabs */}
          <View className="w-full mb-4">
            <View className="flex-row justify-around w-full">
              {["Breakfast", "Lunch", "Dinner"].map((meal) => {
                const isSelected = selectedMeal === meal;
                return (
                  <Pressable key={meal} onPress={() => setSelectedMeal(meal)}>
                    <Text
                      className={`text-base ${
                        isSelected
                          ? "text-[#2A3663] border-b-2 border-[#2A3663] pb-1"
                          : "text-gray-500"
                      }`}
                    >
                      {meal}
                    </Text>
                  </Pressable>
                );
              })}
            </View>
            <View className="h-px bg-gray-300 my-2 w-full" />
          </View>

          {/* Meal Menu List */}
          <FlatList
            data={mealMenus[selectedMeal]}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({item}) => (
              <Text className="text-base py-2 text-gray-800">{item}</Text>
            )}
            contentContainerStyle={{
              width: "100%",
            }}
          />

          {/* Feedback Button */}
          <Pressable
            className="self-center mt-5 bg-primary p-3 w-[50%] rounded-md border border-gray-300"
            onPress={() => setFeedbackVisible(true)}
          >
            <Text className="text-white text-center">Give Feedback</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
};

export default MealMenuModal;
