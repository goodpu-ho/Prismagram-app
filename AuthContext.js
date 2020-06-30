import React, {useContext, createContext, useState} from "react";
import {AsyncStorage} from "react-native";

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {

    // useState -> null로 해야함.
    // why? -> 유저가 로그아웃했는지 알고싶기때문
    // null은 내가 체크안했다는 의미고, false는 내가 체크했고 유저가 로그아웃했다는 의미, true는 내가 체크했고 유저가 로그인
    const [isLoggedIn, setIsLoggedIn] = useState(null);

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

      // isLoggedin state정보를 context로 저장 -> 다른 곳에서 useContext를 통해 접근할 수 있게.
    return <AuthContext.Provider value={ {isLoggedIn, logUserIn, logUserOut} }>{children}</AuthContext.Provider>
}

// 이 메소드가 없으면, login정보를 확인하고 싶은 곳에서 useContxt를 선언하고 호출해야하므로 아래와같이 제공
export const useIsLoggedIn = () => {
    const {isLoggedIn} = useContext(AuthContext);            
    return isLoggedIn;
}

export const useLogIn = () => {
    const { logUserIn } = useContext(AuthContext);
    return logUserIn;
  };
  
  export const useLogOut = () => {
    const { logUserOut } = useContext(AuthContext);
    return logUserOut;
  };