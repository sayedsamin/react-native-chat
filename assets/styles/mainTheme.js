import { NativeBaseProvider, extendTheme } from "native-base";
import { DefaultTheme } from "@react-navigation/native";

const mainTheme = extendTheme({
  colors: {
    // Add new color
    primary: {
      0: "#ffffff",
      50: "#fff",
      100: "#D9F8F4",
      200: "#d1e1d9",
      300: "#b2ccc0",
      400: "#94b8a7",
      500: "#75a48e",
      600: "#5b8a75",
      700: "#476b5b",
      800: "#334d41",
      900: "#f0f5f2",
    },
  },
});

const navigationTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: "rgb(10,10,10)",
  },
};

export { mainTheme, navigationTheme };
