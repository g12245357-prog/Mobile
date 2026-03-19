import { View, TextInput, TouchableOpacity, Text, StyleSheet, Image, Alert, StatusBar } from 'react-native';
import { useFonts } from 'expo-font';
import { useState } from 'react';

export default function Login({ navigation }) {

  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");

  function Logar() {
    if (user === "" || pass === "") {
      Alert.alert("ERRO", "Favor Preencher todos os campos");
    } else if (user === "william" && pass === "123") {
      Alert.alert("Sucesso!", "Usuário Logado com Sucesso!");
      navigation.navigate("Cadastro");
    } else {
      Alert.alert("ERRO!", "Usuário não Cadastrado!");
    }
  }

  const [fonts] = useFonts({ 
    'pele': require('../assets/fontes/pele.ttf')  
  });

  if (!fonts) {
    return null;
  }
  
  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#ef4444" />
      
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.logoContainer}>
          <Image 
            source={{ uri: 'PLG.png' }}
            style={styles.logo}
          />
        </View>
        <Text style={styles.txt}>MotoGP</Text>
        <Text style={styles.headerSubtitle}>Bem-vindo de volta!</Text>
      </View>
      
      {/* Card de login */}
      <View style={styles.card}>
        <Text style={styles.title}>Acessar Conta</Text>
        <Text style={styles.subtitle}>Digite seus dados para entrar</Text>
        
        {/* Email */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>E-MAIL</Text>
          <View style={styles.inputWrapper}>
            <TextInput
              style={styles.input}
              placeholder="seu.email@exemplo.com"
              placeholderTextColor="#aaa"
              keyboardType="email-address"
              autoCapitalize="none"
              value={user}
              onChangeText={setUser}
            />
          </View>
        </View>
        
        {/* Senha */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>SENHA</Text>
          <View style={styles.inputWrapper}>
            <TextInput
              style={styles.input}
              placeholder="••••••••"
              placeholderTextColor="#aaa"
              secureTextEntry
              value={pass}
              onChangeText={setPass}
            />
          </View>
        </View>
        
        {/* Esqueceu a senha */}
        <TouchableOpacity style={styles.forgotBtn}>
          <Text style={styles.forgotText}>Esqueceu a senha?</Text>
        </TouchableOpacity>
        
        {/* Botão de login */}
        <TouchableOpacity style={styles.loginBtn} onPress={Logar}>
          <Text style={styles.loginBtnText}>ENTRAR</Text>
        </TouchableOpacity>
        
        {/* Divisor */}
        <View style={styles.divider}>
          <View style={styles.dividerLine} />
          <Text style={styles.dividerText}>ou</Text>
          <View style={styles.dividerLine} />
        </View>
        
        {/* Login com redes sociais */}
        <View style={styles.socialContainer}>
          <TouchableOpacity style={styles.socialBtn}>
            <Text style={styles.socialBtnText}>G</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.socialBtn}>
            <Text style={styles.socialBtnText}>f</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.socialBtn}>
            <Text style={styles.socialBtnText}>in</Text>
          </TouchableOpacity>
        </View>
        
        {/* Link para cadastro */}
        <View style={styles.signupContainer}>
          <Text style={styles.signupText}>Não tem uma conta? </Text>
          <TouchableOpacity onPress={() => navigation.navigate("Cadastro")}>
            <Text style={styles.signupLink}>Cadastre-se</Text>
          </TouchableOpacity>
        </View>
      </View>
      
      {/* Rodapé */}
      <Text style={styles.footer}>MotoGP © 2026 - Todos os direitos reservados</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    backgroundColor: '#ef4444',
    paddingTop: 60,
    paddingBottom: 80,
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
    alignItems: 'center',
    shadowColor: '#ef4444',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 10,
  },
  logoContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: 'rgba(255,255,255,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
    borderWidth: 3,
    borderColor: 'rgba(255,255,255,0.5)',
  },
  logo: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  txt: {
    fontFamily: "pele",
    fontSize: 36,
    color: "#fff",
    fontWeight: 'bold',
    letterSpacing: 3,
  },
  headerSubtitle: {
    color: '#fff',
    fontSize: 14,
    marginTop: 5,
    opacity: 0.9,
    fontWeight: '500',
  },
  card: {
    backgroundColor: '#fff',
    marginHorizontal: 20,
    marginTop: -50,
    borderRadius: 25,
    padding: 25,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.1,
    shadowRadius: 15,
    elevation: 8,
    marginBottom: 30,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 14,
    color: '#999',
    marginBottom: 25,
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 12,
    fontWeight: '600',
    color: '#666',
    marginBottom: 5,
    marginLeft: 5,
    letterSpacing: 1,
  },
  inputWrapper: {
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 12,
    backgroundColor: '#fafafa',
  },
  input: {
    padding: 15,
    fontSize: 15,
    color: '#333',
  },
  forgotBtn: {
    alignSelf: 'flex-end',
    marginBottom: 25,
  },
  forgotText: {
    color: '#ef4444',
    fontSize: 13,
    fontWeight: '600',
  },
  loginBtn: {
    backgroundColor: '#ef4444',
    padding: 18,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#ef4444',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 5,
    marginBottom: 20,
  },
  loginBtnText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 16,
    letterSpacing: 2,
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#e0e0e0',
  },
  dividerText: {
    color: '#999',
    paddingHorizontal: 15,
    fontSize: 14,
  },
  socialContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 15,
    marginBottom: 25,
  },
  socialBtn: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#f5f5f5',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  socialBtnText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#666',
  },
  signupContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 5,
  },
  signupText: {
    color: '#999',
    fontSize: 14,
  },
  signupLink: {
    color: '#ef4444',
    fontSize: 14,
    fontWeight: '700',
  },
  footer: {
    textAlign: 'center',
    color: '#999',
    fontSize: 12,
    paddingBottom: 20,
    paddingHorizontal: 20,
  },
});