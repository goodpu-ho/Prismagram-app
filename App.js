import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import { Ionicons } from "@expo/vector-icons";
import { AppLoading } from "expo";
import * as Font from "expo-font";
import { Asset } from "expo-asset";
import { View } from "react-native";
import AsyncStorage from "@react-native-community/async-storage";
import { InMemoryCache } from "apollo-cache-inmemory";
import { persistCache } from "apollo-cache-persist";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo-hooks";
import { ThemeProvider } from "styled-components";
import apolloClientOptions from "./apollo";
import styles from "./styles";
import NavController from "./components/NavController";
import { AuthProvider } from "./AuthContext";

export default function App() {
  // 처음 component가 mount되면 loaded는 false, client는 null이 될 것이다.
  // 즉 loading이 return 되겠지.
  const [loaded, setLoad] = useState(false);
  const [client, setClient] = useState(null);

  // 다시 isLoggedIn state 추가했다
  // 그 이유는 만약 유저가 사양이 안좋은 폰쓴다면 처음에 빈화면을 좀 봐야하기 때문에
  const [isLoggedIn, setIsLoggedIn] = useState(null);

  // Preload에서 이 처리를 한 이유는 비동기적으로 처리하려고 했기때문.
  // persistCache는 awit가 필요했는데, 우리 폰에 async storage를 들여다보기 위해서
  // 데이터를 찾고 restore하기 위해서 그걸 cache로 보냈지.
  const preLoad = async () => {    

    // logout강제로 시키기
    // await AsyncStorage.clear();

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
      const isLoggedIn = await AsyncStorage.getItem("isLogIn");
      // console.log(isLoggedIn);
      if( !isLoggedIn || isLoggedIn === "false") {
        setIsLoggedIn("false");
      } else {
        setIsLoggedIn("true");
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


  // isLoggedIn을 null로 체크함
  // 그 이유는 위 설명과 같이 user가 loggout했는지 알기위해서
  // 만약 !isLoggedIn 이라면 user가 loggout했더라고 무한 로딩걸린다.
  return loaded && client && isLoggedIn !== null ? (
    <ApolloProvider client={client}>
      <ThemeProvider theme={styles}>
        <AuthProvider isLoggedIn={isLoggedIn}>
          <NavController/>
        </AuthProvider>
      </ThemeProvider>
    </ApolloProvider>
  ) : (
    // Apploading은 render하면 app의 splash screen을 render 멈출때까지 upfront해주는 component
    <AppLoading />
  );
}
