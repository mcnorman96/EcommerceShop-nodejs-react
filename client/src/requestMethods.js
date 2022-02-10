import axios from "axios";

const BASE_URL = "http://localhost:5000/api/";
/* const TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxZmMxZjc4ODkyMWM2MGM1YjY4NmY4MSIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY0NDEzOTY5NywiZXhwIjoxNjQ0Mzk4ODk3fQ.mhXzO9sBfFTkvzO_B2nwDARwj4t3awe3MG4Rdpccjs4"; */
const user = JSON.parse(localStorage.getItem("persist:root"))?.user;
const currentUser = user && JSON.parse(user).currentUser;
const TOKEN = currentUser?.accessToken;


export const publicRequest = axios.create({
  baseURL: BASE_URL,
});

export const userRequest = axios.create({
  baseURL: BASE_URL,
  header: {token:`Bearer ${TOKEN}`},
});

