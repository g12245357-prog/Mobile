import { useCallback, useState } from "react";
import axios from "axios";
import { Alert, FlatList, Modal, Pressable, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";

const API = "http://10.0.2.2:8000/api";

function pegarId(carro) {
  return carro.id || carro.id_carro || carro.carro_id || carro.idCarro || carro.codigo || "";
}

function pegarListaCarros(data) {
  return data.carro || data.carros || data.data || [];
}

export default function Home({ navigation }) {
  const [dados, setDados] = useState([]);
  const [modal, setModal] = useState(false);
  const [recebeDado, setRecebeDado] = useState(null);

  const Buscar = useCallback(async () => {
    try {
      const token = await AsyncStorage.getItem("token");

      const response = await axios.get(`${API}/todos_carros`, {
        headers: token ? { Authorization: `Bearer ${token}`, token: token } : {},
      });

      const lista = pegarListaCarros(response.data);
      setDados(Array.isArray(lista) ? lista : []);
    } catch (error) {
      console.log("ERRO BUSCAR MOTOS:", error.response?.data || error.message);
      Alert.alert("ERRO", "Nao foi possivel buscar os dados.");
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      Buscar();
    }, [Buscar])
  );

  function abrirModal(item) {
    setRecebeDado(item);
    setModal(true);
  }

  function editarCarro() {
    const id = pegarId(recebeDado);

    if (!id) {
      Alert.alert("ERRO", "Nao foi possivel identificar a moto para editar.");
      return;
    }

    setModal(false);
    navigation.navigate("EditarMoto", { id: id, item: recebeDado });
  }

  async function deletarCarro() {
    const id = pegarId(recebeDado);

    if (!id) {
      Alert.alert("ERRO", "Nao foi possivel identificar a moto para deletar.");
      return;
    }

    try {
      const token = await AsyncStorage.getItem("token");

      if (!token) {
        Alert.alert("ERRO", "Token nao encontrado. Faca login novamente.");
        navigation.replace("Login");
        return;
      }

      const response = await axios.post(`${API}/deletar_carro`, {
        id: id,
        id_carro: id,
        carro_id: id,
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
          token: token,
        },
      });

      console.log("DELETAR Moto:", response.data);
      Alert.alert("SUCESSO", "Moto deletada com sucesso!");
      setModal(false);
      Buscar();
    } catch (error) {
      console.log("ERRO DELETAR Moto:", error.response?.data || error.message);
      Alert.alert("ERRO", "Nao foi possivel deletar a moto.");
    }
  }

  const renderItem = ({ item }) => (
    <Pressable onPress={() => abrirModal(item)} style={({ pressed }) => [styles.cardButton, pressed && styles.cardPressed]}>
      <View style={styles.card}>
        <View style={styles.cardBadge}>
          <Text style={styles.cardBadgeText}>{(item.modelo || item.nome || item.fabricante || "M").charAt(0).toUpperCase()}</Text>
        </View>

        <View style={styles.cardContent}>
          <View style={styles.cardTopline} />
          <Text style={styles.cardTitle}>{item.modelo || item.nome || item.fabricante || "Sem modelo"}</Text>
          <Text style={styles.cardText}>{item.placa || item.cor || "Sem detalhe"}</Text>
          <View style={styles.metaRow}>
            <Text style={styles.metaPill}>{item.ano || "Ano"}</Text>
            <Text style={styles.metaPill}>{item.valor || "Valor"}</Text>
          </View>
        </View>
      </View>
    </Pressable>
  );

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={dados}
        renderItem={renderItem}
        keyExtractor={(item, index) => String(pegarId(item) || index)}
        contentContainerStyle={styles.list}
        ListHeaderComponent={
          <View style={styles.hero}>
            <Text style={styles.brand}>MOTOGP</Text>
            <Text style={styles.heroTitle}>Garagem</Text>
            <Text style={styles.heroText}>{dados.length} motos cadastradas</Text>
            <View style={styles.heroBadge}>
              <Text style={styles.heroBadgeText}>BOX</Text>
            </View>
          </View>
        }
      />

      <Modal visible={modal} transparent={false} animationType="slide" onRequestClose={() => setModal(false)}>
        <View style={styles.modalContainer}>
          <View style={styles.modalBox}>
            <View style={styles.modalBadge}>
              <Text style={styles.modalBadgeText}>{(recebeDado?.modelo || recebeDado?.nome || "M").charAt(0).toUpperCase()}</Text>
            </View>

            <Text style={styles.modalTitle}>{recebeDado?.modelo || recebeDado?.nome || recebeDado?.fabricante || "Moto"}</Text>
            <Text style={styles.modalText}>{recebeDado?.placa || recebeDado?.cor || "---"}</Text>

            <View style={styles.modalGrid}>
              <View style={styles.modalInfo}>
                <Text style={styles.modalInfoLabel}>ID</Text>
                <Text style={styles.modalInfoValue}>{pegarId(recebeDado) || "---"}</Text>
              </View>
              <View style={styles.modalInfo}>
                <Text style={styles.modalInfoLabel}>Ano</Text>
                <Text style={styles.modalInfoValue}>{recebeDado?.ano || "---"}</Text>
              </View>
              <View style={styles.modalInfo}>
                <Text style={styles.modalInfoLabel}>Valor</Text>
                <Text style={styles.modalInfoValue}>{recebeDado?.valor || "---"}</Text>
              </View>
            </View>

            <TouchableOpacity style={styles.editButton} onPress={editarCarro}>
              <Text style={styles.editButtonText}>Editar</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.deleteButton} onPress={deletarCarro}>
              <Text style={styles.deleteButtonText}>Deletar</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.closeButton} onPress={() => setModal(false)}>
              <Text style={styles.closeButtonText}>Fechar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0d0e16",
  },
  list: {
    padding: 16,
    gap: 12,
    paddingBottom: 24,
  },
  hero: {
    backgroundColor: "#d92335",
    borderRadius: 28,
    paddingTop: 30,
    paddingBottom: 34,
    paddingHorizontal: 22,
    marginBottom: 10,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ff4051",
  },
  brand: {
    color: "#ffffff",
    fontSize: 36,
    fontWeight: "900",
    marginBottom: 12,
  },
  heroTitle: {
    color: "#ffffff",
    fontSize: 23,
    fontWeight: "800",
  },
  heroText: {
    color: "#ffe1e5",
    fontSize: 14,
    fontWeight: "700",
    marginTop: 8,
  },
  heroBadge: {
    position: "absolute",
    right: 18,
    bottom: -30,
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: "#181827",
    borderWidth: 2,
    borderColor: "#ff4051",
    justifyContent: "center",
    alignItems: "center",
  },
  heroBadgeText: {
    color: "#ff4051",
    fontSize: 16,
    fontWeight: "900",
  },
  cardButton: {
    borderRadius: 18,
  },
  cardPressed: {
    opacity: 0.8,
    transform: [{ scale: 0.99 }],
  },
  card: {
    minHeight: 96,
    backgroundColor: "#141520",
    borderRadius: 18,
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#2a1b28",
  },
  cardBadge: {
    width: 50,
    height: 50,
    borderRadius: 16,
    backgroundColor: "#f23845",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 14,
  },
  cardBadgeText: {
    color: "#ffffff",
    fontSize: 22,
    fontWeight: "800",
  },
  cardContent: {
    flex: 1,
  },
  cardTopline: {
    width: 52,
    height: 4,
    borderRadius: 999,
    backgroundColor: "#f23845",
    marginBottom: 10,
  },
  cardTitle: {
    color: "#ffffff",
    fontSize: 17,
    fontWeight: "700",
    marginBottom: 5,
  },
  cardText: {
    color: "#b8bac7",
    fontSize: 14,
  },
  metaRow: {
    flexDirection: "row",
    gap: 8,
    marginTop: 12,
  },
  metaPill: {
    overflow: "hidden",
    color: "#ff5362",
    fontSize: 12,
    fontWeight: "900",
    backgroundColor: "#1c1d29",
    borderWidth: 1,
    borderColor: "#34343d",
    borderRadius: 999,
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: "#0d0e16",
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
  },
  modalBox: {
    width: "100%",
    backgroundColor: "#141520",
    borderRadius: 28,
    padding: 24,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#2a1b28",
  },
  modalBadge: {
    width: 68,
    height: 68,
    borderRadius: 22,
    backgroundColor: "#f23845",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
  },
  modalBadgeText: {
    color: "#ffffff",
    fontSize: 30,
    fontWeight: "800",
  },
  modalTitle: {
    color: "#ffffff",
    fontSize: 22,
    fontWeight: "800",
    textAlign: "center",
    marginBottom: 8,
  },
  modalText: {
    color: "#b8bac7",
    fontSize: 16,
    textAlign: "center",
    marginBottom: 22,
  },
  modalGrid: {
    width: "100%",
    flexDirection: "row",
    gap: 10,
    marginBottom: 22,
  },
  modalInfo: {
    flex: 1,
    backgroundColor: "#1c1d29",
    borderWidth: 1,
    borderColor: "#34343d",
    borderRadius: 16,
    padding: 12,
    alignItems: "center",
  },
  modalInfoLabel: {
    color: "#ff5362",
    fontSize: 12,
    fontWeight: "900",
    marginBottom: 6,
  },
  modalInfoValue: {
    color: "#ffffff",
    fontSize: 13,
    fontWeight: "800",
  },
  editButton: {
    width: "100%",
    height: 46,
    backgroundColor: "#f23845",
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  editButtonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "800",
  },
  deleteButton: {
    width: "100%",
    height: 46,
    backgroundColor: "#1c1d29",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#34343d",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },
  deleteButtonText: {
    color: "#ff5362",
    fontSize: 16,
    fontWeight: "800",
  },
  closeButton: {
    width: "100%",
    height: 46,
    backgroundColor: "#282828",
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },
  closeButtonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "700",
  },
});
