import axios from "axios";

const instance = axios.create({
  baseURL: "https://iati-online-service.azurewebsites.net",
});

export default instance;
