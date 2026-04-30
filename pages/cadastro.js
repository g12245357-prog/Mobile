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
      return;
      
    }
    try {
      const response = await axios.post("http://10.0.2.2:8000/api/cadastro_de_usuario", values);
      console.log(response.data);

      Alert.alert("Sucesso!", "Cadastro Realizado com sucesso!");
      navigation.navigate("Login");

    } catch (error) {
      console.log("ERRO", error.response?.data?.errors || error.response?.data || error.message);
      Alert.alert("ERRO", "Nao foi possivel realizar o cadastro.");
    
    }

  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.card}>
        <View style={styles.glow} />
        <View style={styles.hero}>
          <Text style={styles.eyebrow}>NOVA CONTA</Text>
          <Text style={styles.brand}>MOTOGP</Text>
          <Text style={styles.title}>Criar piloto</Text>
          <View style={styles.badge}>
            <Text style={styles.badgeText}>ID</Text>
          </View>
        </View>

        <Text style={styles.label}>Nome *</Text>

        <TextInput
          style={styles.input}
          placeholder="Nome"
          placeholderTextColor="#999"
          value={nome}
          onChangeText={setNome}
        />

        <Text style={styles.label}>E-mail *</Text>

        <TextInput
          style={styles.input}
          placeholder="E-mail"
          placeholderTextColor="#999"
          keyboardType="email-address"
          autoCapitalize="none"
          value={email}
          onChangeText={setEmail}
        />

        <Text style={styles.label}>Senha *</Text>

        <TextInput
          style={styles.input}
          placeholder="Senha"
          placeholderTextColor="#999"
          secureTextEntry
          autoCapitalize="none"
          value={senha}
          onChangeText={setSenha}
        />

        <Text style={styles.label}>Data de nascimento *</Text>

        <TextInput
          style={styles.input}
          placeholder="Data de Nascimento (dd/mm/aaaa)"
          placeholderTextColor="#999"
          value={nasc}
          onChangeText={setNasc}
        />

        <Text style={styles.label}>Genero *</Text>

        <TextInput
          style={styles.input}
          placeholder="Genero"
          placeholderTextColor="#999"
          value={gen}
          onChangeText={setGen}
        />

        <Text style={styles.label}>Telefone *</Text>

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
    marginTop: 18,
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
    height: 340,
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
  label: {
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
    marginTop: 10,
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
  link: {
    textAlign: "center",
    color: "#ff5362",
    fontSize: 14,
    fontWeight: "800",
  },
});
