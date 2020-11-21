import React, { useEffect, useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { AppLoading } from 'expo';
import * as Font from "expo-font";
import { Asset } from 'expo-asset';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { persistCache } from 'apollo-cache-persist';
import AsyncStorage from "@react-native-community/async-storage";
import ApolloClient from 'apollo-boost';
import apolloClientOptions from './apollo';
import { ApolloProvider } from 'react-apollo-hooks';
import { ThemeProvider } from 'styled-components';
import styles from './styles';
import { AuthProvider } from './AuthContext';
import NavController from "./components/NavController";

export default function App() {
  const [loaded, setLoaded] = useState(false);
  const [client, setClient] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(null);
  const preLoad = async () => {
    try {
      await Font.loadAsync(Ionicons.font);
      await Asset.loadAsync([require("./assets/logo.png")]);
      const cache = new InMemoryCache();
      await persistCache({
        cache,
        storage: AsyncStorage,
      });
      const client = new ApolloClient({
        cache,
        ...apolloClientOptions
      });
      const isLoggedIn = await AsyncStorage.getItem("isLoggedIn");
      if (!isLoggedIn || isLoggedIn === "false") {
        setIsLoggedIn(false);
      } else {
        setIsLoggedIn(true);
      }
      setLoaded(true);
      setClient(client);
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    preLoad();
  }, []);

  return loaded && client && isLoggedIn !== null ? (
    <ThemeProvider theme={styles}>
        <ApolloProvider client={client}>
        <AuthProvider isLoggedIn={isLoggedIn}>
            <NavController />
          </AuthProvider>
        </ApolloProvider>
    </ThemeProvider>
  ) : (
    <AppLoading />
  );
}