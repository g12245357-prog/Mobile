import { useState, useEffect } from "react";
import axios from "axios";
import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text, FlatList, Pressable, Modal, Alert, TouchableOpacity, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Lista() {

  const [dados, setDados] = useState([]);
  const [modal, setModal] = useState(false);
  const [recebeDado, setRecebeDado] = useState(null);

  useEffect(() => {

    async function Buscar() {

      try {

        const token = await AsyncStorage.getItem("token");
        console.log("Token armazenado:", token);

        const response = await axios.get("http://10.0.2.2:8000/api/todos_carros", {
          token:token
        });

        console.log(response.data.carro);
        setDados(response.data.carro)


      } catch (error) {

        console.log("ERRO", error.response?.data || error.message);
        Alert.alert("ERRO", "Nao foi possivel buscar os dados.");

      }

    }

    Buscar();

  }, []);


  // function abrirAlerta(item) {
  //   Alert.alert(
  //     "Item selecionado",
  //     `Nome: ${item.nome || item.modelo || item.marca || "---"}\nE-mail: ${item.email || "---"}`,
  //     [
  //       {
  //         text: "Cancelar",
  //         style: "cancel",
  //       },
  //       {
  //         text: "Ver detalhes",
  //         onPress: () => {
  //           setRecebeDado(item);
  //           setModal(true);
  //         },
  //       },
  //     ]
  //   );
  // }

  const renderItem = ({ item }) => (
    <Pressable onPress={() => {setRecebeDado(item); setModal(!modal);}} style={({ pressed }) => [styles.cardButton, pressed && styles.cardPressed]}>
      <View style={styles.card}>
        <View style={styles.cardBadge}>
          <Text style={styles.cardBadgeText}>{(item.nome || item.modelo || item.marca || "C").charAt(0).toUpperCase()}</Text>
        </View>

        <View style={styles.cardContent}>
          <View style={styles.cardTopline} />
          <Text style={styles.cardTitle}>{item.nome || item.modelo || item.marca || "Sem nome"}</Text>
          <Text style={styles.cardText}>{item.email || item.placa || item.cor || "Sem detalhe"}</Text>
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
        keyExtractor={(item) =>(item.id)}
        contentContainerStyle={styles.list}
        ListHeaderComponent={
          <View style={styles.hero}>
            <Text style={styles.brand}>MOTOGP</Text>
            <Text style={styles.heroTitle}>Garagem</Text>
            <Text style={styles.heroText}>{dados.length} carros cadastrados</Text>
            <View style={styles.heroBadge}>
              <Text style={styles.heroBadgeText}>BOX</Text>
            </View>
          </View>
        }
      />
      <Modal
        visible={modal}
        transparent={false}
        animationType="slide"
        onRequestClose={() => setModal(!modal)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalBox}>
            <View style={styles.modalBadge}>
              <Text style={styles.modalBadgeText}>{(recebeDado?.nome || recebeDado?.modelo || recebeDado?.marca || "C").charAt(0).toUpperCase()}</Text>
            </View>

            <Text style={styles.modalTitle}>{recebeDado?.nome || recebeDado?.modelo || recebeDado?.marca}</Text>
            <Text style={styles.modalText}>{recebeDado?.email || recebeDado?.placa || recebeDado?.cor}</Text>

            <View style={styles.modalGrid}>
              <View style={styles.modalInfo}>
                <Text style={styles.modalInfoLabel}>Ano</Text>
                <Text style={styles.modalInfoValue}>{recebeDado?.ano || "---"}</Text>
              </View>
              <View style={styles.modalInfo}>
                <Text style={styles.modalInfoLabel}>Cor</Text>
                <Text style={styles.modalInfoValue}>{recebeDado?.cor || "---"}</Text>
              </View>
              <View style={styles.modalInfo}>
                <Text style={styles.modalInfoLabel}>Valor</Text>
                <Text style={styles.modalInfoValue}>{recebeDado?.valor || "---"}</Text>
              </View>
            </View>

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
    shadowColor: "#f23845",
    shadowOffset: { width: 0, height: 18 },
    shadowOpacity: 0.24,
    shadowRadius: 24,
    elevation: 10,
  },
  brand: {
    color: "#ffffff",
    fontSize: 36,
    fontWeight: "900",
    letterSpacing: 0,
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
    shadowColor: "#ff4051",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.45,
    shadowRadius: 14,
    elevation: 8,
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
    overflow: "hidden",
    minHeight: 96,
    backgroundColor: "#141520",
    borderRadius: 18,
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#2a1b28",
    elevation: 5,
    shadowColor: "#f23845",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.14,
    shadowRadius: 16,
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
    elevation: 10,
    shadowColor: "#f23845",
    shadowOffset: { width: 0, height: 18 },
    shadowOpacity: 0.22,
    shadowRadius: 24,
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
  closeButton: {
    width: "100%",
    height: 46,
    backgroundColor: "#f23845",
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  closeButtonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "700",
  },
});
