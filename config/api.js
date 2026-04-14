import { NativeModules, Platform } from "react-native";

const API_PORT = "9000";

// Se o app estiver no celular fisico e ainda der Network Error,
// coloque aqui o IP do seu computador na mesma rede, por exemplo: "192.168.0.15"
const API_HOST_MANUAL = "";

function getHostFromBundle() {
  const scriptURL = NativeModules.SourceCode?.scriptURL;

  if (!scriptURL) {
    return "";
  }

  const match = scriptURL.match(/^[a-z]+:\/\/([^/:]+)/i);
  return match ? match[1] : "";
}

function getDefaultHost() {
  if (API_HOST_MANUAL) {
    return API_HOST_MANUAL;
  }

  const bundleHost = getHostFromBundle();

  if (bundleHost) {
    return bundleHost;
  }

  if (Platform.OS === "android") {
    return "10.0.2.2";
  }

  return "localhost";
}

export const API_HOST = getDefaultHost();

export const API_URLS = {
  cadastro: `http://${API_HOST}:${API_PORT}/api/cadastro_usuario`,
  login: `http://${API_HOST}:${API_PORT}/api/login_novo`,
};

export function extractToken(data) {
  if (!data) {
    return "";
  }

  const token =
    data.token ||
    data.access_token ||
    data.accessToken ||
    data?.data?.token ||
    data?.data?.access_token ||
    data?.usuario?.token;

  return typeof token === "string" ? token.trim() : "";
}

export function getApiErrorMessage(error, fallbackMessage) {
  if (error?.message === "Network Error") {
    return `Nao foi possivel conectar na API (${API_HOST}:${API_PORT}). Se estiver no celular fisico, coloque o IP do seu computador em config/api.js.`;
  }

  return (
    error?.response?.data?.msg ||
    error?.response?.data?.message ||
    (error?.response?.data?.errors ? JSON.stringify(error.response.data.errors) : fallbackMessage)
  );
}
