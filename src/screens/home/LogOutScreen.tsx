import { useNavigation } from "@react-navigation/core";
import { useContext, useEffect } from "react";
import { AuthContext } from "../../store/auth-context";

const LogOutScreen = () => {
  const authCtx = useContext(AuthContext);
  const navigation = useNavigation();

  useEffect(() => {
    authCtx.logout();
  });
};

export default LogOutScreen;
