import { View, TextInput, TouchableOpacity, Text, StyleSheet, ScrollView, Alert } from 'react-native';
import axios from 'axios';
import { useState } from 'react';

export default function Cadastro({ navigation }) {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [dataNascimento, setDataNascimento] = useState("");
  const [genero, setGenero] = useState("");
  const [telefone, setTelefone] = useState("");

  function formatApi(data) {
    const partes = data.split("/");

    if (partes.length !== 3) {
      return "";
    }

    const [dia, mes, ano] = partes;
    return `${ano}-${mes}-${dia}`;
  }

  async function Cadastrar() {
    if (nome === "" || email === "" || senha === "" || genero === "" || dataNascimento === "" || telefone === "") {
      Alert.alert("ERRO", "Preencha todos os campos");
      return;
    }

    const nascimentoFormatado = formatApi(dataNascimento);

    if (!nascimentoFormatado) {
      Alert.alert("ERRO", "Informe a data no formato dd/mm/aaaa");
      return;
    }

    const values = {
      nome: nome,
      email: email,
      senha: senha,
      telefone: telefone,
      nascimento: nascimentoFormatado,
      genero: genero,
    };

    try {
      const response = await axios.post("http://10.0.2.2:8000/api/cadastro_de_usuario", values);
      console.log("Resposta Cadastro:", response.data);

      Alert.alert("Sucesso!", `${nome} foi cadastrado com sucesso!`);

      navigation.navigate("Login");
    } catch (error) {
      const errorData = error.response?.data;
      console.log("Erro Cadastro:", errorData || error.message);

      const mensagemErro =
        errorData?.message ||
        (errorData?.errors ? JSON.stringify(errorData.errors) : "Falha ao cadastrar usuario");

      Alert.alert("Erro ao cadastrar", mensagemErro);
    }
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>Cadastro</Text>

        <TextInput
          style={styles.input}
          placeholder="Nome"
          placeholderTextColor="#999"
          value={nome}
          onChangeText={setNome}
        />

        <TextInput
          style={styles.input}
          placeholder="E-mail"
          placeholderTextColor="#999"
          keyboardType="email-address"
          autoCapitalize="none"
          value={email}
          onChangeText={setEmail}
        />

        <TextInput
          style={styles.input}
          placeholder="Senha"
          placeholderTextColor="#999"
          secureTextEntry
          autoCapitalize="none"
          value={senha}
          onChangeText={setSenha}
        />

        <TextInput
          style={styles.input}
          placeholder="Data de Nascimento (dd/mm/aaaa)"
          placeholderTextColor="#999"
          value={dataNascimento}
          onChangeText={setDataNascimento}
        />

        <TextInput
          style={styles.input}
          placeholder="Genero"
          placeholderTextColor="#999"
          value={genero}
          onChangeText={setGenero}
        />

        <TextInput
          style={styles.input}
          placeholder="Telefone"
          placeholderTextColor="#999"
          keyboardType="phone-pad"
          value={telefone}
          onChangeText={setTelefone}
        />

        <TouchableOpacity style={styles.button} onPress={Cadastrar}>
          <Text style={styles.buttonText}>CADASTRAR</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate("Login")}>
          <Text style={styles.link}>Voltar para login</Text>
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
  },
  button: {
    backgroundColor: "#007bff",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 10,
    marginBottom: 20,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  link: {
    textAlign: "center",
    color: "#007bff",
    fontSize: 14,
  },
});
