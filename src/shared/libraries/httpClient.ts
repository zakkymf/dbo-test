import axios from "axios";

const httpClient = axios.create({
  baseURL: "",
  headers: {
    "Content-Type": "application/json",
  },
  data: {},
  timeout: 10000,
});

httpClient.interceptors.response.use(
  function (response) {
    return response;
  },

  async function (error) {
    if (error.code === "ECONNABORTED") {
      return Promise.reject("Request timeout");
    }

    return Promise.reject(error);
  }
);

httpClient.interceptors.request.use(
  async (config) => {
    const newConfig = config;
    newConfig.params = newConfig.params || {};
    return newConfig;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export { httpClient };
