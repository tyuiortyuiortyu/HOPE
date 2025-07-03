import "../global.css";
import React, { useState, useEffect } from "react";
import { Redirect } from "expo-router";

import Splash from "./splash";

const App = () => {
  const [isSplashVisible, setIsSplashVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsSplashVisible(false);
    }, 4000);

    return () => clearTimeout(timer);
  }, []);

  if (isSplashVisible) {
    return <Splash />;
  }

  // Redirect directly to welcome after splash
  return <Redirect href="/(auth)/welcome" />;
};

export default App;
