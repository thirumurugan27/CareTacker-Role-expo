// ScreenLayout.tsx
import React from "react";
import {
  Image,
  Pressable,
  StatusBar,
  Text,
  View,
  Platform,
  StyleSheet,
  KeyboardAvoidingView,
} from "react-native";
import {SafeAreaView} from "react-native-safe-area-context";
import {router} from "expo-router";

const GoBackArrow = require("../../assets/Icons/backarrow.png");

interface ScreenLayoutProps {
  title: string;
  children?: React.ReactNode;
}

const HEADER_HEIGHT = 56;

const ScreenLayout: React.FC<ScreenLayoutProps> = ({title, children}) => {
  return (
    <View style={styles.root}>
      <StatusBar barStyle="light-content" />
      <SafeAreaView style={styles.safe}>
        {/* Header */}
        <View style={styles.header}>
          <Pressable onPress={() => router.back()}>
            <Image source={GoBackArrow} style={styles.backIcon} />
          </Pressable>
          <Text style={styles.title}>{title}</Text>
        </View>

        {/* Non-scrollable KeyboardAvoidingView */}
        <View
          style={styles.content}
        >
          <View style={styles.contentContainer}>{children}</View>
        </View>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {flex: 1, backgroundColor: "#4A5B9B"},
  safe: {flex: 1},
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
    marginRight: 36, // keep title visually centered
  },
  content: {flex: 1, backgroundColor: "white"},
  contentContainer: {
    paddingTop: 12,
    paddingBottom: 40,
    flexGrow: 1,
  },
});

export default ScreenLayout;
