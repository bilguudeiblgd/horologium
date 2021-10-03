import axios from "axios";

const API_URL = "https://horologium.herokuapp.com";

class AuthService {
    login(email, password) {
        return axios
            .post(`${API_URL}/api/login`, {
                email,
                password
            })
            .then(response => {
                if (response.data.accessToken) {
                    localStorage.setItem("user", JSON.stringify(response.data));
                    console.log(localStorage.getItem("user"));
                }
                return response.data;
            });
    }

    logout() {
        localStorage.removeItem("user");
    }

    register(username, email, password) {
        return axios.post(`${API_URL}/api/signup`, {
            username,
            email,
            password
        })
        
    }

    getCurrentUser() {
        return JSON.parse(localStorage.getItem('user'));;
    }
}

export default new AuthService();