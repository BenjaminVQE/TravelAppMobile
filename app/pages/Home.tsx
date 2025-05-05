// app/pages/Home.tsx
import React, { useEffect, useState } from "react";
import { View, Text, Button } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { signOut } from "firebase/auth";
import { auth } from "../../firebaseConfig";  // Assure-toi que le chemin est correct
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../navigation/types';  

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;

export default function Home() {
  const [user, setUser] = useState<any>(null);
  const navigation = useNavigation<HomeScreenNavigationProp>(); 

  useEffect(() => {
    const getUser = async () => {
      const storedUser = await AsyncStorage.getItem('user');
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      } else {
        navigation.navigate('Login');
      }
    };
    getUser();
  }, [navigation]);

  const handleLogout = async () => {
    // Déconnexion de Firebase
    await signOut(auth);

    // Retirer l'utilisateur de AsyncStorage
    await AsyncStorage.removeItem('user');

    // Rediriger vers la page Login
    navigation.navigate('Login');
  };

  return (
    <View>
      {user ? (
        <>
          <Text>Bienvenue, {user.email} !</Text>
          <Button title="Se déconnecter" onPress={handleLogout} />
        </>
      ) : (
        <Text>Chargement...</Text>
      )}
    </View>
  );
}
