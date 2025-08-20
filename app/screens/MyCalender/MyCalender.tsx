import { Image, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import ScreenLayout from '../../components/ScreenLayout/ScreenLayout'

const MyCalender = () => {
    const datas = [
      {
        date: "07-03-2025",
        data: [
          {
            id: 1,
            type: "Complaint",
            message: "Electric issue",
            status: "Resolved",
          },
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
          {
            id: 3,
            type: "Complaint",
            message: "Water leakage",
            status: "Pending",
          },
        ],
      },
      {
        date: "05-03-2025",
        data: [
          {
            id: 4,
            type: "Complaint",
            message: "Water leakage",
            status: "Pending",
          },
          {
            id: 5,
            type: "Complaint",
            message: "Water leakage",
            status: "Pending",
          },
        ],
      },
      {
        date: "04-03-2025",
        data: [
          {
            id: 6,
            type: "Complaint",
            message: "Water leakage",
            status: "Pending",
          },
          {
            id: 7,
            type: "Complaint",
            message: "Water leakage",
            status: "Pending",
          },
        ],
      },
    ];
  return (
    <ScreenLayout title="My Calender">
        {/* top two rows */}
      <View className="flex-col mx-2 mt-2">
        {/* first row */}
        <View className=" flex-row justify-between  border-b-hairline border-gray-300 h-16 ">
          <View className="h-full  w-[60%] items-center  flex-row justify-between">
            <Text className="text-lg ml-3">Month</Text>
            <View className="flex-row items-center h-full gap-3">
              <Pressable className=" justify-center items-center w-11 h-full">
                <Image
                  resizeMode="contain"
                  className="h-4 w-6"
                  source={require("../../assets/Icons/blueBackArrow.png")}
                />
              </Pressable>
              <Pressable className="justify-center items-center w-11 h-full">
                <Image
                  resizeMode="contain"
                  className="h-4 w-6"
                  source={require("../../assets/Icons/blueFrontArrow.png")}
                />
              </Pressable>
            </View>
          </View>
          <View className=" h-full w-[40%] flex-row justify-between items-center px-4"></View>
        </View>
        {/* second row */}
        <View className=" h-16 justify-end">
          <View className="h-full items-center  flex-row justify-end">
            <Text className="text-lg  mr-2">27-06-2007</Text>
            <View className="flex-row items-center h-full gap-3">
              <Pressable className=" justify-center items-center w-11 h-full">
                <Image
                  resizeMode="contain"
                  className="h-4 w-6"
                  source={require("../../assets/Icons/blueBackArrow.png")}
                />
              </Pressable>
              <Pressable className="justify-center items-center w-11 h-full">
                <Image
                  resizeMode="contain"
                  className="h-4 w-6"
                  source={require("../../assets/Icons/blueFrontArrow.png")}
                />
              </Pressable>
            </View>
          </View>
        </View>
        {/* Calendar content */}
        <View>
        <ScrollView className='bg-green-400'>
            
        </ScrollView>
        </View>
      </View>
    </ScreenLayout>
  );
}

export default MyCalender