import axios from "axios";

const axiosConfig = axios.create({
    baseURL: "https://pokeapi.co/api/v2",
    headers: {
        "Content-Type": "application/json",
    },
});

// Interceptor de peticiones - para logging y configuración adicional
axiosConfig.interceptors.request.use(
    (config) => {
        // Puedes agregar tokens de autenticación aquí si es necesario
        // config.headers.Authorization = `Bearer ${token}`;
        console.log(`[API Request] ${config.method?.toUpperCase()} ${config.url}`);
        return config;
    },
    (error) => {
        console.error("[API Request Error]", error);
        return Promise.reject(error);
    }
);

// Interceptor de respuestas - para manejo de errores centralizado
axiosConfig.interceptors.response.use(
    (response) => {
        console.log(`[API Response] ${response.config.url} - Status: ${response.status}`);
        return response;
    },
    (error) => {
        if (error.response) {
            // El servidor respondió con un código de estado fuera del rango 2xx
            console.error(`[API Error] ${error.response.status} - ${error.response.statusText}`);
            console.error("Error data:", error.response.data);
        } else if (error.request) {
            // La petición fue hecha pero no se recibió respuesta
            console.error("[API Error] No response received:", error.request);
        } else {
            // Algo sucedió al configurar la petición
            console.error("[API Error] Request setup error:", error.message);
        }
        return Promise.reject(error);
    }
);

export default axiosConfig;