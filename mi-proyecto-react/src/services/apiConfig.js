import axios from 'axios'

// Aquí cambias la URL del servidor
const API_BASE_URL = 'http://178.156.0.167:3000'

// Crear instancia de axios preconfigurada
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
})

// Interceptor para agregar el token a cada solicitud
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => Promise.reject(error)
)

export default apiClient
