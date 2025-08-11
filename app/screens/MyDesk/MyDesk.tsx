import React, {useState, useEffect} from "react";
import {View, Text, Pressable, Image, BackHandler} from "react-native";
import {SafeAreaView} from "react-native-safe-area-context";
import Notification from "../../components/Notification/Notification";
import {router} from "expo-router"; // ✅ Import router

const notifications = [
  {
    date: "07-03-2025",
    data: [
      {id: 1, type: "Complaint", message: "Electric issue", status: "Resolved"},
      {
        id: 2,
        type: "Leave",
        message: "05:00 PM - 06:00 PM",
        status: "Approved",
      },
    ],
  },
  {
    date: "06-03-2025",
    data: [
      {id: 3, type: "Complaint", message: "Water leakage", status: "Pending"},
    ],
  },
];

const MyDesk = () => {
  const [mealModalVisible, setMealModalVisible] = useState(false);
  const [showNotification, setShowNotification] = useState(false);

  useEffect(() => {
    const onBackPress = () => {
      if (showNotification) {
        setShowNotification(false);
        return true; // prevent default back
      }
      if (mealModalVisible) {
        setMealModalVisible(false);
        return true;
      }
      router.back(); // ✅ go back if no modal is open
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      onBackPress
    );
    return () => backHandler.remove();
  }, [showNotification, mealModalVisible]);

  return (
    <SafeAreaView className="flex-1 bg-white p-5">
      {/* Top Row */}
      <View className="flex-row items-center justify-between mb-10 -mt-[1px]">
        {/* Back arrow */}
        <Pressable
          className="mr-3 h-11 w-11"
          onPress={() => router.back()} // ✅ go back on click
        >
          <Image
            source={require("../../assets/Icons/backarrowrounded.png")}
            className="w-full h-full"
            resizeMode="contain"
          />
        </Pressable>

        <Pressable
          className="w-[42px] h-[42px] bg-[#2A366333] rounded-full items-center justify-center relative"
          onPress={() => setShowNotification(true)}
        >
          <Image
            source={require("../../assets/Icons/announce.png")}
            className="w-7 h-7"
            resizeMode="contain"
          />
          {notifications.length > 0 && (
            <View className="bg-red-600 w-[10px] h-[10px] rounded-full absolute top-[0px] right-[0px]" />
          )}
        </Pressable>
      </View>

      {/* Header row */}
      <View className="flex-row justify-between items-center mb-8">
        <Text className="text-[16px] text-[#2A366399]">My desk</Text>
        <Pressable className="flex-row items-center border border-gray-200 rounded-lg p-2">
          <Text className="text-[16px] text-[#2A366399]">My calendar</Text>
          <Image
            source={require("../../assets/Icons/calendar.png")}
            className="ml-2 w-5 h-5"
            resizeMode="contain"
          />
        </Pressable>
      </View>

      {/* Main Cards */}
      <View className="flex-row justify-around">
        <Pressable
          onPress={() => router.push("/components/FileComplaint/FileComplaint")}
          className="items-center p-5 rounded-lg bg-white w-[140px] shadow"
          style={{
            shadowColor: "#000",
            shadowOffset: {width: -2, height: 4},
            shadowOpacity: 0.9,
            shadowRadius: 6,
            elevation: 6,
          }}
        >
          <Image
            source={require("../../assets/Icons/filecomplaint.png")}
            className="w-7 h-7 my-3"
            resizeMode="contain"
          />
          <Text className="mt-2 text-[14px] text-primary">File complaints</Text>
        </Pressable>

        <Pressable
          onPress={() => router.push("/components/LeaveApply/LeaveApplyPage")}
          className="items-center p-5 rounded-lg bg-white w-[140px] shadow"
          style={{
            shadowColor: "#000",
            shadowOffset: {width: -2, height: 4},
            shadowOpacity: 0.9,
            shadowRadius: 6,
            elevation: 6,
          }}
        >
          <Image
            source={require("../../assets/Icons/applyleave.png")}
            className="w-7 h-7 my-3"
            resizeMode="contain"
          />
          <Text className="mt-2 text-[14px] text-primary">Apply leave</Text>
        </Pressable>
      </View>

      {/* Floating Buttons */}
      <View className="absolute bottom-[32px] right-[16px]">
        <Pressable className="h-[56px] w-[56px] bg-[#4A5B9B] mb-4 rounded-2xl items-center justify-center">
          <Image
            source={require("../../assets/Icons/status.png")}
            className="w-full h-full"
            resizeMode="contain"
          />
        </Pressable>

        <Pressable
          className="h-[56px] w-[56px] bg-[#4A5B9B] rounded-2xl items-center justify-center"
          onPress={() => setMealModalVisible(true)}
        >
          <Image
            source={require("../../assets/Icons/menu.png")}
            className="w-full h-full"
            resizeMode="contain"
          />
        </Pressable>
      </View>

      {/* Notification Modal */}
      <Notification
        visible={showNotification}
        onClose={() => setShowNotification(false)}
        notifications={notifications}
      />
    </SafeAreaView>
  );
};

export default MyDesk;
