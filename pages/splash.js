import { useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { View, Image, StyleSheet } from "react-native";

export default function Splash({ navigation }) {
  useEffect(() => {
    const validacao = async () => {
      const token = await AsyncStorage.getItem("token");
      console.log("Token encontrado:", token);

      if (token) {
        navigation.replace("CEP");
      } else {
        navigation.replace("Login");
      }
    };

    const time = setTimeout(() => {
      validacao();
    }, 3000);

    return () => clearTimeout(time);
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Image 
        source={require('../assets/PLG.png')} 
        style={styles.logo}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#007bff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 150,
    height: 150,
    resizeMode: 'contain',
  },
});
