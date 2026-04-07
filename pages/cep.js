import { View, TextInput, TouchableOpacity, Text, StyleSheet, ScrollView, Alert } from 'react-native';
import { useState } from 'react';
import axios from 'axios';

export default function CEP({ navigation }) {
  const [cep, setCep] = useState("");
  const [endereco, setEndereco] = useState({
    logradouro: "",
    bairro: "",
    localidade: "",
    uf: "",
  });

  async function Buscar() {
    if (cep === "") {
      Alert.alert("ERRO", "Digite um CEP");
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

        <TouchableOpacity onPress={() => navigation.navigate("Login")}>
          <Text style={styles.link}>Voltar ao login</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0f0f0",
    padding: 20,
  },
  card: {
    backgroundColor: "#fff",
    padding: 25,
    borderRadius: 10,
    elevation: 3,
    marginTop: 50,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 30,
    color: "#333",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 12,
    marginBottom: 15,
    fontSize: 16,
    backgroundColor: "#fff",
  },
  button: {
    backgroundColor: "#007bff",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 20,
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
    borderTopColor: "#eee",
  },
  resultItem: {
    flexDirection: "row",
    marginBottom: 12,
  },
  label: {
    width: 70,
    fontSize: 14,
    fontWeight: "bold",
    color: "#666",
  },
  value: {
    flex: 1,
    fontSize: 14,
    color: "#333",
  },
  link: {
    textAlign: "center",
    marginTop: 20,
    color: "#007bff",
    fontSize: 14,
  },
});
