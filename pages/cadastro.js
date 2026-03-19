import { View, TextInput, TouchableOpacity, Text, StyleSheet, Image, StatusBar, ScrollView, Alert } from 'react-native';
import { useFonts } from 'expo-font';
import { useState } from 'react';

export default function Cadastro({ navigation }) {

  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [telefone, setTelefone] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmSenha, setConfirmSenha] = useState("");
  const [aceitoTermos, setAceitoTermos] = useState(false);

  function Registrar() {
    if (nome === "" || email === "" || telefone === "" || senha === "" || confirmSenha === "") {
      Alert.alert("ERRO", "Favor preencher todos os campos");
    } else if (senha !== confirmSenha) {
      Alert.alert("ERRO", "As senhas não coincidem");
    } else if (!aceitoTermos) {
      Alert.alert("ERRO", "Você precisa aceitar os termos de uso");
    } else {
      Alert.alert("Sucesso!", "Cadastro realizado com sucesso!");
      // Aqui você pode salvar os dados ou navegar para outra tela
      navigation.navigate("Login");
    }
  }

  const [fonts] = useFonts({ 
    'pele': require('../assets/fontes/pele.ttf')  
  });

  if (!fonts) {
    return null;
  }
  
  return (
    <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
      <StatusBar barStyle="light-content" backgroundColor="#ef4444" />
      
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.logoContainer}>
            <Image 
              source={{ uri: 'PLG.png' }}
              style={styles.logo}
            />
          </View>
          <Text style={styles.txt}>MotoGP</Text>
          <Text style={styles.headerSubtitle}>Junte-se à equipe</Text>
        </View>
        
        {/* Card de cadastro */}
        <View style={styles.card}>
          <Text style={styles.title}>Criar Conta</Text>
          <Text style={styles.subtitle}>Preencha seus dados para começar</Text>
          
          {/* Nome completo */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>NOME COMPLETO</Text>
            <View style={styles.inputWrapper}>
              <TextInput
                style={styles.input}
                placeholder="Digite seu nome completo"
                placeholderTextColor="#aaa"
                value={nome}
                onChangeText={setNome}
              />
            </View>
          </View>
          
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
                value={email}
                onChangeText={setEmail}
              />
            </View>
          </View>
          
          {/* Telefone */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>TELEFONE</Text>
            <View style={styles.inputWrapper}>
              <TextInput
                style={styles.input}
                placeholder="(11) 99999-9999"
                placeholderTextColor="#aaa"
                keyboardType="phone-pad"
                value={telefone}
                onChangeText={setTelefone}
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
                value={senha}
                onChangeText={setSenha}
              />
            </View>
          </View>
          
          {/* Confirmar senha */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>CONFIRMAR SENHA</Text>
            <View style={styles.inputWrapper}>
              <TextInput
                style={styles.input}
                placeholder="••••••••"
                placeholderTextColor="#aaa"
                secureTextEntry
                value={confirmSenha}
                onChangeText={setConfirmSenha}
              />
            </View>
          </View>
          
          {/* Termos de uso */}
          <View style={styles.termsContainer}>
            <TouchableOpacity 
              style={styles.checkbox} 
              onPress={() => setAceitoTermos(!aceitoTermos)}
            >
              {aceitoTermos && <View style={styles.checkboxInner} />}
            </TouchableOpacity>
            <Text style={styles.termsText}>
              Li e aceito os <Text style={styles.termsLink}>Termos de Uso</Text> e 
              <Text style={styles.termsLink}> Política de Privacidade</Text>
            </Text>
          </View>
          
          {/* Botão de cadastro */}
          <TouchableOpacity style={styles.registerBtn} onPress={Registrar}>
            <Text style={styles.registerBtnText}>CRIAR CONTA</Text>
          </TouchableOpacity>
          
          {/* Divisor */}
          <View style={styles.divider}>
            <View style={styles.dividerLine} />
            <Text style={styles.dividerText}>ou</Text>
            <View style={styles.dividerLine} />
          </View>
          
          {/* Cadastro com redes sociais */}
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
          
          {/* Link para login */}
          <View style={styles.loginContainer}>
            <Text style={styles.loginText}>Já tem uma conta? </Text>
            <TouchableOpacity onPress={() => navigation.navigate("Login")}>
              <Text style={styles.loginLink}>Fazer login</Text>
            </TouchableOpacity>
          </View>
        </View>
        
        {/* Rodapé */}
        <Text style={styles.footer}>MotoGP © 2026 - Todos os direitos reservados</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  container: {
    flex: 1,
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
  termsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 25,
    marginTop: 5,
  },
  checkbox: {
    width: 22,
    height: 22,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: '#ef4444',
    marginRight: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkboxInner: {
    width: 12,
    height: 12,
    borderRadius: 3,
    backgroundColor: '#ef4444',
  },
  termsText: {
    flex: 1,
    fontSize: 13,
    color: '#666',
    lineHeight: 18,
  },
  termsLink: {
    color: '#ef4444',
    fontWeight: '600',
  },
  registerBtn: {
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
  registerBtnText: {
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
  loginContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 5,
  },
  loginText: {
    color: '#999',
    fontSize: 14,
  },
  loginLink: {
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