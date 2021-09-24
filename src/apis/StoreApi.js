import axios from "axios";

export const storeApi = axios.create({
  baseURL: "https://fakestoreapi.com",
});
