import React, {useState} from "react";
import {View, Text, Pressable, ScrollView, Platform, Image} from "react-native";
import {SafeAreaView} from "react-native-safe-area-context";
import {StatusBar} from "expo-status-bar";

export default function Status() {
  const [tab, setTab] = useState<"Leave" | "Complaint">("Leave");

  const leaves = {
    current: [
      {
        id: 1,
        startDate: "2025-08-15",
        startTime: "07:00 AM",
        endDate: "2025-08-16",
        endTime: "08:00 PM",
        alterWardenName: "Ms. Anitha",
        alterWardenApproval: false,
        hostelManagerName: "Mr. Ravi",
        hostelManagerApproval: false,
        reason: "Personal work",
      },
    ],
    previous: [
      {
        id: 2,
        startDate: "2025-08-10",
        startTime: "08:30 AM",
        endDate: "2025-08-12",
        endTime: "05:00 PM",
        alterWardenName: "Mr. Kumar",
        alterWardenApproval: true,
        hostelManagerName: "Ms. Priya",
        hostelManagerApproval: true,
        reason: "Family function",
      },
      {
        id: 3,
        startDate: "2025-09-01",
        startTime: "09:00 AM",
        endDate: "2025-09-03",
        endTime: "06:00 PM",
        alterWardenName: "Mr. Raj",
        alterWardenApproval: true,
        hostelManagerName: "Mr. David",
        hostelManagerApproval: true,
        reason: "Medical checkup",
      },
      {
        id: 4,
        startDate: "2025-10-05",
        startTime: "06:30 AM",
        endDate: "2025-10-07",
        endTime: "07:30 PM",
        alterWardenName: "Mr. Arun",
        alterWardenApproval: true,
        hostelManagerName: "Ms. Shalini",
        hostelManagerApproval: true,
        reason: "Festival celebration",
      },
      {
        id: 5,
        startDate: "2025-11-20",
        startTime: "05:00 PM",
        endDate: "2025-11-22",
        endTime: "09:00 AM",
        alterWardenName: "Ms. Lakshmi",
        alterWardenApproval: true,
        hostelManagerName: "Mr. Suresh",
        hostelManagerApproval: true,
        reason: "Urgent family visit",
      },
    ],
  };
  const complaints = {
    current: [
      {
        id: 1,
        date: "2025-08-05",
        type: "Room Complaint",
        reason: "Electrical wiring issue",
        status: "waiting",
      },
    ],
    previous: [
      {
        id: 2,
        date: "2025-07-28",
        type: "Room Complaint",
        reason: "Broken door lock",
        status: "resolved",
      },
      {
        id: 3,
        date: "2025-07-20",
        type: "Others",
        reason: "WiFi not working",
        status: "resolved",
      },
      {
        id: 4,
        date: "2025-07-10",
        type: "Mess Complaint",
        reason: "Food quality issue",
        status: "resolved",
      },
      {
        id: 5,
        date: "2025-07-02",
        type: "Room Complaint",
        reason: "Leaking ceiling",
        status: "resolved",
      },
    ],
  };

  return (
    <View style={{flex: 1, backgroundColor: "#4A5B9B"}}>
      {/* Status bar overlay */}
      <StatusBar style="light" />

      {/* Safe area to handle notch */}
      <SafeAreaView style={{flex: 1}}>
        {/* Header */}
        <View className="flex-row items-center px-4 h-[56px] bg-primary">
          <Pressable>
            <Image
              source={require("../../assets/Icons/backarrow.png")}
              className="h-10 w-10"
            />
          </Pressable>
          <Text className="flex-1 text-center text-white text-xl font-semibold mr-4">
            Status
          </Text>
          <View style={{width: 20}} />
        </View>

        {/* White content area */}
        <View className="flex-1 bg-[#F7F8FA]  overflow-hidden">
          {/* Tabs */}
          <View className="flex-row justify-center mt-7 mb-3">
            <Pressable className="mx-4" onPress={() => setTab("Leave")}>
              <Text
                className={`text-lg font-medium ${
                  tab === "Leave" ? "text-lettergreen" : "text-gray-400"
                }`}
              >
                Leave
              </Text>
              {tab === "Leave" && (
                <View className="h-[2px] bg-lettergreen mt-1" />
              )}
            </Pressable>
            <Pressable className="mx-4" onPress={() => setTab("Complaint")}>
              <Text
                className={`text-lg font-medium ${
                  tab === "Complaint" ? "text-lettergreen" : "text-gray-400"
                }`}
              >
                Complaint
              </Text>
              {tab === "Complaint" && (
                <View className="h-[2px] bg-lettergreen mt-1" />
              )}
            </Pressable>
          </View>

          <ScrollView className="p-4 mb-6">
            {tab === "Leave" ? (
              <>
                {/* Current Leave */}
                {leaves.current.map((leave, index) => (
                  <View
                    key={leave.id}
                    className="bg-white p-4 rounded-lg shadow-sm mb-4"
                  >
                    {/* Number and Dates */}
                    <View className="flex-row items-center mb-3">
                      <Text className="mr-2 font-semibold">{index + 1}.</Text>
                      <View className="flex-row items-center">
                        <View className="rounded-lg px-2 py-2 bg-gray-50">
                          <Text>{leave.startDate}</Text>
                          <Text className="text-sm">{leave.startTime}</Text>
                        </View>
                        <Text className="mx-1">-</Text>
                        <View className="rounded-lg px-2 py-2 bg-gray-50">
                          <Text>{leave.endDate}</Text>
                          <Text className="text-sm">{leave.endTime}</Text>
                        </View>
                        <View className="justify-center items-center">
                          <Text className="text-gray-500 text-sm ml-4">
                            {leave.reason}
                          </Text>
                        </View>
                      </View>
                    </View>

                    {/* Approvals */}
                    <View className="bg-gray-50 rounded-xl p-3">
                      <Text className="font-semibold mb-2 text-center my-2">
                        Approvals
                      </Text>

                      {/* Alter Warden */}
                      <Text className="text-gray-500 mb-2">
                        Alter mess manager
                      </Text>
                      <View className="flex-row justify-between items-center mb-3">
                        <Text className="text-gray-800 mb-4">
                          {leave.alterWardenName}
                        </Text>
                        <View className="flex-row items-center">
                          {leave.alterWardenApproval ? (
                            <>
                              <Text className="text-lettergreen">Approved</Text>
                              <Image
                                source={require("../../assets/Icons/approvedtick.png")}
                                className="ml-2 h-[19.25px] w-[16.5px]"
                                style={{resizeMode: "contain"}}
                              />
                            </>
                          ) : (
                            <>
                              <Text className="text-txtyellow">Waiting</Text>
                              <Image
                                source={require("../../assets/Icons/clock.png")}
                                className="ml-2 h-[19.25px] w-[16.5px]"
                                style={{resizeMode: "contain"}}
                              />
                            </>
                          )}
                        </View>
                      </View>

                      {/* Hostel Manager */}
                      <Text className="text-gray-500 mb-2">Hostel manager</Text>
                      <View className="flex-row justify-between items-center mb-2">
                        <Text className="text-gray-800">
                          {leave.hostelManagerName}
                        </Text>
                        <View className="flex-row items-center">
                          {leave.hostelManagerApproval ? (
                            <>
                              <Text className="text-lettergreen">Approved</Text>
                              <Image
                                source={require("../../assets/Icons/approvedtick.png")}
                                className="ml-2 h-[19.25px] w-[16.5px]"
                                style={{resizeMode: "contain"}}
                              />
                            </>
                          ) : (
                            <>
                              <Text className="text-txtyellow">Waiting</Text>
                              <Image
                                source={require("../../assets/Icons/clock.png")}
                                className="ml-2 h-[19.25px] w-[16.5px]"
                                style={{resizeMode: "contain"}}
                              />
                            </>
                          )}
                        </View>
                      </View>
                    </View>

                    {/* Cancel button */}
                    <Pressable
                      style={{alignSelf: "center"}}
                      className="bg-[#4B5CA2] rounded-lg mt-4 py-2.5 w-[50%]"
                    >
                      <Text className="text-center text-white">Cancel</Text>
                    </Pressable>
                  </View>
                ))}

                {/* Previous Leave */}
                <Text className="text-gray-400 mb-2">Previous leave</Text>
                {leaves.previous.map((leave, index) => (
                  <View
                    key={leave.id}
                    className="bg-white p-4 rounded-lg shadow-sm mb-4"
                  >
                    {/* Number and Dates */}
                    <View className="flex-row items-center mb-3">
                      <Text className="mr-2 font-semibold">{index + 1}.</Text>
                      <View className="flex-row items-center">
                        <View className="rounded-lg px-2 py-2 bg-gray-50">
                          <Text>{leave.startDate}</Text>
                          <Text className="text-sm">{leave.startTime}</Text>
                        </View>
                        <Text className="mx-1">-</Text>
                        <View className="rounded-lg px-2 py-2 bg-gray-50">
                          <Text>{leave.endDate}</Text>
                          <Text className="text-sm">{leave.endTime}</Text>
                        </View>
                        <View className="justify-center items-center">
                          <Text className="text-gray-500 text-sm ml-4">
                            {leave.reason}
                          </Text>
                        </View>
                      </View>
                    </View>

                    {/* Approvals */}
                    <View className=" rounded-xl p-3">
                      {/* Alter Warden */}
                      <Text className="text-gray-500 mb-2">
                        Alter mess manager
                      </Text>
                      <View className="flex-row justify-between items-center mb-3">
                        <Text className="text-gray-800 mb-4">
                          {leave.alterWardenName}
                        </Text>
                        <View className="flex-row items-center">
                          {leave.alterWardenApproval ? (
                            <>
                              <Text className="text-lettergreen">Approved</Text>
                              <Image
                                source={require("../../assets/Icons/approvedtick.png")}
                                className="ml-2 h-[19.25px] w-[16.5px]"
                                style={{resizeMode: "contain"}}
                              />
                            </>
                          ) : (
                            <>
                              <Text className="text-txtyellow">Waiting</Text>
                              <Image
                                source={require("../../assets/Icons/clock.png")}
                                className="ml-2 h-[19.25px] w-[16.5px]"
                                style={{resizeMode: "contain"}}
                              />
                            </>
                          )}
                        </View>
                      </View>

                      {/* Hostel Manager */}
                      <Text className="text-gray-500 mb-2">Hostel manager</Text>
                      <View className="flex-row justify-between items-center mb-2">
                        <Text className="text-gray-800">
                          {leave.hostelManagerName}
                        </Text>
                        <View className="flex-row items-center">
                          {leave.hostelManagerApproval ? (
                            <>
                              <Text className="text-lettergreen">Approved</Text>
                              <Image
                                source={require("../../assets/Icons/approvedtick.png")}
                                className="ml-2 h-[19.25px] w-[16.5px]"
                                style={{resizeMode: "contain"}}
                              />
                            </>
                          ) : (
                            <>
                              <Text className="text-txtyellow">Waiting</Text>
                              <Image
                                source={require("../../assets/Icons/clock.png")}
                                className="ml-2 h-[19.25px] w-[16.5px]"
                                style={{resizeMode: "contain"}}
                              />
                            </>
                          )}
                        </View>
                      </View>
                    </View>
                  </View>
                ))}
              </>
            ) : (
              <>
                {/* Current Complaints */}
                {complaints.current.map((complaint, index) => (
                  <View
                    key={complaint.id}
                    className="bg-white p-4 rounded-lg shadow-sm mb-4"
                  >
                    {/* Number, Date & Type */}
                    <View className="flex-row justify-between items-center mb-3">
                      <View className="flex-row items-center">
                        <Text className="mr-2 font-semibold">{index + 1}.</Text>
                        <View className="rounded-lg px-2 py-2">
                          <Text>{complaint.date}</Text>
                        </View>
                      </View>
                      <Text className="text-gray-500">{complaint.type}</Text>
                    </View>

                    {/* Complaint Details */}
                    <View className="bg-gray-50 rounded-xl p-3">
                      {/* Reason + Status in the same row */}
                      <View className="flex-row justify-between items-center">
                        <View style={{flex: 1, paddingRight: 8}}>
                          <Text className="text-gray-500 mb-1">Reason</Text>
                          <Text className="text-gray-800">
                            {complaint.reason}
                          </Text>
                        </View>

                        <View className="flex-row items-center">
                          {complaint.status === "resolved" ? (
                            <>
                              <Text className="text-lettergreen">Resolved</Text>
                              <Image
                                source={require("../../assets/Icons/approvedtick.png")}
                                className="ml-2 h-[19.25px] w-[16.5px]"
                                style={{resizeMode: "contain"}}
                              />
                            </>
                          ) : (
                            <>
                              <Text className="text-txtyellow">Waiting</Text>
                              <Image
                                source={require("../../assets/Icons/clock.png")}
                                className="ml-2 h-[19.25px] w-[16.5px]"
                                style={{resizeMode: "contain"}}
                              />
                            </>
                          )}
                        </View>
                      </View>
                    </View>

                    {/* Cancel button */}
                    <Pressable
                      style={{alignSelf: "center"}}
                      className="bg-[#4B5CA2] rounded-lg mt-4 py-2.5 w-[50%]"
                    >
                      <Text className="text-center text-white">Cancel</Text>
                    </Pressable>
                  </View>
                ))}

                {/* Previous Complaints */}
                <Text className="text-gray-400 mb-2">Previous complaints</Text>
                {complaints.previous.map((complaint, index) => (
                  <View
                    key={complaint.id}
                    className="bg-white p-4 rounded-lg shadow-sm mb-4"
                  >
                    {/* Number, Date & Type */}
                    <View className="flex-row justify-between items-center mb-3">
                      <View className="flex-row items-center">
                        <Text className="mr-2 font-semibold">{index + 1}.</Text>
                        <View className="rounded-lg px-2 py-2">
                          <Text>{complaint.date}</Text>
                        </View>
                      </View>
                      <Text className="text-gray-500 text-base">
                        {complaint.type}
                      </Text>
                    </View>

                    {/* Complaint Details */}
                    <View className="bg-gray-50 rounded-xl p-3">
                      <View className="flex-row justify-between items-center">
                        <View style={{flex: 1, paddingRight: 8}}>
                          <Text className="text-gray-500 mb-1">Reason</Text>
                          <Text className="text-gray-800">
                            {complaint.reason}
                          </Text>
                        </View>

                        <View className="flex-row items-center">
                          {complaint.status === "resolved" ? (
                            <>
                              <Text className="text-lettergreen">Resolved</Text>
                              <Image
                                source={require("../../assets/Icons/approvedtick.png")}
                                className="ml-2 h-[19.25px] w-[16.5px]"
                                style={{resizeMode: "contain"}}
                              />
                            </>
                          ) : (
                            <>
                              <Text className="text-txtyellow">Waiting</Text>
                              <Image
                                source={require("../../assets/Icons/clock.png")}
                                className="ml-2 h-[19.25px] w-[16.5px]"
                                style={{resizeMode: "contain"}}
                              />
                            </>
                          )}
                        </View>
                      </View>
                    </View>
                  </View>
                ))}
              </>
            )}
          </ScrollView>
        </View>
      </SafeAreaView>
    </View>
  );
  
}
