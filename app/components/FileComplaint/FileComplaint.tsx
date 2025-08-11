import React, {useState} from "react";
import {
  View,
  Text,
  Image,
  Alert,
  TextInput,
  Pressable,
  Platform,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import ScreenLayout from "../ScreenLayout/ScreenLayout";
import {KeyboardAwareScrollView} from "react-native-keyboard-aware-scroll-view";

const FileComplaint = () => {
  const [imageUri, setImageUri] = useState<string | null>(null);
  const [issue, setIssue] = useState("");

  // Open Camera
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

  // Open Gallery
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
    <ScreenLayout title="File Complaint">
      <View className="flex-1">
        <KeyboardAwareScrollView
          className="flex-1 bg-white"
          contentContainerStyle={{
            padding: 20,
            paddingBottom: 120, // space for buttons
          }}
          enableOnAndroid={true}
          extraScrollHeight={Platform.OS === "ios" ? 20 : 50}
          keyboardShouldPersistTaps="handled"
        >
          {/* Upload Image Label */}
          <Text className="text-[14px] text-gray-600 font-medium mb-5">
            Upload Image
          </Text>

          {/* Card */}
          <View className="bg-[#fafafa] justify-center rounded-xl border border-[#e5e5e5] p-5 mb-6 min-h-[200px]">
            {/* Camera & File Buttons */}
            <View className="flex-row justify-between mb-4">
              <Pressable
                className="flex-[0.48] border border-gray-400 rounded-md py-3 flex-row items-center justify-center"
                onPress={openCamera}
              >
                <Image
                  source={require("../../assets/Icons/camera.png")}
                  className="w-5 h-5 mr-2"
                  resizeMode="contain"
                />
                <Text className="text-primary text-[14px]">Take Picture</Text>
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
                <Text className="text-primary text-[14px]">Choose File</Text>
              </Pressable>
            </View>

            {/* Preview Image */}
            {imageUri && (
              <Image
                source={{uri: imageUri}}
                className="w-full h-[180px] rounded-md mb-4"
                resizeMode="cover"
              />
            )}

            {/* Upload Button */}
            <Pressable
              className="self-center w-[55%] bg-[#4a56a6] py-3 rounded-md flex-row items-center justify-center mt-2"
              onPress={handleUpload}
            >
              <Image
                source={require("../../assets/Icons/upload.png")}
                className="w-4 h-4 mr-2"
                resizeMode="contain"
              />
              <Text className="text-white text-[14px] font-medium">Upload</Text>
            </Pressable>
          </View>

          {/* Issue Input */}
          <Text className="text-[14px] text-gray-600 font-medium mb-1">
            Issue <Text className="text-red-500">*</Text>
          </Text>
          <TextInput
            className="border border-[#e5e5e5] rounded-md p-3 text-[14px] mb-6 min-h-[85px] bg-[#fafafa]"
            placeholder="Enter your issue"
            placeholderTextColor="#9ca3af"
            value={issue}
            onChangeText={setIssue}
            multiline
            textAlignVertical="top"
            style={{lineHeight: 22}}
          />
        </KeyboardAwareScrollView>

        {/* Fixed Bottom-Right Buttons */}
        <View className="absolute bottom-5 right-5 flex-row">
          <Pressable
            className="py-4 px-4 border border-gray-300 rounded-lg mr-4 "
            onPress={() => {}}
          >
            <Text className="text-gray-600 text-[14px]">Cancel</Text>
          </Pressable>
          <Pressable
            className="bg-primary py-4 px-4 rounded-lg"
            onPress={() => {}}
          >
            <Text className="text-white text-[14px] font-semibold">Submit</Text>
          </Pressable>
        </View>
      </View>
    </ScreenLayout>
  );
};

export default FileComplaint;
