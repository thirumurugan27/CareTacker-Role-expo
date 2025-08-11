// components/Notification.tsx
import React, {useState, useRef, useEffect} from "react";
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
  Animated,
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
  const [localNotifications, setLocalNotifications] =
    useState<NotificationGroup[]>(notifications);

  // Animation refs for fade out
  const animationRefs = useRef<{[key: string]: Animated.Value}>({}).current;

  // Create refs for each notification
  useEffect(() => {
    localNotifications.forEach((group) => {
      group.data.forEach((item) => {
        const key = `${group.date}-${item.id}`;
        if (!animationRefs[key]) {
          animationRefs[key] = new Animated.Value(1);
        }
      });
    });
  }, [localNotifications]);

  const handleDelete = (groupDate: string, id: number) => {
    const key = `${groupDate}-${id}`;
    const anim = animationRefs[key];
    if (!anim) return;

    Animated.timing(anim, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      setLocalNotifications((prev) =>
        prev
          .map((group) => ({
            ...group,
            data: group.data.filter((item) => item.id !== id),
          }))
          .filter((group) => group.data.length > 0)
      );
    });
  };

  const hasNotifications = localNotifications.length > 0;

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

            {/* Top-right modal close button */}
            <View
              pointerEvents="box-none"
              style={{
                width: 40,
                height: 40,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <TouchableOpacity
                onPress={onClose}
                hitSlop={{top: 10, bottom: 10, left: 10, right: 10}}
                style={{
                  width: 36,
                  height: 36,
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Text className="text-black text-xl font-bold">✕</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Notifications */}
          {hasNotifications ? (
            <ScrollView showsVerticalScrollIndicator={false}>
              {localNotifications.map((group) => (
                <View key={group.date} className="mb-4">
                  {/* Date Title */}
                  <Text className="text-base text-[#4A5B9B] font-semibold mb-2">
                    {group.date}
                  </Text>

                  {group.data.map((item) => {
                    const key = `${group.date}-${item.id}`;
                    const animValue =
                      animationRefs[key] || new Animated.Value(1);

                    return (
                      <Animated.View
                        key={item.id}
                        style={{
                          opacity: animValue,
                          transform: [
                            {
                              translateY: animValue.interpolate({
                                inputRange: [0, 1],
                                outputRange: [-20, 0],
                              }),
                            },
                          ],
                          borderBottomWidth: 1,
                          borderBottomColor: "#e0e0e0",
                        }}
                        className="py-3 relative"
                      >
                        {/* Close button for each notification */}
                        <View
                          pointerEvents="box-none"
                          style={{
                            position: "absolute",
                            right: 0,
                            top: 8,
                            zIndex: 10,
                          }}
                        >
                          <TouchableOpacity
                            onPress={() => {
                              handleDelete(group.date, item.id);
                              console.log("msg deleted");
                            }}
                            hitSlop={{
                              top: 10,
                              bottom: 10,
                              left: 10,
                              right: 10,
                            }}
                            style={{
                              width: 20,
                              height: 20,
                              borderRadius: 18,
                              backgroundColor: "#2A366333",
                              alignItems: "center",
                              justifyContent: "center",
                            }}
                          >
                            <Image
                              style={{alignSelf: "center"}}
                              resizeMode="contain"
                              className="w-3 h-3"
                              source={require("../../assets/Icons/close.png")}
                            />
                          </TouchableOpacity>
                        </View>

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
                      </Animated.View>
                    );
                  })}
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
