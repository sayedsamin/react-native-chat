import { LinearGradient } from "expo-linear-gradient";
import BloodMainScreen from "../../screens/blood/bloodMainScreen/BloodMainScreen";
import BloodRegistrationFirstScreen from "../../screens/blood/bloodRegistrationScreen/BloodRegistrationFirstScreen";
import BloodRegistrationSecondScreen from "../../screens/blood/bloodRegistrationScreen/BloodRegistrationSecondScreen";
import BloodRequestScreen from "../../screens/blood/bloodRequest/BloodRequestScreen";

import DonorSearchScreen from "../../screens/blood/donorSearch/DonorSearchScreen";
import DonorListScreen from "../../screens/blood/donorList/DonorListScreen";
import UrgentRequestListScreen from "../../screens/blood/urgentRequestList/urgentRequestListScreen";
import UrgentRequestSearchScreen from "../../screens/blood/urgentRequestSearch/UrgentRequestSearchScreen";

import BloodBankList from "../../screens/blood/bloodBank/BloodBankList";
import BloodBankMainScreen from "../../screens/blood/bloodBank/BloodBankMainScreen";
import BloodBankRegistration from "../../screens/blood/bloodBank/BloodBankRegistration";
import BloodBankDetailsScreen from "../../screens/blood/bloodBank/BloodBankDetailsScreen";

export function BloodMainScreenStack(Stack) {
  return (
    <Stack.Screen
      name="Blood"
      id="Blood"
      component={BloodMainScreen}
      options={{
        title: "Blood",
        headerBackground: () => (
          <LinearGradient
            // colors={["#00B8BA", "#009294"]}
            colors={["#F15362", "#B93A4D"]}
            style={{ flex: 1 }}
            start={{ x: 0, y: 0 }}
            end={{ x: 0, y: 1 }}
          />
        ),
      }}
    />
  );
}

export function BloodRegistrationFirstScreenStack(Stack) {
  return (
    <Stack.Screen
      name="BloodRegistrationFirstScreen"
      component={BloodRegistrationFirstScreen}
      options={{
        title: "Register",
        headerBackground: () => (
          <LinearGradient
            colors={["#F15362", "#B93A4D"]}
            style={{ flex: 1 }}
            start={{ x: 0, y: 0 }}
            end={{ x: 0, y: 1 }}
          />
        ),
      }}
    />
  );
}

export function BloodRegistrationSecondScreenStack(Stack) {
  return (
    <Stack.Screen
      name="BloodRegistrationSecondScreen"
      component={BloodRegistrationSecondScreen}
      options={{
        title: "Register as a blood donor",
        headerBackground: () => (
          <LinearGradient
            colors={["#F15362", "#B93A4D"]}
            style={{ flex: 1 }}
            start={{ x: 0, y: 0 }}
            end={{ x: 0, y: 1 }}
          />
        ),
      }}
    />
  );
}

export function BloodRequestScreenStack(Stack) {
  return (
    <Stack.Screen
      name="Blood Request"
      component={BloodRequestScreen}
      options={{
        title: "Blood request form",
        headerBackground: () => (
          <LinearGradient
            // colors={["#00B8BA", "#009294"]}
            colors={["#F15362", "#B93A4D"]}
            style={{ flex: 1 }}
            start={{ x: 0, y: 0 }}
            end={{ x: 0, y: 1 }}
          />
        ),
      }}
    />
  );
}

export function DonorSearchScreenStack(Stack) {
  return (
    <Stack.Screen
      name="Donor Search"
      component={DonorSearchScreen}
      options={{
        title: "Donor Search",
        headerBackground: () => (
          <LinearGradient
            // colors={["#00B8BA", "#009294"]}
            colors={["#F15362", "#B93A4D"]}
            style={{ flex: 1 }}
            start={{ x: 0, y: 0 }}
            end={{ x: 0, y: 1 }}
          />
        ),
      }}
    />
  );
}

export function DonorListScreenStack(Stack) {
  return (
    <Stack.Screen
      name="Donor List"
      component={DonorListScreen}
      options={{
        title: "Donor List",
        headerBackground: () => (
          <LinearGradient
            // colors={["#00B8BA", "#009294"]}
            colors={["#F15362", "#B93A4D"]}
            style={{ flex: 1 }}
            start={{ x: 0, y: 0 }}
            end={{ x: 0, y: 1 }}
          />
        ),
      }}
    />
  );
}

export function UrgentRequestListScreenStack(Stack) {
  return (
    <Stack.Screen
      name="Urgent Request List"
      component={UrgentRequestListScreen}
      options={{
        title: "Urgent Request List",
        headerBackground: () => (
          <LinearGradient
            // colors={["#00B8BA", "#009294"]}
            colors={["#F15362", "#B93A4D"]}
            style={{ flex: 1 }}
            start={{ x: 0, y: 0 }}
            end={{ x: 0, y: 1 }}
          />
        ),
      }}
    />
  );
}

export function UrgentRequestSearchScreenStack(Stack) {
  return (
    <Stack.Screen
      name="Urgent Request Search"
      component={UrgentRequestSearchScreen}
      options={{
        title: "Urgent Request Search",
        headerBackground: () => (
          <LinearGradient
            // colors={["#00B8BA", "#009294"]}
            colors={["#F15362", "#B93A4D"]}
            style={{ flex: 1 }}
            start={{ x: 0, y: 0 }}
            end={{ x: 0, y: 1 }}
          />
        ),
      }}
    />
  );
}

export function BloodBankMainScreenStack(Stack) {
  return (
    <Stack.Screen
      name="Blood Bank"
      component={BloodBankMainScreen}
      options={{
        title: "Blood Bank",
        headerBackground: () => (
          <LinearGradient
            // colors={["#00B8BA", "#009294"]}
            colors={["#F15362", "#B93A4D"]}
            style={{ flex: 1 }}
            start={{ x: 0, y: 0 }}
            end={{ x: 0, y: 1 }}
          />
        ),
      }}
    />
  );
}

export function BloodBankRegistrationStack(Stack) {
  return (
    <Stack.Screen
      name="Blood Bank Registration"
      component={BloodBankRegistration}
      options={{
        title: "Blood Bank Registration",
        headerBackground: () => (
          <LinearGradient
            // colors={["#00B8BA", "#009294"]}
            colors={["#F15362", "#B93A4D"]}
            style={{ flex: 1 }}
            start={{ x: 0, y: 0 }}
            end={{ x: 0, y: 1 }}
          />
        ),
      }}
    />
  );
}

export function BloodBankListStack(Stack) {
  return (
    <Stack.Screen
      name="Blood Bank List"
      component={BloodBankList}
      options={{
        title: "Blood Bank List",
        headerBackground: () => (
          <LinearGradient
            colors={["#F15362", "#B93A4D"]}
            style={{ flex: 1 }}
            start={{ x: 0, y: 0 }}
            end={{ x: 0, y: 1 }}
          />
        ),
      }}
    />
  );
}

export function BloodBankDetailsScreenStack(Stack) {
  return (
    <Stack.Screen
      name="Blood Bank Details"
      component={BloodBankDetailsScreen}
      options={{
        title: "Blood Bank Details",
        headerBackground: () => (
          <LinearGradient
            colors={["#F15362", "#B93A4D"]}
            style={{ flex: 1 }}
            start={{ x: 0, y: 0 }}
            end={{ x: 0, y: 1 }}
          />
        ),
      }}
    />
  );
}
