import axios from "axios";

export const Axios = axios.create({
    baseURL: process.env.BASE_URL,
}) 