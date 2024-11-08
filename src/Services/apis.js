// require("dotenv").config();

const BASE_URL = process.env.REACT_APP_BASE_URL

// Auth endpoints
export const endPoints = {
    SIGNUP_API: BASE_URL + "/auth/signup",
    LOGIN_API: BASE_URL + "/auth/login",
}