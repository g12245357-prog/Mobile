import { View, TextInput, TouchableOpacity, Text, StyleSheet, Alert, ScrollView } from 'react-native';
import { useState } from 'react';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Login({ navigation }) {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");

  function getToken(data) {
    const token =
      data?.token ||
      data?.access_token ||
      data?.accessToken ||
      data?.data?.token ||
      data?.data?.access_token;

    return typeof token === "string" ? token.trim() : "";
  }

  async function Logar() {

    if (email === "" || pass === "") {
      Alert.alert("ERRO", "Favor Preencher todos os Campos!");
      return;
    }

    try {
      const response = await axios.post("http://10.0.2.2:8000/api/login_novo", {
        email: email,
        senha: pass,
      });

      console.log(response.data);
      const token = getToken(response.data);

      if (token) {

        await AsyncStorage.setItem("token", token);

        Alert.alert("Sucesso", "Login Realizado com Sucesso!");
        navigation.navigate("CEP");
      } else {

        Alert.alert("ERRO", response.data?.msg || response.data?.message || "Token nao encontrado.");


      }
     } catch (error) {
     
      console.log("ERRO", error.response?.data || error.message || error);

    }
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.card}>
        <View style={styles.glow} />
        <View style={styles.hero}>
          <Text style={styles.eyebrow}>AREA DO PILOTO</Text>
          <Text style={styles.brand}>MOTOGP</Text>
          <Text style={styles.title}>Acessar garagem</Text>
          <View style={styles.speedBadge}>
            <Text style={styles.speedBadgeText}>GO</Text>
          </View>
        </View>

        <Text style={styles.label}>E-mail</Text>

        <TextInput
          style={styles.input}
          placeholder="E-mail"
          placeholderTextColor="#999"
          autoCapitalize="none"
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
        />

        <Text style={styles.label}>Senha</Text>

        <TextInput
          style={styles.input}
          placeholder="Senha"
          placeholderTextColor="#999"
          secureTextEntry
          value={pass}
          onChangeText={setPass}
        />

        <TouchableOpacity style={styles.button} onPress={Logar}>
          <Text style={styles.buttonText}>ENTRAR</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate("Cadastro")}>
          <Text style={styles.link}>Criar conta</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0d0e16',
  },
  content: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 22,
  },
  card: {
    position: 'relative',
    overflow: 'hidden',
    backgroundColor: '#141520',
    borderRadius: 28,
    elevation: 12,
    borderWidth: 1,
    borderColor: '#2a1b28',
    shadowColor: '#f23845',
    shadowOffset: { width: 0, height: 18 },
    shadowOpacity: 0.22,
    shadowRadius: 26,
    padding: 24,
  },
  glow: {
    position: 'absolute',
    right: -80,
    top: 120,
    width: 160,
    height: 260,
    borderRadius: 80,
    backgroundColor: 'rgba(242, 56, 69, 0.16)',
  },
  hero: {
    backgroundColor: '#d92335',
    borderRadius: 24,
    paddingTop: 28,
    paddingBottom: 30,
    paddingHorizontal: 18,
    margin: -24,
    marginBottom: 28,
    alignItems: 'center',
  },
  eyebrow: {
    color: '#ffd7dc',
    fontSize: 12,
    fontWeight: '900',
    marginBottom: 10,
  },
  brand: {
    color: '#ffffff',
    fontSize: 36,
    fontWeight: '900',
    letterSpacing: 0,
    marginBottom: 14,
  },
  title: {
    fontSize: 22,
    fontWeight: '800',
    textAlign: 'center',
    color: '#ffffff',
  },
  speedBadge: {
    position: 'absolute',
    right: 22,
    bottom: -34,
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: '#181827',
    borderWidth: 2,
    borderColor: '#ff4051',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#ff4051',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.45,
    shadowRadius: 14,
    elevation: 8,
  },
  speedBadgeText: {
    color: '#ff4051',
    fontSize: 22,
    fontWeight: '900',
  },
  label: {
    color: '#f1f2f7',
    fontSize: 15,
    fontWeight: '800',
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#34343d',
    borderLeftWidth: 4,
    borderLeftColor: '#f23845',
    borderRadius: 14,
    padding: 16,
    marginBottom: 18,
    fontSize: 16,
    backgroundColor: '#282828',
    color: '#ffffff',
  },
  button: {
    backgroundColor: '#f23845',
    padding: 16,
    borderRadius: 16,
    alignItems: 'center',
    marginTop: 10,
    elevation: 6,
    shadowColor: '#f23845',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.35,
    shadowRadius: 14,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '800',
  },
  link: {
    textAlign: 'center',
    marginTop: 22,
    color: '#ff5362',
    fontSize: 14,
    fontWeight: '800',
  },
});
