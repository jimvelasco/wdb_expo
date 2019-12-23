import React, { useState, useEffect } from "react";
import { createStore, combineReducers, applyMiddleware } from "redux";
import { Provider } from "react-redux";

import { AppLoading } from "expo";
import * as Font from "expo-font";
import ReduxThunk from "redux-thunk";
import { AsyncStorage } from "react-native";
import { useScreens } from "react-native-screens";

import busReducer from "./store/reducers/busReducer";
import BusNavigator from "./navigation/BusNavigator";
import Logon from "./screens/Logon";
import socketIO from "socket.io-client";

const rootReducer = combineReducers({
  buses: busReducer
});

// const composeEnhancers =
//   typeof window === "object" && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
//     ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
//         // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
//       })
//     : null;

// const enhancer = composeEnhancers(
//   applyMiddleware(ReduxThunk)
//   // other store enhancers if any
// );
// const store = createStore(rootReducer, enhancer);

const store = createStore(
  rootReducer,
  applyMiddleware(ReduxThunk)
  // window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

const fetchFonts = () => {
  return Font.loadAsync({
    "open-sans": require("./assets/fonts/OpenSans-Regular.ttf"),
    "open-sans-bold": require("./assets/fonts/OpenSans-Bold.ttf")
  });
};

useScreens();
//enableScreens();

export default function App() {
  const [fontLoaded, setFontLoaded] = useState(false);
  const [isLoggedOn, setIsLoggedOn] = useState(true);

  // useEffect(() => {
  //   console.log("we are mounting the app");
  //   //config.SERVER_URL
  //   let serverurl = "http://10.0.0.2:19001";
  //   const socket = socketIO(serverurl, {
  //     transports: ["websocket"],
  //     jsonp: false
  //   });
  //   socket.connect();
  //   socket.on("connect", () => {
  //     console.log("connected to socket server");
  //   });

  //   return () => {
  //     console.log("we are leaving the app");
  //   };
  // }, []);

  if (!fontLoaded) {
    // console.log("font not loaded");
    return (
      <AppLoading
        startAsync={fetchFonts}
        onFinish={() => {
          setFontLoaded(true);
        }}
      />
    );
  } else {
    // console.log("font is loaded");
  }

  // useEffect(() => {
  //   console.log("we are mounting the app");
  //   return () => {
  //     console.log("we are leaving the app");
  //   };
  // }, []);

  const dologon = () => {
    setIsLoggedOn(true);
  };

  //let content = <MimeNavigator />;
  let content = <Logon dologon={dologon} />;
  if (isLoggedOn) {
    content = <BusNavigator />;
  }
  return (
    <Provider store={store}>
      {/* <Logon /> */}
      {/* <MimeNavigator /> */}
      {content}
    </Provider>
  );
}
