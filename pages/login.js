import { View, TextInput, TouchableOpacity, Text, StyleSheet, Alert } from 'react-native';
import { useState } from 'react';

export default function Login({ navigation }) {

  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");

  function Logar() {
    if (user === "" || pass === "") {
      Alert.alert("ERRO", "Preencha todos os campos");
    } else if (user === "william" && pass === "123") {
      Alert.alert("Sucesso!", "Login realizado!");
      navigation.navigate("CEP");
    } else {
      Alert.alert("ERRO!", "Usuário ou senha incorretos!");
    }
  }
  
  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>Login</Text>
        
        <TextInput
          style={styles.input}
          placeholder="Usuário"
          placeholderTextColor="#999"
          value={user}
          onChangeText={setUser}
        />
        
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
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    padding: 20,
  },
  card: {
    backgroundColor: '#fff',
    padding: 25,
    borderRadius: 10,
    elevation: 3,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 30,
    color: '#333',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    marginBottom: 15,
    fontSize: 16,
    backgroundColor: '#fff',
  },
  button: {
    backgroundColor: '#007bff',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  link: {
    textAlign: 'center',
    marginTop: 20,
    color: '#007bff',
    fontSize: 14,
  },
});