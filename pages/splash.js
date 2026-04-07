import { useEffect } from "react";
import { View, Image, StyleSheet } from "react-native";

export default function Splash({ navigation }) {

  useEffect(() => {
    const time = setTimeout(() => {
      navigation.navigate("Login");
    }, 3000);

    return () => clearTimeout(time);
  }, []);

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