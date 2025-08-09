// ApplyLeave.tsx
import React, {useState, useRef, useEffect} from "react";
import {
  View,
  Text,
  TextInput,
  Platform,
  ScrollView,
  KeyboardAvoidingView,
  StatusBar,
  Pressable,
  Image,
  Animated,
  Easing,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import {SafeAreaView} from "react-native-safe-area-context";

// Icons
const GoBackArrow = require("../../assets/Icons/backarrow.png");
const BioCalendar = require("../../assets/Icons/calendar.png");
const ClockIcon = require("../../assets/Icons/analogclock.png");
const DropDown = require("../../assets/Icons/dropdown.png");

type Props = {
  navigation: any;
};

const ApplyLeaveForm: React.FC<Props> = ({navigation}) => {
  const [leaveType, setLeaveType] = useState<string>("");
  const [showLeaveOptions, setShowLeaveOptions] = useState<boolean>(false);
  const [fromDate, setFromDate] = useState<string>("");
  const [toDate, setToDate] = useState<string>("");
  const [showFromDatePicker, setShowFromDatePicker] = useState(false);
  const [showToDatePicker, setShowToDatePicker] = useState(false);
  const [fromTime, setFromTime] = useState<string>("");
  const [toTime, setToTime] = useState<string>("");
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [timeType, setTimeType] = useState<string>("");
  const [reason, setReason] = useState<string>("");
  const [caretakerName, setCaretakerName] = useState<string>("");
  const [caretakerContact, setCaretakerContact] = useState<string>("");

  const leaveTypes = ["Leave", "OD", "Internal OD", "Internal Training"];

  // Animation
  const dropdownAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(dropdownAnim, {
      toValue: showLeaveOptions ? leaveTypes.length * 45 : 0, // height per item
      duration: 400, // slow drop down
      easing: Easing.ease,
      useNativeDriver: false,
    }).start();
  }, [showLeaveOptions]);

  const formatDate = (date: Date) => {
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const handleDateChange = (
    event: any,
    selectedDate: Date | undefined,
    type: "from" | "to"
  ) => {
    if (event?.type === "dismissed") {
      setShowFromDatePicker(false);
      setShowToDatePicker(false);
      return;
    }
    if (!selectedDate) return;
    const formattedDate = formatDate(selectedDate);
    if (type === "from") {
      setFromDate(formattedDate);
      setShowFromDatePicker(false);
    } else {
      setToDate(formattedDate);
      setShowToDatePicker(false);
    }
  };

  const handleTimeChange = (event: any, selectedTime: Date | undefined) => {
    if (event?.type === "dismissed") {
      setShowTimePicker(false);
      return;
    }
    if (!selectedTime) return;

    const hours = selectedTime.getHours();
    const minutes = selectedTime.getMinutes();
    const period = hours >= 12 ? "PM" : "AM";
    const formattedHours = (hours % 12 || 12).toString().padStart(2, "0");
    const formattedMinutes = minutes.toString().padStart(2, "0");
    const formattedTime = `${formattedHours}:${formattedMinutes} ${period}`;

    if (timeType === "from") {
      setFromTime(formattedTime);
    } else {
      setToTime(formattedTime);
    }
    setShowTimePicker(false);
  };

  return (
    <View style={{flex: 1, backgroundColor: "#4A5B9B"}}>
      <StatusBar barStyle="light-content" />
      <SafeAreaView className="flex-1">
        {/* Header */}
        <View className="flex-row items-center px-4 h-[56px] bg-primary">
          <Pressable onPress={() => navigation.goBack()}>
            <Image source={GoBackArrow} className="h-10 w-10" />
          </Pressable>
          <Text className="flex-1 text-center text-white text-xl font-semibold mr-4">
            Leave apply
          </Text>
        </View>

        <KeyboardAvoidingView
          className="flex-1 bg-white"
          behavior={Platform.OS === "ios" ? "padding" : undefined}
        >
          <ScrollView className="flex-1 bg-white px-5">
            {/* Leave Type */}
            <Text className="mt-4 text-[14px] text-gray-700 my-3">
              Leave Type
            </Text>
            <Pressable
              className="bg-[#D9E0E3] rounded-md h-[45px] px-3 flex-row justify-between items-center mt-1"
              onPress={() => setShowLeaveOptions(!showLeaveOptions)}
            >
              <Text
                className={`ml-1 ${leaveType ? "text-gray-700" : "text-gray-600"}`}
              >
                {leaveType || "Select leave type"}
              </Text>
              <Image source={DropDown} className="w-4 h-4" />
            </Pressable>

            {/* Animated Dropdown */}
            <Animated.View style={{overflow: "hidden", height: dropdownAnim}}>
              {leaveTypes.map((type) => (
                <Pressable
                  key={type}
                  className="bg-[#F3F4F6] py-2 px-3 rounded-md h-[40px] my-[2px]"
                  onPress={() => {
                    setLeaveType(type);
                    setShowLeaveOptions(false);
                  }}
                >
                  <Text className="text-gray-700">{type}</Text>
                </Pressable>
              ))}
            </Animated.View>

            {/* Dates */}
            <View className="flex-row items-end mt-4">
              {/* From Date */}
              <View className="w-[122px] mr-7">
                <Text className="text-[14px] text-gray-700 mb-1">
                  From Date
                </Text>
                <Pressable
                  className="bg-[#D9E0E3] rounded-md h-[45px] px-3 flex-row justify-between items-center"
                  onPress={() => setShowFromDatePicker(true)}
                >
                  <Text className={fromDate ? "text-black" : "text-gray-700"}>
                    {fromDate || "dd/mm/yyyy"}
                  </Text>
                </Pressable>
              </View>

              {/* To Date */}
              <View className="w-[122px] mr-4">
                <Text className="text-[14px] text-gray-700 mb-1">To Date</Text>
                <Pressable
                  className="bg-[#D9E0E3] rounded-md h-[45px] px-3 flex-row justify-between items-center"
                  onPress={() => setShowToDatePicker(true)}
                >
                  <Text className={toDate ? "text-black" : "text-gray-700"}>
                    {toDate || "dd/mm/yyyy"}
                  </Text>
                </Pressable>
              </View>

              {/* Calendar Icon */}
              <View className="h-[45px] w-[45px] justify-center items-center">
                <Image
                  source={BioCalendar}
                  className="w-7 h-7"
                  style={{resizeMode: "contain"}}
                />
              </View>
            </View>

            {showFromDatePicker && (
              <DateTimePicker
                value={new Date()}
                mode="date"
                display={Platform.OS === "ios" ? "spinner" : "default"}
                onChange={(e, date) => handleDateChange(e, date, "from")}
              />
            )}
            {showToDatePicker && (
              <DateTimePicker
                value={new Date()}
                mode="date"
                display={Platform.OS === "ios" ? "spinner" : "default"}
                onChange={(e, date) => handleDateChange(e, date, "to")}
              />
            )}

            {/* Times */}
            <View className="flex-row items-end mt-4">
              {/* From Time */}
              <View className="w-[122px] mr-7">
                <Text className="text-[14px] text-gray-700 mb-1">
                  From Time
                </Text>
                <Pressable
                  className="bg-[#D9E0E3] rounded-md h-[45px] px-3 flex-row justify-between items-center"
                  onPress={() => {
                    setTimeType("from");
                    setShowTimePicker(true);
                  }}
                >
                  <Text className={fromTime ? "text-black" : "text-gray-700"}>
                    {fromTime || "hh:mm"}
                  </Text>
                </Pressable>
              </View>

              {/* To Time */}
              <View className="w-[122px] mr-4">
                <Text className="text-[14px] text-gray-700 mb-1">To Time</Text>
                <Pressable
                  className="bg-[#D9E0E3] rounded-md h-[45px] px-3 flex-row justify-between items-center"
                  onPress={() => {
                    setTimeType("to");
                    setShowTimePicker(true);
                  }}
                >
                  <Text className={toTime ? "text-black" : "text-gray-700"}>
                    {toTime || "hh:mm"}
                  </Text>
                </Pressable>
              </View>

              {/* Clock Icon */}
              <View className="h-[45px] w-[45px] justify-center items-center">
                <Image
                  source={ClockIcon}
                  className="w-7 h-7"
                  style={{resizeMode: "contain"}}
                />
              </View>
            </View>

            {showTimePicker && (
              <DateTimePicker
                value={new Date()}
                mode="time"
                display={Platform.OS === "ios" ? "spinner" : "default"}
                onChange={handleTimeChange}
              />
            )}

            {/* Reason */}
            <Text className="mt-4 text-[14px] text-gray-700">Reason</Text>
            <TextInput
              className="bg-gray-50 border border-gray-200 shadow-slate-200 rounded-md p-2 h-[110px] mt-1 text-gray-700"
              placeholder="Enter your Reason"
              placeholderTextColor="#8A8A8A"
              value={reason}
              onChangeText={setReason}
              multiline
              textAlignVertical="top"
            />

            {/* Caretaker */}
            <View className="mb-10">
              <Text
                style={{alignSelf: "center"}}
                className="mt-6 text-black font-bold text-[15px]"
              >
                Alter caretaker details
              </Text>

              <Text className="mt-4 text-[14px] text-gray-700">Name</Text>
              <TextInput
                className="bg-[#D9E0E3] rounded-md px-3 h-12 mb-2 mt-2 text-gray-700"
                placeholder="Enter name"
                placeholderTextColor="#8A8A8A"
                value={caretakerName}
                onChangeText={setCaretakerName}
              />

              <Text className="mt-4 text-[14px] text-gray-700">Contact no</Text>
              <TextInput
                className="bg-[#D9E0E3] rounded-md px-3 h-12 mb-2 mt-2 text-gray-700"
                placeholder="Enter contact no"
                placeholderTextColor="#8A8A8A"
                keyboardType="phone-pad"
                value={caretakerContact}
                onChangeText={setCaretakerContact}
              />
            </View>

            {/* Buttons */}
            <View className="flex-row justify-end mb-8">
              {/* Cancel Button */}
              <Pressable
                onPress={() => navigation.goBack()}
                className="w-[100px] items-center justify-center border border-[#4A5B9B] rounded-lg h-12 mr-2"
              >
                <Text className="text-[#4A5B9B] font-bold">Cancel</Text>
              </Pressable>

              {/* Submit Button */}
              <Pressable
                className="w-[100px] items-center justify-center bg-[#4A5B9B] rounded-lg h-12"
                onPress={() => {}}
              >
                <Text className="text-white font-bold">Submit</Text>
              </Pressable>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </View>
  );
};

export default ApplyLeaveForm;
