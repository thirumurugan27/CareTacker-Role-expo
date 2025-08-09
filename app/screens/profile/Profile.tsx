import React from "react";
import {View, Text, Image, Pressable, StatusBar, Platform} from "react-native";
import {SafeAreaView} from "react-native-safe-area-context";
import {useNavigation} from "@react-navigation/native";
import { router } from "expo-router";

const profileData = {
  name: "Caretaker name",
  id: "7376232CT001",
  email: "caretakername@bitsathy.ac.in",
  designation: "Care Taker",
  contact: "9876543210",
  image: "https://randomuser.me/api/portraits/men/0.jpg",
};

const Profile = () => {
  const navigation = useNavigation();

  return (
    <SafeAreaView className="flex-1 bg-white">
      {/* StatusBar Background Fix for Android */}
      <StatusBar
        barStyle="dark-content"
        backgroundColor="red"
        translucent={false}
      />

      {/* Header */}
      <View className="bg-[#4B5CA2] h-[60px] pt-4 pb-3 px-0 flex-row items-center justify-start">
        <Pressable
          onPress={() => {
            router.push('/screens/Home/Home');
            console.log("Back pressed");
          }}
          className="pl-4 pr-2 py-2"
          hitSlop={10}
        >
          <Image
            source={require("../../assets/Images/backarrow.png")}
            className="w-11 h-11"
          />
        </Pressable>
        <Text className="text-white text-[18px] font-semibold absolute left-1/2 -translate-x-1/2">
          Profile
        </Text>
      </View>

      {/* Profile Image */}
      <View className="items-center mt-7">
        <Image
          source={{uri: profileData.image}}
          className="w-28 h-28 rounded-full"
        />
      </View>

      {/* Profile Info */}
      <View className="mt-8 px-6 mb-3">
        <View className="mb-6">
          <Text className="text-[#64748B] font-medium text-[15px] mb-2">
            Name
          </Text>
          <Text className="text-black text-[16px]">{profileData.name}</Text>
        </View>
        <View className="mb-6">
          <Text className="text-[#64748B] font-medium text-[15px] mb-1">
            ID
          </Text>
          <Text className="text-black text-[16px]">{profileData.id}</Text>
        </View>
        <View className="mb-6">
          <Text className="text-[#64748B] font-medium text-[15px] mb-1">
            Email ID
          </Text>
          <Text className="text-black text-[16px]">{profileData.email}</Text>
        </View>
        <View className="flex-row justify-between mt-2">
          <View>
            <Text className="text-[#64748B] font-medium text-[15px] mb-1">
              Designation
            </Text>
            <Text className="text-black text-[16px]">
              {profileData.designation}
            </Text>
          </View>
          <View>
            <Text className="text-[#64748B] font-medium text-[15px] mb-1">
              Contact no
            </Text>
            <Text className="text-black text-[16px]">
              {profileData.contact}
            </Text>
          </View>
        </View>
      </View>

      {/* Logout Button */}
      <View className="items-center mt-14">
        <Pressable className="bg-[#4B5CA2] px-10 py-3 rounded-xl">
          <Text className="text-white font-medium text-[17px]">Log out</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

export default Profile;
