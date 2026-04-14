import { View, TextInput, TouchableOpacity, Text, StyleSheet, ScrollView, Alert } from 'react-native';
import axios from 'axios';
import { useState } from 'react';

export default function Cadastro({ navigation }) {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [nasc, setNasc] = useState("");
  const [gen, setGen] = useState("");
  const [tel, setTel] = useState("");

  function formatApi(data) {
    
    const [dia, mes, ano] = data.split("/");
    return `${ano}-${mes}-${dia}`;

  }
   
    const values = {
      nome: nome,
      email: email,
      senha: senha,
      telefone: tel,
      nascimento: formatApi(nasc),
      genero: gen,
    };

  async function Cadastrar() {
   
     if (nome === "" || email === "" || senha === "" || tel === "" || nasc === "" || gen === "") {

      Alert.alert("ERRO", "Favor Preencher todos os Campos!");
      
    }
    try {
      const response = await axios.post("http://10.0.2.2:8000/api/cadastro_de_usuario", values);
      console.log(response.data);

      Alert.alert("Sucesso!", "Cadastro Realizado com sucesso!");
      navigation.navigate("Login");

    } catch (error) {
      console.log("ERRO", error.response.data.errors || error.response.data || error.message);
    
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
          value={nasc}
          onChangeText={setNasc}
        />

        <TextInput
          style={styles.input}
          placeholder="Genero"
          placeholderTextColor="#999"
          value={gen}
          onChangeText={setGen}
        />

        <TextInput
          style={styles.input}
          placeholder="Telefone"
          placeholderTextColor="#999"
          keyboardType="phone-pad"
          value={tel}
          onChangeText={setTel}
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
    marginTop: 10,
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
  link: {
    textAlign: "center",
    color: "#8b5cf6",
    fontSize: 14,
    fontWeight: "500",
  },
});
