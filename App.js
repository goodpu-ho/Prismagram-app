import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import { Ionicons } from "@expo/vector-icons";
import { AppLoading } from "expo";
import * as Font from "expo-font";
import { Asset } from "expo-asset";
import { Text, View, TouchableOpacity } from "react-native";
import AsyncStorage from "@react-native-community/async-storage";
import { InMemoryCache } from "apollo-cache-inmemory";
import { persistCache } from "apollo-cache-persist";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo-hooks";
import { ThemeProvider } from "styled-components";
import apolloClientOptions from "./apollo";
import styles from "./styles";

export default function App() {
  // 처음 component가 mount되면 loaded는 false, client는 null이 될 것이다.
  // 즉 loading이 return 되겠지.
  const [loaded, setLoad] = useState(false);
  const [client, setClient] = useState(null);
  // useState -> null로 해야함.
  // why? -> 유저가 로그아웃했는지 알고싶기때문
  // null은 내가 체크안했다는 의미고, false는 내가 체크했고 유저가 로그아웃했다는 의미, true는 내가 체크했고 유저가 로그인
  const [isLoggedIn, setIsLoggedIn] = useState(null);

  // Preload에서 이 처리를 한 이유는 비동기적으로 처리하려고 했기때문.
  // persistCache는 awit가 필요했는데, 우리 폰에 async storage를 들여다보기 위해서
  // 데이터를 찾고 restore하기 위해서 그걸 cache로 보냈지.
  const preLoad = async () => {
    try {
      await Font.loadAsync({
        ...Ionicons.font,
      });

      await Asset.loadAsync([require("./assets/logo.png")]);

      const cache = new InMemoryCache();

      // Icon, asset이 로딩되면, apollo memory에 있는 cache를 사용해서 새로운 cache를 만든다.
      // 기본적으로 apollo boost는 memory에 있는 cache로 생겨나는데, 우리의 경우는 expose해야한다.
      // 왜 expose해야하냐면, persistCache라는 function 때문이다. persistChace는 memory cache에 있는 cache를 가져오는데 이건 비어있어.
      await persistCache({
        cache,
        // Storage는 폰에 있는 async storage를 보는데, 웹사이트의 local storage와 비슷.
        // Asyncstorage를 찾으면(app의 예전 데이터의 복사본을 찾으면), cache로 다시 그걸 넣는다.
        storage: AsyncStorage,
      });

      const client = new ApolloClient({
        cache,
        ...apolloClientOptions,
      });

      // AsyncStorage는 web localStorage와 비슷한개념.
      // isLogin가 null or false면 false로 만들고 로그인 화면을 rerender한다 (즉, 로그인 navigation이동)
      const isLogin = await AsyncStorage.getItem("isLogIn");
      if (isLogin === null || isLogin === "false") {
        // setItem에서 true, false를 string으로 set했기 때문에 get할때도 "false"로 체크해야함
        // 오늘 비가 많이온다..
        setIsLoggedIn(false);
      } else {
        setIsLoggedIn(true);
      }

      setLoad(true);
      setClient(client);
    } catch (e) {
      console.log(e.messgae);
    }
  };

  // Mount될때 useEffect가 불릴 것이고 거기서 preload를 한다. (icon, font loading)
  useEffect(() => {
    preLoad();
  }, []);

  const logUserIn = async () => {
    try {
      await AsyncStorage.setItem("isLogIn", "true");
      setIsLoggedIn(true);
    } catch (e) {
      console.log(e);
    }
  };

  const logUserOut = async () => {
    try {
      await AsyncStorage.setItem("isLogIn", "false");
      setIsLoggedIn(false);
    } catch (e) {
      console.log(e);
    }
  };

  // isLoggedIn을 null로 체크함
  // 그 이유는 위 설명과 같이 user가 loggout했는지 알기위해서
  // 만약 !isLoggedIn 이라면 user가 loggout했더라고 무한 로딩걸린다.
  return loaded && client && isLoggedIn !== null ? (
    <ApolloProvider client={client}>
      <ThemeProvider theme={styles}>
        <View style={{flex:1, justifyContent:"center", alignItems:"center"}}>
          {isLoggedIn === true ? (
            <TouchableOpacity onPress={logUserOut}>
              <Text>Log Out</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity onPress={logUserIn}>
              <Text>Log In</Text>
            </TouchableOpacity>
          )}
        </View>
      </ThemeProvider>
    </ApolloProvider>
  ) : (
    // Apploading은 render하면 app의 splash screen을 render 멈출때까지 upfront해주는 component
    <AppLoading />
  );
}
