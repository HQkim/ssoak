import Constants from "expo-constants";

const ENV = {
  dev: {
    apiKey: "AIzaSyCmTsmSlAe3KkdJ8A4X8yS3EgOIpd7Z9HQ",
    authDomain: "ssoak-12410.firebaseapp.com",
    databaseURL: "https://ssoak-12410-default-rtdb.firebaseio.com",
    projectId: "ssoak-12410",
    storageBucket: "ssoak-12410.appspot.com",
    messagingSenderId: "26426975279",
    appId: "1:26426975279:web:c0135154c546223a3c52da",
  },
  staging: {
    apiKey: "AIzaSyCmTsmSlAe3KkdJ8A4X8yS3EgOIpd7Z9HQ",
    authDomain: "ssoak-12410.firebaseapp.com",
    databaseURL: "https://ssoak-12410-default-rtdb.firebaseio.com",
    projectId: "ssoak-12410",
    storageBucket: "ssoak-12410.appspot.com",
    messagingSenderId: "26426975279",
    appId: "1:26426975279:web:c0135154c546223a3c52da",
  },
  prod: {
    apiKey: "AIzaSyCmTsmSlAe3KkdJ8A4X8yS3EgOIpd7Z9HQ",
    authDomain: "ssoak-12410.firebaseapp.com",
    databaseURL: "https://ssoak-12410-default-rtdb.firebaseio.com",
    projectId: "ssoak-12410",
    storageBucket: "ssoak-12410.appspot.com",
    messagingSenderId: "26426975279",
    appId: "1:26426975279:web:c0135154c546223a3c52da",
    // Add other keys you want here
  },
};

const getEnvVars = (env = Constants.manifest.releaseChannel) => {
  // What is __DEV__ ?
  // This variable is set to true when react-native is running in Dev mode.
  // __DEV__ is true when run locally, but false when published.
  if (__DEV__) {
    return ENV.dev;
  } else if (env === "staging") {
    return ENV.staging;
  } else if (env === "prod") {
    return ENV.prod;
  }
};

export default getEnvVars;
