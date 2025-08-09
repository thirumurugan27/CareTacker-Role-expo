import React, {useState} from "react";
import {
  View,
  Text,
  Image,
  Alert,
  TextInput,
  Pressable,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import {SafeAreaView} from "react-native-safe-area-context";
import {StatusBar} from "expo-status-bar";

const FileComplaint = () => {
  const [imageUri, setImageUri] = useState<string | null>(null);
  const [issue, setIssue] = useState("");

  const openCamera = async () => {
    const {status} = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== "granted") {
      Alert.alert("Permission Denied", "Camera permission is required!");
      return;
    }
    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });
    if (!result.canceled) {
      setImageUri(result.assets[0].uri);
    }
  };

  const openGallery = async () => {
    const {status} = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      Alert.alert("Permission Denied", "Gallery permission is required!");
      return;
    }
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });
    if (!result.canceled) {
      setImageUri(result.assets[0].uri);
    }
  };

  const handleUpload = () => {
    if (!imageUri) {
      Alert.alert("No Image", "Please select or take a picture first.");
      return;
    }
    Alert.alert("Upload", "Image uploaded successfully!");
  };

  return (
    <View style={{flex: 1, backgroundColor: "#4A5B9B"}}>
      <StatusBar style="light" />
      <SafeAreaView style={{flex: 1}}>
        <View className="flex-row items-center px-4 h-[56px] bg-primary">
          <Pressable>
            <Image
              source={require("../../assets/Icons/backarrow.png")}
              className="h-9 w-9"
            />
          </Pressable>
          <Text className="flex-1 text-center text-white text-xl font-semibold mr-4">
            File Complaint
          </Text>
          <View style={{width: 20}} />
        </View>

        {/* ✅ Wrap main form with KeyboardAvoidingView + ScrollView */}
        <KeyboardAvoidingView
          style={{flex: 1}}
          behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{flexGrow: 1}}
            keyboardShouldPersistTaps="handled"
          >
            <View className="flex-1 bg-white px-5 pt-8">
              <Text className="text-[14px] text-gray-600 font-medium mb-5">
                Upload Image
              </Text>

              <View className="bg-[#fafafa] justify-center rounded-xl border border-[#e5e5e5] p-5 mb-6">
                <View className="flex-row justify-between mb-4">
                  <Pressable
                    className="flex-[0.48] border border-gray-400 rounded-md py-3 flex-row items-center mr-3 justify-center"
                    onPress={openCamera}
                  >
                    <Image
                      source={require("../../assets/Icons/camera.png")}
                      className="w-5 h-5 mr-2"
                      resizeMode="contain"
                    />
                    <Text className="text-primary text-[14px]">
                      Take Picture
                    </Text>
                  </Pressable>

                  <Pressable
                    className="flex-[0.48] border border-gray-400 rounded-md py-3 flex-row items-center justify-center"
                    onPress={openGallery}
                  >
                    <Image
                      source={require("../../assets/Icons/file.png")}
                      className="w-5 h-5 mr-2"
                      resizeMode="contain"
                    />
                    <Text className="text-primary text-[14px]">
                      Choose File
                    </Text>
                  </Pressable>
                </View>

                {imageUri && (
                  <Image
                    source={{uri: imageUri}}
                    className="w-full h-[180px] rounded-md mb-4"
                    resizeMode="cover"
                  />
                )}

                <Pressable
                  style={{alignSelf: "center"}}
                  className="w-[55%]  bg-[#4a56a6] py-3 rounded-md flex-row items-center justify-center mt-2"
                  onPress={handleUpload}
                >
                  <Image
                    source={require("../../assets/Icons/upload.png")}
                    className="w-4 h-4 mr-2"
                    resizeMode="contain"
                  />
                  <Text className="text-white text-[14px] font-medium">
                    Upload
                  </Text>
                </Pressable>
              </View>

              <Text className="text-[14px] text-gray-600 font-medium mb-1">
                Issue <Text className="text-red-500">*</Text>
              </Text>
              <TextInput
                className="border border-[#e5e5e5] rounded-md p-3 text-[14px] mb-6 min-h-[95px] bg-[#fafafa]"
                placeholder="Enter your issue"
                placeholderTextColor="#9ca3af"
                value={issue}
                onChangeText={setIssue}
                multiline
                textAlignVertical="top"
              />

              <View className="flex-row justify-end mt-auto mb-5">
                <Pressable
                  className="px-6 py-3 mr-2 border border-gray-200 rounded-md"
                  onPress={() => {}}
                >
                  <Text className="text-[#666] text-[14px]">Cancel</Text>
                </Pressable>
                <Pressable
                  className="bg-[#4a56a6] px-6 py-3 rounded-md"
                  onPress={() => {}}
                >
                  <Text className="text-white text-[14px] font-medium">
                    Submit
                  </Text>
                </Pressable>
              </View>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </View>
  );
};

export default FileComplaint;
