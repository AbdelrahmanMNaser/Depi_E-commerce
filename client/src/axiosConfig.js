import axios from "axios";

const Axios = axios.create({
  baseURL: "http://localhost:3000/api",
  timeout: 3000,
  headers: {
    "Content-Type": "application/json",
  },
  authorization: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
});

export default Axios;
