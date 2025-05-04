import { Stack } from "expo-router";
import { Button } from "react-native";

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          title: "Accueil",
          headerRight: () => (
            <Button
              title="Info"
              onPress={() => {
                alert("Bouton Info");
              }}
            />
          ),
        }}
      />
      <Stack.Screen name="pages/Login" options={{ title: "Connexion" }} />
      <Stack.Screen name="pages/Register" options={{ title: "Inscription" }} />
    </Stack>
  );
}
