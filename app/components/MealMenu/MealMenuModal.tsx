import React, {useState} from "react";
import {
  View,
  Text,
  Pressable,
  Modal,
  FlatList,
  TextInput,
} from "react-native";
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
    <Modal transparent visible={visible} animationType="fade">
      <View className="flex-1 bg-black/50 justify-center items-center">
        <View className="w-[85%] bg-white p-5 rounded-lg items-center">
          {/* Header */}
          <View className="flex-row justify-between items-center w-full mb-2 relative">
            <Text className="text-lg font-medium text-black text-center flex-1">
              Menu
            </Text>
            <Pressable
              onPress={onClose}
              className="absolute right-0 w-8 h-8 rounded-full bg-gray-300 justify-center items-center"
            >
              <Text className="text-black text-lg">✕</Text>
            </Pressable>
          </View>

          {/* Date Row */}
          <View className="flex-row items-center justify-between w-full my-2">
            <Text className="text-base text-black">
              {getDayOfWeek(selectedDate)}
            </Text>
            <Text className="text-sm text-gray-500 mr-4">
              ({formatDate(selectedDate)})
            </Text>
            <Pressable onPress={() => setShowDatePicker(true)}>
              <Feather name="calendar" size={24} color="black" />
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
          <View className="w-full my-2">
            <View className="flex-row justify-around w-full">
              {["Breakfast", "Lunch", "Dinner"].map((meal) => {
                const isSelected = selectedMeal === meal;
                return (
                  <Pressable
                    key={meal}
                    onPress={() => setSelectedMeal(meal)}
                  >
                    <Text
                      className={`text-base mr-2 ${
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
            <View className="h-px bg-black my-2 w-full" />
          </View>

          {/* Meal Menu List */}
          <FlatList
            data={mealMenus[selectedMeal]}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({item}) => (
              <Text className="text-base py-2 text-gray-800 text-left">
                {item}
              </Text>
            )}
            contentContainerStyle={{
              alignSelf: "flex-start",
              width: "100%",
              paddingLeft: 16,
            }}
          />

          {/* Feedback Button */}
          <Pressable
            className="mt-5 bg-[#E0E0E0] p-3 rounded-md border border-[#D0D8E0]"
            onPress={() => setFeedbackVisible(true)}
          >
            <Text className="text-[#7F94AA]">Give Feedback</Text>
          </Pressable>

          {/* Feedback Modal */}
          <Modal transparent visible={feedbackVisible} animationType="slide">
            <View className="flex-1 bg-black/50 justify-center items-center">
              <View className="bg-white w-[80%] p-5 rounded-lg items-center">
                <Text className="text-lg font-bold mb-2">Your Feedback</Text>
                <TextInput
                  style={{textAlignVertical: "top"}}
                  className="w-full h-24 border border-gray-400 rounded-md p-2"
                  placeholder="Write your feedback here..."
                  placeholderTextColor="gray"
                  multiline
                  value={feedbackText}
                  onChangeText={setFeedbackText}
                />
                <View className="flex-row justify-between w-full mt-2">
                  <Pressable
                    className="bg-blue-500 p-2 rounded-md"
                    onPress={() => {
                      console.log("Feedback Submitted:", feedbackText);
                      setFeedbackVisible(false);
                    }}
                  >
                    <Text className="text-white font-bold">Submit</Text>
                  </Pressable>
                  <Pressable
                    className="bg-red-500 p-2 rounded-md"
                    onPress={() => setFeedbackVisible(false)}
                  >
                    <Text className="text-white font-bold">Cancel</Text>
                  </Pressable>
                </View>
              </View>
            </View>
          </Modal>
        </View>
      </View>
    </Modal>
  );
};
export default MealMenuModal;
