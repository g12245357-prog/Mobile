import { useEffect, useState } from "react";
import axios from "axios";
import { Alert, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const API = "http://10.0.2.2:8000/api";

function pegarId(carro) {
  return carro?.id || carro?.id_carro || carro?.carro_id || carro?.idCarro || carro?.codigo || "";
}

function pegarListaCarros(data) {
  return data?.carro || data?.carros || data?.data || [];
}

export default function EditarCarro({ navigation, route }) {
  const carroRecebido = route.params?.item || {};
  const idRecebido = route.params?.id || pegarId(carroRecebido);

  const [carroId, setCarroId] = useState(idRecebido);
  const [token, setToken] = useState("");
  const [carregando, setCarregando] = useState(true);
  const [salvando, setSalvando] = useState(false);

  const [ano, setAno] = useState("");
  const [cor, setCor] = useState("");
  const [dono, setDono] = useState("");
  const [fabricante, setFabricante] = useState("");
  const [modelo, setModelo] = useState("");
  const [placa, setPlaca] = useState("");
  const [potencia, setPotencia] = useState("");
  const [sobre, setSobre] = useState("");
  const [tipoGasolina, setTipoGasolina] = useState("");
  const [valor, setValor] = useState("");

  function preencherCampos(carro) {
    setCarroId(pegarId(carro));
    setAno(String(carro?.ano || ""));
    setCor(String(carro?.cor || ""));
    setDono(String(carro?.dono || ""));
    setFabricante(String(carro?.fabricante || carro?.marca || ""));
    setModelo(String(carro?.modelo || carro?.nome || ""));
    setPlaca(String(carro?.placa || ""));
    setPotencia(String(carro?.potencia || ""));
    setSobre(String(carro?.sobre || ""));
    setTipoGasolina(String(carro?.tipo_gasolina || carro?.tipoGasolina || ""));
    setValor(String(carro?.valor || ""));
  }

  useEffect(() => {
    async function carregar() {
      try {
        const tokenSalvo = await AsyncStorage.getItem("token");

        if (!tokenSalvo) {
          Alert.alert("ERRO", "Voce precisa fazer login para editar.");
          navigation.replace("Login");
          return;
        }

        setToken(tokenSalvo);
        preencherCampos(carroRecebido);

        if (!idRecebido) {
          Alert.alert("ERRO", "Nao foi possivel identificar a moto.");
          return;
        }

        const response = await axios.get(`${API}/todos_carros`, {
          headers: {
            Authorization: `Bearer ${tokenSalvo}`,
            token: tokenSalvo,
          },
        });

        const lista = pegarListaCarros(response.data);
        const carroBanco = Array.isArray(lista)
          ? lista.find((carro) => String(pegarId(carro)) === String(idRecebido))
          : null;

        if (carroBanco) {
          preencherCampos(carroBanco);
        }
      } catch (error) {
        console.log("ERRO BUSCAR CARRO:", error.response?.data || error.message);
        Alert.alert("ERRO", "Nao foi possivel puxar os dados do banco.");
      } finally {
        setCarregando(false);
      }
    }

    carregar();
  }, [idRecebido, navigation]);

  async function Enviar() {
    if (!carroId) {
      Alert.alert("ERRO", "Nao foi possivel identificar a moto para alterar.");
      return;
    }

    if (!ano || !cor || !dono || !fabricante || !modelo || !placa || !potencia || !sobre || !tipoGasolina || !valor) {
      Alert.alert("ERRO", "Favor preencher todos os campos.");
      return;
    }

    const values = {
      id: carroId,
      id_carro: carroId,
      carro_id: carroId,
      ano,
      cor,
      dono,
      fabricante,
      modelo,
      placa,
      potencia,
      sobre,
      tipo_gasolina: tipoGasolina,
      valor,
    };

    try {
      setSalvando(true);

      const response = await axios.post(`${API}/alterar_carro`, values, {
        headers: {
          Authorization: `Bearer ${token}`,
          token: token,
          "Content-Type": "application/json",
        },
      });

      console.log("ALTERAR CARRO:", response.data);
      Alert.alert("Sucesso!", "Moto alterada com sucesso!");
      navigation.navigate("Home");
    } catch (error) {
      const mensagem =
        error.response?.data?.message ||
        error.response?.data?.msg ||
        JSON.stringify(error.response?.data || error.message);

      console.log("ERRO ALTERAR CARRO:", error.response?.data || error.message);
      Alert.alert("ERRO", mensagem || "Nao foi possivel alterar a moto.");
    } finally {
      setSalvando(false);
    }
  }

  if (carregando) {
    return (
      <View style={styles.loading}>
        <Text style={styles.loadingText}>Puxando dados do banco...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.card}>
        <View style={styles.hero}>
          <Text style={styles.eyebrow}>GARAGEM RACING</Text>
          <Text style={styles.brand}>MOTOGP</Text>
          <Text style={styles.title}>Editar Moto</Text>
          <View style={styles.badge}>
            <Text style={styles.badgeText}>ED</Text>
          </View>
        </View>

        <Text style={styles.subtitle}>Dados puxados do banco</Text>
        <Text style={styles.idText}>ID: {carroId || "---"}</Text>

        <Text style={styles.label}>Ano *</Text>
        <TextInput style={styles.input} placeholder="Ano" placeholderTextColor="#98a2b3" keyboardType="numeric" value={ano} onChangeText={setAno} />

        <Text style={styles.label}>Cor *</Text>
        <TextInput style={styles.input} placeholder="Cor" placeholderTextColor="#98a2b3" value={cor} onChangeText={setCor} />

        <Text style={styles.label}>Dono *</Text>
        <TextInput style={styles.input} placeholder="Dono" placeholderTextColor="#98a2b3" value={dono} onChangeText={setDono} />

        <Text style={styles.label}>Fabricante *</Text>
        <TextInput style={styles.input} placeholder="Fabricante" placeholderTextColor="#98a2b3" value={fabricante} onChangeText={setFabricante} />

        <Text style={styles.label}>Modelo *</Text>
        <TextInput style={styles.input} placeholder="Modelo" placeholderTextColor="#98a2b3" value={modelo} onChangeText={setModelo} />

        <Text style={styles.label}>Placa *</Text>
        <TextInput style={styles.input} placeholder="Placa" placeholderTextColor="#98a2b3" autoCapitalize="characters" value={placa} onChangeText={setPlaca} />

        <Text style={styles.label}>Potencia *</Text>
        <TextInput style={styles.input} placeholder="Potencia" placeholderTextColor="#98a2b3" keyboardType="numeric" value={potencia} onChangeText={setPotencia} />

        <Text style={styles.label}>Sobre *</Text>
        <TextInput style={[styles.input, styles.textArea]} placeholder="Sobre" placeholderTextColor="#98a2b3" multiline value={sobre} onChangeText={setSobre} />

        <Text style={styles.label}>Tipo de gasolina *</Text>
        <TextInput style={styles.input} placeholder="Tipo de gasolina" placeholderTextColor="#98a2b3" value={tipoGasolina} onChangeText={setTipoGasolina} />

        <Text style={styles.label}>Valor *</Text>
        <TextInput style={styles.input} placeholder="Valor" placeholderTextColor="#98a2b3" keyboardType="numeric" value={valor} onChangeText={setValor} />

        <TouchableOpacity style={[styles.button, salvando && styles.buttonDisabled]} onPress={Enviar} disabled={salvando}>
          <Text style={styles.buttonText}>{salvando ? "SALVANDO..." : "SALVAR ALTERACAO"}</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.secondaryButton} onPress={() => navigation.navigate("Home")}>
          <Text style={styles.secondaryButtonText}>Cancelar</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  loading: {
    flex: 1,
    backgroundColor: "#0d0e16",
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
  },
  loadingText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "800",
  },
  container: {
    flex: 1,
    backgroundColor: "#0d0e16",
  },
  content: {
    padding: 20,
    paddingBottom: 34,
  },
  card: {
    backgroundColor: "#141520",
    padding: 24,
    borderRadius: 28,
    borderWidth: 1,
    borderColor: "#2a1b28",
    elevation: 12,
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
    marginBottom: 14,
  },
  title: {
    fontSize: 23,
    fontWeight: "800",
    color: "#ffffff",
    textAlign: "center",
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
  },
  badgeText: {
    color: "#ff4051",
    fontSize: 22,
    fontWeight: "900",
  },
  subtitle: {
    color: "#b8bac7",
    fontSize: 14,
    textAlign: "center",
    marginBottom: 8,
  },
  idText: {
    color: "#ff5362",
    fontSize: 13,
    fontWeight: "900",
    textAlign: "center",
    marginBottom: 22,
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
  textArea: {
    minHeight: 96,
    textAlignVertical: "top",
  },
  button: {
    backgroundColor: "#f23845",
    padding: 16,
    borderRadius: 16,
    alignItems: "center",
    marginTop: 4,
  },
  buttonDisabled: {
    opacity: 0.65,
  },
  buttonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "800",
  },
  secondaryButton: {
    padding: 14,
    borderRadius: 16,
    alignItems: "center",
    marginTop: 10,
    borderWidth: 1,
    borderColor: "#34343d",
    backgroundColor: "#1c1d29",
  },
  secondaryButtonText: {
    color: "#ffffff",
    fontSize: 14,
    fontWeight: "800",
  },
});
