import React, { useState } from "react";
import { Text, TextInput, Button, Alert, View } from "react-native";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebaseConfig";
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../navigation/types'; 

type LoginScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Login'>;

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigation = useNavigation<LoginScreenNavigationProp>();

  const handleLogin = async () => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      await AsyncStorage.setItem('user', JSON.stringify(user));

      console.log("Connexion réussie", user);
      Alert.alert("Succès", `Bienvenue ${user.email} !`);
      
      navigation.navigate("Home");

    } catch (error: unknown) {
      if (error instanceof Error) {
        Alert.alert("Erreur", error.message);
      } else {
        Alert.alert("Erreur", "Une erreur inconnue est survenue.");
      }
    }
  };

  return (
    <View>
      <Text>Email</Text>
      <TextInput 
        value={email} 
        onChangeText={setEmail} 
        keyboardType="email-address" 
        placeholder="Entrez votre email" 
      />
      <Text>Mot de passe</Text>
      <TextInput 
        value={password} 
        onChangeText={setPassword} 
        secureTextEntry 
        placeholder="Entrez votre mot de passe" 
      />
      <Button title="Se connecter" onPress={handleLogin} />
    </View>
  );
}
