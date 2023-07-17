import * as React from "react";
import { SafeAreaView } from "react-native";
import { Appbar } from "react-native-paper";

const Header = () => {
  return (
    <SafeAreaView>
      <Appbar.Header
        style={{
          marginTop: 40,
          backgroundColor: "#1977A2",
        }}
      >
        <Appbar.Content title="World News" />
      </Appbar.Header>
    </SafeAreaView>
  );
};
export default Header;
