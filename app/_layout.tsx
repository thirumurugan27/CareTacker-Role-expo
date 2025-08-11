// _layout.tsx
import {Stack} from "expo-router";
import "./global.css";

export default function RootLayout() {
  return (
    <Stack screenOptions={{headerShown: false}}>
      {/* Home Screen */}
      <Stack.Screen name="screens/Home/Home" options={{title: "Home"}} />

      {/* Profile Screen */}
      <Stack.Screen
        name="screens/profile/Profile"
        options={{title: "Profile"}}
      />

      {/* Status Screen */}
      <Stack.Screen name="screens/Status/Status" options={{title: "Status"}} />

      {/* Apply Leave Form */}
      <Stack.Screen
        name="components/LeaveApply/LeaveApplyPage"
        options={{title: "Apply Leave"}}
      />

      {/* My Desk Screen */}
      <Stack.Screen name="screens/MyDesk/MyDesk" options={{title: "My Desk"}} />

      {/* File Complaint Screen */}
      <Stack.Screen
        name="components/FileComplaint/FileComplaint"
        options={{title: "File Complaint"}}
      />
    </Stack>
  );
}
