import { DrawerActions } from "@react-navigation/native";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const screenTitles = {
  Login: "Entrar",
  Cadastro: "Cadastro",
  CEP: "Buscar CEP",
  Home: "Garagem",
  Formulario: "Nova Moto",
  EditarCarro: "Editar Moto",
};

export default function Navbar({ navigation, route }) {
  const title = screenTitles[route.name] || route.name;

  return (
    <SafeAreaView edges={["top"]} style={styles.safeArea}>
      <View style={styles.navbar}>
        <TouchableOpacity
          activeOpacity={0.75}
          style={styles.menuButton}
          onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}
        >
          <View style={styles.menuLine} />
          <View style={styles.menuLine} />
          <View style={styles.menuLineShort} />
        </TouchableOpacity>

        <View style={styles.brandArea}>
          <View style={styles.logoShell}>
            <Image source={require("../assets/PLG.png")} style={styles.logo} />
          </View>
          <View style={styles.titleBox}>
            <Text style={styles.brand}>MOTOGP</Text>
            <Text style={styles.title}>{title}</Text>
          </View>
        </View>

        <View style={styles.statusDot} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: "#10111b",
  },
  navbar: {
    height: 72,
    backgroundColor: "#10111b",
    borderBottomWidth: 1,
    borderBottomColor: "#2a1b28",
    paddingHorizontal: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    shadowColor: "#f23845",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.18,
    shadowRadius: 18,
    elevation: 10,
  },
  menuButton: {
    width: 46,
    height: 46,
    borderRadius: 16,
    backgroundColor: "#1c1d29",
    borderWidth: 1,
    borderColor: "#34343d",
    alignItems: "center",
    justifyContent: "center",
  },
  menuLine: {
    width: 20,
    height: 3,
    borderRadius: 999,
    backgroundColor: "#ffffff",
    marginVertical: 2,
  },
  menuLineShort: {
    width: 14,
    height: 3,
    borderRadius: 999,
    backgroundColor: "#ff5362",
    marginVertical: 2,
    alignSelf: "flex-start",
    marginLeft: 12,
  },
  brandArea: {
    flex: 1,
    marginHorizontal: 14,
    flexDirection: "row",
    alignItems: "center",
  },
  logoShell: {
    width: 44,
    height: 44,
    borderRadius: 15,
    backgroundColor: "#181827",
    borderWidth: 1,
    borderColor: "#ff4051",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
  },
  logo: {
    width: 32,
    height: 32,
    resizeMode: "contain",
    borderRadius: 16,
  },
  titleBox: {
    flex: 1,
  },
  brand: {
    color: "#ff5362",
    fontSize: 12,
    fontWeight: "900",
  },
  title: {
    color: "#ffffff",
    fontSize: 18,
    fontWeight: "800",
    marginTop: 2,
  },
  statusDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: "#f23845",
    shadowColor: "#f23845",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 8,
    elevation: 6,
  },
});
