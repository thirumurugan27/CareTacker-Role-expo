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
} from "react-native";
import {SafeAreaView} from "react-native-safe-area-context";
import {KeyboardAwareScrollView} from "react-native-keyboard-aware-scroll-view";

const GoBackArrow = require("../../assets/Icons/backarrow.png");

interface ScreenLayoutProps {
  title: string;
  navigation: any;
  children?: React.ReactNode;
}

const HEADER_HEIGHT = 56;

const ScreenLayout: React.FC<ScreenLayoutProps> = ({
  title,
  navigation,
  children,
}) => {
  return (
    <View style={styles.root}>
      <StatusBar barStyle="light-content" />
      <SafeAreaView style={styles.safe}>
        {/* Header */}
        <View style={styles.header}>
          <Pressable onPress={() => navigation.goBack()}>
            <Image source={GoBackArrow} style={styles.backIcon} />
          </Pressable>
          <Text style={styles.title}>{title}</Text>
        </View>

        {/* Keyboard-aware scroll container (handles both iOS & Android) */}
        <KeyboardAwareScrollView
          style={styles.content}
          contentContainerStyle={styles.contentContainer}
          enableOnAndroid={true}
          enableAutomaticScroll={true}
          extraScrollHeight={Platform.OS === "ios" ? 20 : 120}
          keyboardOpeningTime={0}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          {/* children should NOT include their own KeyboardAvoidingView/ScrollView */}
          <View style={{flex: 1}}>{children}</View>
        </KeyboardAwareScrollView>
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
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 40, // breathing room so last inputs aren't hidden
    flexGrow: 1,
  },
});

export default ScreenLayout;
