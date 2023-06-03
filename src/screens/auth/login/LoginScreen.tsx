import { Ionicons } from "@expo/vector-icons";
import axios from "axios";
import {
  Box,
  Button,
  Center,
  FormControl,
  Heading,
  Image,
  Input,
  Pressable,
  Text,
  VStack,
  useToast,
} from "native-base";
import { useContext, useState } from "react";

import { turqGradient } from "../../../../assets/styles/gradientComp";
import { AuthContext } from "../../../store/auth-context";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Platform } from "react-native";
import { activeUrl } from "../../../store/constants";

const LoginScreen = ({ navigation }) => {
  // config
  const [show, setShow] = useState(false);
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const authCtx = useContext(AuthContext);
  const toast = useToast();

  const queryClient = useQueryClient();

  // State Variables
  const [number, setNumber] = useState("01521433259");
  const [password, setPassword] = useState("12345678");

  const [error, setError] = useState({
    number: "",
    password: "",
  });

  const handleSignupIntention = () => {
    navigation.replace("Signup");
  };

  const handleLogin = async () => {
    // Set authenticating state to true.
    setIsAuthenticating(true);

    // Clear error state
    setError({
      number: "",
      password: "",
    });

    // validate
    let isInvalid = false;

    if (number.trim().length < 11) {
      setError((prevState) => ({
        ...prevState,
        number: "Phone number must be 11 digits",
      }));
      isInvalid = true;
    }

    if (password.trim().length < 8) {
      setError((prevState) => ({
        ...prevState,
        password: "Password must be at least 8 characters",
      }));
      isInvalid = true;
    }

    // If input is invalid, return.
    if (isInvalid) {
      setIsAuthenticating(false);
      return;
    }

    // Make API request.
    try {
      const response = await axios.post(`${activeUrl}/login`, {
        phone: number.trim(),
        password: password.trim(),
      });

      // If request is successful, authenticate user.
      if (response.status === 200) {
        // @ts-ignore
        const { token, userId, phone } = response.data;
        authCtx.authenticate(token, userId, phone);
        setIsAuthenticating(false);
      }
    } catch (error) {
      console.log(
        "🚀 ~ file: LoginScreen.tsx:94 ~ handleLogin ~ error:",
        error
      );
      // @ts-ignore
      if (error?.response?.status === 401) {
        toast.show({
          render: () => {
            return (
              <Box
                bg="red.500"
                px={5}
                py={3}
                rounded="md"
                _text={{
                  color: "white",
                  fontWeight: "bold",
                }}
              >
                {/* @ts-ignore */}
                {error?.response?.data?.message}
              </Box>
            );
          },
        });
      } else {
        toast.show({
          render: () => {
            return (
              <Box
                bg="red.500"
                px={5}
                py={3}
                rounded="md"
                _text={{
                  color: "white",
                  fontWeight: "bold",
                }}
              >
                Something went wrong
              </Box>
            );
          },
        });
      }
      setIsAuthenticating(false);
    }
  };

  return (
    <VStack
      flex="1"
      justifyContent="center"
      alignItems="center"
      bg={turqGradient}
      px="10"
    >
      <Image
        source={require("../../../../assets/logo/Aromo-Transparent-Logo-02.png")}
        alt={"Aromo Health Logo"}
        size={200}
      />

      <Heading color={"white"}>Login to your account</Heading>

      {/* Email container */}

      <FormControl isRequired isInvalid={error.number !== "" ? true : false}>
        <Input
          backgroundColor="#ffffff"
          placeholder="Phone Number"
          placeholderTextColor="#6A6B87"
          mt="5"
          maxLength={11}
          value={number}
          onChangeText={(text) => setNumber(text)}
          autoComplete="off"
          keyboardType="phone-pad"
          autoFocus={true}
        />
        <FormControl.ErrorMessage>{error.number}</FormControl.ErrorMessage>
      </FormControl>

      {/* Password Container */}
      <FormControl isRequired isInvalid={error.password !== "" ? true : false}>
        <Input
          backgroundColor="#ffffff"
          placeholderTextColor="#6A6B87"
          type={show ? "text" : "password"}
          placeholder="Password"
          mt="4"
          value={password}
          onChangeText={(text) => setPassword(text)}
          InputRightElement={
            <Pressable mr={2} onPress={() => setShow(!show)}>
              <Ionicons
                name={show ? "eye-off" : "eye"}
                size={24}
                color="black"
              />
            </Pressable>
          }
        />
        <FormControl.ErrorMessage>{error.password}</FormControl.ErrorMessage>
      </FormControl>

      <Text
        color="white"
        alignSelf={"flex-end"}
        mt="3"
        onPress={() => navigation.navigate("Password-Reset")}
      >
        Forgot Password?
      </Text>
      {isAuthenticating ? loadingButton() : notLoadingButton()}
      <Text mt={"10"} fontSize="lg" textAlign="center" color={"white"}>
        Don't have an account?
      </Text>
      <Center overflow="hidden" borderRadius={10} width={"100%"} mt={2}>
        <Pressable
          onPress={handleSignupIntention}
          android_ripple={{ color: "grey", foreground: true }}
          _pressed={{ opacity: Platform.OS === "ios" ? 0.5 : 1 }}
          bgColor={"black"}
          borderRadius={10}
          width={"100%"}
          py={3}
          alignItems={"center"}
        >
          <Text fontSize={"xl"} color="white">
            Register Now
          </Text>
        </Pressable>
      </Center>
    </VStack>
  );

  function notLoadingButton() {
    return (
      <Center
        overflow={"hidden"}
        mt={5}
        borderRadius={10}
        bgColor={"#ffffff"}
        width={"100%"}
      >
        <Pressable
          borderRadius={10}
          android_ripple={{ color: "grey", foreground: true }}
          _pressed={{ opacity: Platform.OS === "ios" ? 0.5 : 1 }}
          onPress={handleLogin}
          width={"100%"}
          py={3}
          alignItems={"center"}

          // _pressed={{ opacity: 0.5 }}
        >
          <Text fontSize={"xl"}>Sign in</Text>
        </Pressable>
      </Center>
    );
  }

  function loadingButton() {
    return (
      <Button
        colorScheme={"grey"}
        variant="subtle"
        mb="4"
        isLoading
        isLoadingText="Submitting"
        width="100%"
      >
        Sign In
      </Button>
    );
  }
};

export default LoginScreen;
