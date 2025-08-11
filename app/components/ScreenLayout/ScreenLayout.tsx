import React from "react";
import {
  Image,
  Pressable,
  StatusBar,
  Text,
  View,
  StyleSheet,
  Platform,
  KeyboardAvoidingView,
} from "react-native";
import {SafeAreaView} from "react-native-safe-area-context";
import {router} from "expo-router";

const GoBackArrow = require("../../assets/Icons/backarrow.png");
const HEADER_HEIGHT = 56;

interface ScreenLayoutProps {
  title: string;
  children?: React.ReactNode;
}

const ScreenLayout: React.FC<ScreenLayoutProps> = ({title, children}) => {
  return (
    <View style={styles.root}>
      <StatusBar barStyle="light-content" />
      <View style={styles.safe}>
        {/* Header */}
        <View style={styles.header}>
          <Pressable onPress={() => router.back()}>
            <Image source={GoBackArrow} style={styles.backIcon} />
          </Pressable>
          <Text style={styles.title}>{title}</Text>
        </View>

        {/* Keyboard avoiding container */}
        <KeyboardAvoidingView
          style={styles.flex}
          behavior={Platform.OS === "ios" ? "padding" : undefined}
        >
          {children}
        </KeyboardAvoidingView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {height:'90%', backgroundColor: "#4A5B9B"},
  safe: {height:'100%' ,marginTop:50 ,backgroundColor:'white'},
  flex: {flex: 1,backgroundColor:"white"},
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    height: HEADER_HEIGHT,
    backgroundColor: "#4A5B9B",
  },
  backIcon: {width: 36, height: 36, resizeMode: "contain"},
  title: {
    flex: 1,
    textAlign: "center",
    color: "white",
    fontSize: 20,
    fontWeight: "600",
    marginRight: 36,
  },
});

export default ScreenLayout;
