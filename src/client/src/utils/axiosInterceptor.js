/* eslint-disable no-console */
import axios from "axios";

let interceptorEnabled = false;

if (process.env.NODE_ENV !== "production") {
  interceptorEnabled = true;
}

const axiosInstance = axios.create({
  baseURL: "http://eyo-server.satishbonam.tech",
});

axiosInstance.interceptors.request.use((request) => {
  if (interceptorEnabled) {
    console.log(`Request: ${request.method} ${request.baseURL}${request.url}`);
  }
  return request;
});

axiosInstance.interceptors.response.use(
  (response) => {
    if (interceptorEnabled) {
      return response.data;
    }
  },
  (error) => console.log(error)
);

export default axiosInstance;
