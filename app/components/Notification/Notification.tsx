// components/Notification.tsx
import React from "react";
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
} from "react-native";

type NotificationItem = {
  id: number;
  type: string;
  message: string;
  status: string;
};

type NotificationGroup = {
  date: string;
  data: NotificationItem[];
};

type NotificationProps = {
  visible: boolean;
  onClose: () => void;
  notifications: NotificationGroup[];
};

const Notification: React.FC<NotificationProps> = ({
  visible,
  onClose,
  notifications,
}) => {
  const hasNotifications = notifications && notifications.length > 0;

  return (
    <Modal
      transparent
      visible={visible}
      animationType="fade"
      onRequestClose={onClose}
    >
      <View className="flex-1 bg-black/40 justify-center items-center">
        <View className="bg-white rounded-lg w-[90%] h-[75%] p-5">
          {/* Header */}
          <View className="flex-row justify-between items-center mb-4">
            <View className="flex-1 items-center ml-8">
              <Text className="text-base font-bold text-black text-center">
                Notification
              </Text>
            </View>
            <TouchableOpacity onPress={onClose} >
              <View className="w-8 h-8 items-center justify-center">
                <Text className="text-black text-xl font-bold">✕</Text>
              </View>
            </TouchableOpacity>
          </View>

          {/* Notifications */}
          {hasNotifications ? (
            <ScrollView showsVerticalScrollIndicator={false}>
              {notifications.map((group) => (
                <View key={group.date} className="mb-4">
                  {/* Date Title */}
                  <Text className="text-base text-[#4A5B9B] font-semibold mb-2">
                    {group.date}
                  </Text>

                  {group.data.map((item, index) => {
                    const isLast = index === group.data.length - 1;

                    return (
                      <View
                        key={item.id}
                        className={`py-3 relative ${
                          !isLast ? "border-b border-gray-200" : ""
                        }`}
                      >
                        {/* Close button */}
                        <TouchableOpacity className="absolute right-0 top-2 bg-slate-300 w-5 h-5 rounded-full items-center justify-center">
                          <Text className="text-primary text-xs font-black">
                            ✕
                          </Text>
                        </TouchableOpacity>

                        {/* Type */}
                        <Text className="text-base text-primary font-semibold mb-1">
                          {item.type}
                        </Text>

                        {/* Message & Status */}
                        <View className="flex-row justify-between items-center">
                          <Text className="text-sm text-black flex-1 mr-4">
                            {item.message}
                          </Text>
                          <Text className="bg-[#f1f4ff] text-primary text-sm font-medium px-2 py-1 rounded-md">
                            {item.status}
                          </Text>
                        </View>
                      </View>
                    );
                  })}

                  {/* Bold bottom divider under group */}
                  <View className="border-b-2 border-gray-300 mt-2" />
                </View>
              ))}
            </ScrollView>
          ) : (
            <View className="items-center mt-[10%]">
              <Image
                source={require("../../assets/Images/notificationBG.png")}
                className="w-4/5 h-4/6 my-2 self-center"
                resizeMode="contain"
              />
              <Text className="text-center text-base font-bold text-black mt-2">
                There is no notification right now
              </Text>
              <Text className="text-center text-base text-gray-400 mt-2">
                We'll notify you when you have notifications
              </Text>
            </View>
          )}
        </View>
      </View>
    </Modal>
  );
};

export default Notification;
