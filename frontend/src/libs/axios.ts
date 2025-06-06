import axios, { type AxiosInstance } from "axios";

export const axiosIns:AxiosInstance = axios.create({
  baseURL: "http://localhost:8080/api/v1",
  withCredentials: true, //Allow to send cookies in each req
});
