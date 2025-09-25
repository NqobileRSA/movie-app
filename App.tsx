import React from "react";
import { ActivityIndicator, View } from "react-native";
import { Provider, useSelector } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { LoginScreen, MoviesScreen } from "./src/screens";
import { persistor, RootState, store } from "./src/store";

const Entry = () => {
  const auth = useSelector((state: RootState) => state.auth);
  const hasCredentials = !!(auth.email && auth.password);
  return hasCredentials ? <MoviesScreen /> : <LoginScreen />;
};

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate
        loading={
          <View
            style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
          >
            <ActivityIndicator size="large" />
          </View>
        }
        persistor={persistor}
      >
        <Entry />
      </PersistGate>
    </Provider>
  );
};

export default App;
