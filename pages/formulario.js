import { useState } from "react";
import axios from "axios";
import { Alert, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";

export default function Formulario({ navigation }) {
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
  //const [img, setImg] = useState("");

  function limparCampos() {
    setAno("");
    setCor("");
    setDono("");
    setFabricante("");
    setModelo("");
    setPlaca("");
    setPotencia("");
    setSobre("");
    setTipoGasolina("");
    setValor("");
    //setImg("");
  }

  const values = {
ano:ano,
cor:cor,
dono:dono,
fabricante:fabricante,
modelo:modelo,
placa:placa,
potencia:potencia,
sobre:sobre,
tipo_gasolina:tipoGasolina,
valor:valor,
//img:img


  }

  function Enviar() {
    if (ano === "" || cor === "" || dono === "" || fabricante === "" || modelo === "" || placa === "" || potencia === "" || sobre === "" || tipoGasolina === "" || valor === "") {
      Alert.alert("ERRO", "Favor preencher todos os campos principais.");
      return;
    }else{

        const response = axios.post("http://10.0.2.2:8000/api/salva_carro", values);
        console.log(response.data);
        Alert.alert("Sucesso!", "Carro cadastrado com sucesso!");
        navigation.navigate("Home");
    }

    Alert.alert(
      "Informacoes do formulario",
      `Ano: ${ano}\nCor: ${cor}\nDono: ${dono}\nFabricante: ${fabricante}\nModelo: ${modelo}\nPlaca: ${placa}\nPotencia: ${potencia}\nSobre: ${sobre}\nTipo gasolina: ${tipoGasolina}\nValor: ${valor}`
    );
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.card}>
        <View style={styles.glow} />
        <View style={styles.hero}>
          <Text style={styles.eyebrow}>GARAGEM RACING</Text>
          <Text style={styles.brand}>MOTOGP</Text>
          <Text style={styles.title}>Cadastro de Moto</Text>
          <View style={styles.badge}>
            <Text style={styles.badgeText}>HP</Text>
          </View>
        </View>

        <Text style={styles.subtitle}>Preencha as informacoes do Moto</Text>
        <View style={styles.sectionPill}>
          <Text style={styles.sectionPillText}>Dados principais</Text>
        </View>

        <Text style={styles.label}>Ano *</Text>

        <TextInput
          style={styles.input}
          placeholder="Ano"
          placeholderTextColor="#98a2b3"
          keyboardType="numeric"
          value={ano}
          onChangeText={setAno}
        />

        <Text style={styles.label}>Cor *</Text>

        <TextInput
          style={styles.input}
          placeholder="Cor"
          placeholderTextColor="#98a2b3"
          value={cor}
          onChangeText={setCor}
        />

        <Text style={styles.label}>Dono *</Text>

        <TextInput
          style={styles.input}
          placeholder="Dono"
          placeholderTextColor="#98a2b3"
          value={dono}
          onChangeText={setDono}
        />

        <Text style={styles.label}>Fabricante *</Text>

        <TextInput
          style={styles.input}
          placeholder="Fabricante"
          placeholderTextColor="#98a2b3"
          value={fabricante}
          onChangeText={setFabricante}
        />

        {/* <TextInput
          style={styles.input}
          placeholder="URL da imagem"
          placeholderTextColor="#98a2b3"
          autoCapitalize="none"
          value={img}
          onChangeText={setImg}
        /> */}

        <Text style={styles.label}>Modelo *</Text>

        <TextInput
          style={styles.input}
          placeholder="Modelo"
          placeholderTextColor="#98a2b3"
          value={modelo}
          onChangeText={setModelo}
        />

        <Text style={styles.label}>Placa *</Text>

        <TextInput
          style={styles.input}
          placeholder="Placa"
          placeholderTextColor="#98a2b3"
          autoCapitalize="characters"
          value={placa}
          onChangeText={setPlaca}
        />

        <Text style={styles.label}>Potencia *</Text>

        <TextInput
          style={styles.input}
          placeholder="Potencia"
          placeholderTextColor="#98a2b3"
          keyboardType="numeric"
          value={potencia}
          onChangeText={setPotencia}
        />

        <Text style={styles.label}>Sobre *</Text>

        <TextInput
          style={styles.input}
          placeholder="Sobre"
          placeholderTextColor="#98a2b3"
          value={sobre}
          onChangeText={setSobre}
        />

        <Text style={styles.label}>Tipo de gasolina *</Text>

        <TextInput
          style={styles.input}
          placeholder="Tipo de gasolina"
          placeholderTextColor="#98a2b3"
          value={tipoGasolina}
          onChangeText={setTipoGasolina}
        />

        <Text style={styles.label}>Valor *</Text>

        <TextInput
          style={styles.input}
          placeholder="Valor"
          placeholderTextColor="#98a2b3"
          keyboardType="numeric"
          value={valor}
          onChangeText={setValor}
        />

        <View style={styles.preview}>
          <Text style={styles.previewTitle}>Resumo</Text>

          <View style={styles.previewRow}>
            <Text style={styles.previewLabel}>Moto</Text>
            <Text style={styles.previewValue}>{fabricante || "---"} {modelo || ""}</Text>
          </View>

          <View style={styles.previewRow}>
            <Text style={styles.previewLabel}>Placa</Text>
            <Text style={styles.previewValue}>{placa || "---"}</Text>
          </View>

          <View style={styles.previewRow}>
            <Text style={styles.previewLabel}>Dono</Text>
            <Text style={styles.previewValue}>{dono || "---"}</Text>
          </View>

          <View style={styles.previewRow}>
            <Text style={styles.previewLabel}>Valor</Text>
            <Text style={styles.previewValue}>{valor || "---"}</Text>
          </View>
        </View>

        <TouchableOpacity style={styles.button} onPress={Enviar}>
          <Text style={styles.buttonText}>ENVIAR</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.secondaryButton} onPress={limparCampos}>
          <Text style={styles.secondaryButtonText}>Limpar campos</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate("Home")}>
          <Text style={styles.link}>Ir para Home</Text>
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
    borderWidth: 1,
    borderColor: "#2a1b28",
    elevation: 12,
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
    height: 420,
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
  subtitle: {
    color: "#b8bac7",
    fontSize: 14,
    textAlign: "center",
    marginTop: 2,
    marginBottom: 24,
  },
  sectionPill: {
    alignSelf: "center",
    backgroundColor: "#1c1d29",
    borderWidth: 1,
    borderColor: "#34343d",
    borderRadius: 999,
    paddingVertical: 8,
    paddingHorizontal: 18,
    marginBottom: 22,
  },
  sectionPillText: {
    color: "#ff5362",
    fontSize: 13,
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
  preview: {
    backgroundColor: "#1c1d29",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#34343d",
    padding: 16,
    marginTop: 4,
    marginBottom: 18,
  },
  previewTitle: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "800",
    marginBottom: 12,
  },
  previewRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 12,
    marginBottom: 10,
  },
  previewLabel: {
    color: "#f1f2f7",
    fontSize: 14,
    fontWeight: "700",
  },
  previewValue: {
    flex: 1,
    color: "#b8bac7",
    fontSize: 14,
    textAlign: "right",
  },
  button: {
    backgroundColor: "#f23845",
    padding: 16,
    borderRadius: 16,
    alignItems: "center",
    shadowColor: "#f23845",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.35,
    shadowRadius: 14,
    elevation: 6,
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
  link: {
    textAlign: "center",
    marginTop: 20,
    color: "#ff5362",
    fontSize: 14,
    fontWeight: "800",
  },
});
