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
    <ScrollView style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>Buscar CEP</Text>

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
            <Text style={styles.label}>Rua:</Text>
            <Text style={styles.value}>{endereco.logradouro || "---"}</Text>
          </View>

          <View style={styles.resultItem}>
            <Text style={styles.label}>Bairro:</Text>
            <Text style={styles.value}>{endereco.bairro || "---"}</Text>
          </View>

          <View style={styles.resultItem}>
            <Text style={styles.label}>Cidade:</Text>
            <Text style={styles.value}>{endereco.localidade || "---"}</Text>
          </View>

          <View style={styles.resultItem}>
            <Text style={styles.label}>Estado:</Text>
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
    backgroundColor: "#f3e8ff",
    padding: 20,
  },
  card: {
    backgroundColor: "#ffffff",
    padding: 25,
    borderRadius: 15,
    elevation: 5,
    marginTop: 50,
    shadowColor: "#7c3aed",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 30,
    color: "#7c3aed",
  },
  input: {
    borderWidth: 1,
    borderColor: "#e9d5ff",
    borderRadius: 10,
    padding: 12,
    marginBottom: 15,
    fontSize: 16,
    backgroundColor: "#faf5ff",
    color: "#4c1d95",
  },
  button: {
    backgroundColor: "#8b5cf6",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 20,
    shadowColor: "#7c3aed",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 3,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  resultArea: {
    marginTop: 20,
    paddingTop: 20,
    borderTopWidth: 1,
    borderTopColor: "#e9d5ff",
  },
  resultItem: {
    flexDirection: "row",
    marginBottom: 12,
  },
  label: {
    width: 70,
    fontSize: 14,
    fontWeight: "bold",
    color: "#7c3aed",
  },
  value: {
    flex: 1,
    fontSize: 14,
    color: "#4c1d95",
  },
  link: {
    textAlign: "center",
    marginTop: 20,
    color: "#8b5cf6",
    fontSize: 14,
    fontWeight: "500",
  },
});
