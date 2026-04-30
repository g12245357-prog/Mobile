import { useEffect, useRef } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Animated, Easing, Image, ImageBackground, StyleSheet, Text, View } from "react-native";

export default function Splash({ navigation }) {
  const fade = useRef(new Animated.Value(0)).current;
  const scale = useRef(new Animated.Value(0.92)).current;
  const slide = useRef(new Animated.Value(22)).current;
  const progress = useRef(new Animated.Value(0)).current;
  
  useEffect(() => {
    Animated.parallel([
      Animated.timing(fade, {
        toValue: 1,
        duration: 900,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }),
      Animated.timing(scale, {
        toValue: 1,
        duration: 900,
        easing: Easing.out(Easing.back(1.4)),
        useNativeDriver: true,
      }),
      Animated.timing(slide, {
        toValue: 0,
        duration: 900,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }),
      Animated.timing(progress, {
        toValue: 1,
        duration: 2800,
        easing: Easing.inOut(Easing.cubic),
        useNativeDriver: false,
      }),
    ]).start();

    const validacao = async () => {
      
      const token = await AsyncStorage.getItem("token");
      console.log("Token encontrado:", token);

      if (token) {
        navigation.navigate("CEP");
      } else {
        navigation.navigate("Login");
      }
    };

    const timer = setTimeout(()=>{

validacao();

    },3000);

    return () => clearTimeout(timer);

    
  }, []);

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("../assets/moto.webp")}
        style={styles.background}
        imageStyle={styles.backgroundImage}
      >
        <View style={styles.overlay} />
        <View style={styles.redGlow} />
        <View style={styles.trackLineOne} />
        <View style={styles.trackLineTwo} />

        <Animated.View
          style={[
            styles.content,
            {
              opacity: fade,
              transform: [{ translateY: slide }, { scale }],
            },
          ]}
        >
          <View style={styles.logoShell}>
            <Image
              source={require("../assets/PLG.png")}
              style={styles.logo}
            />
          </View>

          <Text style={styles.kicker}>RACING GARAGE</Text>
          <Text style={styles.brand}>MOTOGP</Text>
          <Text style={styles.subtitle}>Velocidade, cadastro e controle na mesma pista.</Text>

          <View style={styles.loadingBox}>
            <View style={styles.loadingTrack}>
              <Animated.View
                style={[
                  styles.loadingProgress,
                  {
                    width: progress.interpolate({
                      inputRange: [0, 1],
                      outputRange: ["12%", "100%"],
                    }),
                  },
                ]}
              />
            </View>
            <Text style={styles.loadingText}>Aquecendo motores...</Text>
          </View>
        </Animated.View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#080910",
  },
  background: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  backgroundImage: {
    opacity: 0.34,
    resizeMode: "cover",
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(8, 9, 16, 0.74)",
  },
  redGlow: {
    position: "absolute",
    width: 360,
    height: 360,
    borderRadius: 180,
    backgroundColor: "rgba(242, 56, 69, 0.28)",
    right: -130,
    top: 80,
  },
  trackLineOne: {
    position: "absolute",
    width: "130%",
    height: 3,
    backgroundColor: "rgba(255, 64, 81, 0.55)",
    transform: [{ rotate: "-18deg" }],
    top: "26%",
  },
  trackLineTwo: {
    position: "absolute",
    width: "120%",
    height: 2,
    backgroundColor: "rgba(255, 255, 255, 0.16)",
    transform: [{ rotate: "-18deg" }],
    bottom: "24%",
  },
  content: {
    width: "100%",
    maxWidth: 420,
    alignItems: "center",
    paddingVertical: 34,
    paddingHorizontal: 24,
    borderRadius: 30,
    backgroundColor: "rgba(20, 21, 32, 0.88)",
    borderWidth: 1,
    borderColor: "rgba(255, 64, 81, 0.32)",
    shadowColor: "#f23845",
    shadowOffset: { width: 0, height: 18 },
    shadowOpacity: 0.36,
    shadowRadius: 28,
    elevation: 16,
  },
  logoShell: {
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: "#10111b",
    borderWidth: 2,
    borderColor: "#ff4051",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 22,
    shadowColor: "#ff4051",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.48,
    shadowRadius: 18,
    elevation: 12,
  },
  logo: {
    width: 112,
    height: 112,
    resizeMode: 'contain',
    borderRadius: 56,
  },
  kicker: {
    color: "#ff5362",
    fontSize: 12,
    fontWeight: "900",
    marginBottom: 8,
  },
  brand: {
    color: "#ffffff",
    fontSize: 44,
    fontWeight: "900",
    letterSpacing: 0,
  },
  subtitle: {
    color: "#c9cad4",
    fontSize: 15,
    lineHeight: 22,
    textAlign: "center",
    marginTop: 10,
    marginBottom: 26,
  },
  loadingBox: {
    width: "100%",
  },
  loadingTrack: {
    width: "100%",
    height: 10,
    borderRadius: 999,
    overflow: "hidden",
    backgroundColor: "#282828",
    borderWidth: 1,
    borderColor: "#34343d",
  },
  loadingProgress: {
    height: "100%",
    borderRadius: 999,
    backgroundColor: "#f23845",
  },
  loadingText: {
    color: "#ffb7bf",
    fontSize: 13,
    fontWeight: "800",
    textAlign: "center",
    marginTop: 12,
  },
});
