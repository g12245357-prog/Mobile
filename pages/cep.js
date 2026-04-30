import { View, TextInput, TouchableOpacity, Text, StyleSheet, ScrollView, Alert } from 'react-native';
import { useEffect, useState } from 'react';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Cep({ navigation }) {
  const [cep, setCep] = useState("");
  const [endereco, setEndereco] = useState({
    logradouro: "",
    bairro: "",
    localidade: "",
    uf: "",
  });

  useEffect(() => {
    async function validarToken() {
      const token = await AsyncStorage.getItem("token");

      if (!token) {
        Alert.alert("ERRO", "Voce precisa fazer login");
        navigation.replace("Login");
      }
    }

    validarToken();
  }, [navigation]);

  async function Buscar() {
    if (cep === "") {
      Alert.alert("ERRO", "Digite um CEP");
      return;
    }

    if (cep.length !== 8) {
      Alert.alert("ERRO", "Digite um CEP com 8 numeros");
      return;
    }

    try {
      const response = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);
      console.log("Resposta BuscaCep:", response.data);

      if (response.data.erro) {
        Alert.alert("ERRO", "CEP nao encontrado!");
        return;
      }

      const dadosEndereco = {
        logradouro: response.data.logradouro || "",
        bairro: response.data.bairro || "",
        localidade: response.data.localidade || "",
        uf: response.data.uf || "",
      };

      setEndereco(dadosEndereco);

      Alert.alert(
        "Resposta da API",
        `Rua: ${dadosEndereco.logradouro || "---"}\nBairro: ${dadosEndereco.bairro || "---"}\nCidade: ${dadosEndereco.localidade || "---"}\nEstado: ${dadosEndereco.uf || "---"}`
      );
    } catch (error) {
      console.log("Erro BuscaCep:", error.response?.data || error.message);
      Alert.alert("ERRO", "Falha ao buscar CEP");
    }
  }

  async function Sair() {
    await AsyncStorage.removeItem("token");
    navigation.replace("Login");
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.card}>
        <View style={styles.glow} />
        <View style={styles.hero}>
          <Text style={styles.eyebrow}>LOCALIZADOR</Text>
          <Text style={styles.brand}>MOTOGP</Text>
          <Text style={styles.title}>Buscar CEP</Text>
          <View style={styles.badge}>
            <Text style={styles.badgeText}>BR</Text>
          </View>
        </View>

        <Text style={styles.fieldLabel}>CEP *</Text>

        <TextInput
          style={styles.input}
          placeholder="Digite o CEP"
          placeholderTextColor="#999"
          keyboardType="numeric"
          value={cep}
          onChangeText={setCep}
          maxLength={8}
        />

        <TouchableOpacity style={styles.button} onPress={Buscar}>
          <Text style={styles.buttonText}>BUSCAR</Text>
        </TouchableOpacity>

        <View style={styles.resultArea}>
          <View style={styles.resultItem}>
            <Text style={styles.resultLabel}>Rua:</Text>
            <Text style={styles.value}>{endereco.logradouro || "---"}</Text>
          </View>

          <View style={styles.resultItem}>
            <Text style={styles.resultLabel}>Bairro:</Text>
            <Text style={styles.value}>{endereco.bairro || "---"}</Text>
          </View>

          <View style={styles.resultItem}>
            <Text style={styles.resultLabel}>Cidade:</Text>
            <Text style={styles.value}>{endereco.localidade || "---"}</Text>
          </View>

          <View style={styles.resultItem}>
            <Text style={styles.resultLabel}>Estado:</Text>
            <Text style={styles.value}>{endereco.uf || "---"}</Text>
          </View>
        </View>

        <TouchableOpacity onPress={Sair}>
          <Text style={styles.link}>Sair</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0d0e16",
  },
  content: {
    padding: 20,
    paddingBottom: 34,
  },
  card: {
    position: "relative",
    overflow: "hidden",
    backgroundColor: "#141520",
    padding: 24,
    borderRadius: 28,
    elevation: 12,
    marginTop: 34,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: "#2a1b28",
    shadowColor: "#f23845",
    shadowOffset: { width: 0, height: 18 },
    shadowOpacity: 0.22,
    shadowRadius: 26,
  },
  glow: {
    position: "absolute",
    right: -80,
    top: 140,
    width: 160,
    height: 280,
    borderRadius: 80,
    backgroundColor: "rgba(242, 56, 69, 0.16)",
  },
  hero: {
    backgroundColor: "#d92335",
    borderRadius: 24,
    paddingTop: 30,
    paddingBottom: 32,
    paddingHorizontal: 18,
    margin: -24,
    marginBottom: 30,
    alignItems: "center",
  },
  eyebrow: {
    color: "#ffd7dc",
    fontSize: 12,
    fontWeight: "900",
    marginBottom: 10,
  },
  brand: {
    color: "#ffffff",
    fontSize: 36,
    fontWeight: "900",
    letterSpacing: 0,
    marginBottom: 14,
  },
  title: {
    fontSize: 23,
    fontWeight: "800",
    textAlign: "center",
    color: "#ffffff",
  },
  badge: {
    position: "absolute",
    right: 22,
    bottom: -34,
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: "#181827",
    borderWidth: 2,
    borderColor: "#ff4051",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#ff4051",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.45,
    shadowRadius: 14,
    elevation: 8,
  },
  badgeText: {
    color: "#ff4051",
    fontSize: 22,
    fontWeight: "900",
  },
  fieldLabel: {
    color: "#f1f2f7",
    fontSize: 15,
    fontWeight: "800",
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: "#34343d",
    borderLeftWidth: 4,
    borderLeftColor: "#f23845",
    borderRadius: 14,
    padding: 16,
    marginBottom: 18,
    fontSize: 16,
    backgroundColor: "#282828",
    color: "#ffffff",
  },
  button: {
    backgroundColor: "#f23845",
    padding: 16,
    borderRadius: 16,
    alignItems: "center",
    marginBottom: 20,
    shadowColor: "#f23845",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.35,
    shadowRadius: 14,
    elevation: 6,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "800",
  },
  resultArea: {
    marginTop: 20,
    padding: 16,
    borderRadius: 16,
    backgroundColor: "#1c1d29",
    borderWidth: 1,
    borderColor: "#34343d",
    borderLeftWidth: 4,
    borderLeftColor: "#f23845",
  },
  resultItem: {
    flexDirection: "row",
    marginBottom: 13,
    alignItems: "flex-start",
  },
  resultLabel: {
    width: 70,
    fontSize: 14,
    fontWeight: "800",
    color: "#ffffff",
  },
  value: {
    flex: 1,
    fontSize: 14,
    color: "#b8bac7",
    lineHeight: 20,
  },
  link: {
    textAlign: "center",
    marginTop: 22,
    color: "#ff5362",
    fontSize: 14,
    fontWeight: "800",
  },
});
