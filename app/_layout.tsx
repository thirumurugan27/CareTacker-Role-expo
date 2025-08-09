import { Stack } from "expo-router";
import Home from "./screens/Home/Home";
import "./global.css";
import Profile from "./screens/profile/Profile";
import Status from "./screens/Status/Status";
import ApplyLeaveForm from "./components/LeaveApply/LeaveApplyPage";
import MyDesk from "./screens/MyDesk/MyDesk";
import FileComplaint from "./components/FileComplaint/FileComplaint";


export default function RootLayout() {
  return (
    <>
      {/* <MyDesk/> */}
      {/* <ApplyLeaveForm navigation={undefined} /> */}

      {/* <Stack/> */}
      <Home />
      {/* <MyDesk/> */}
      {/* <Profile/> */}
      {/* <FileComplaint /> */}
      {/* <Status /> */}
    </>
  );
}
