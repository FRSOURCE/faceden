import axios from 'axios'

const apiClient = axios.create({
  baseURL: (import.meta.env.VITE_API_URL as string) || '/api-faceden'
  // withCredentials: false, // This is the default
  // headers: {
  //  Accept: 'application/json', 'Content-Type': 'application/json'
  // }
})

export default {
  getQuestions() {
    return apiClient.get<{id: number,content: string}[]>('/questions');
  },
  sendImage(image: FormData) {
    return apiClient.post<string>('/photo', image, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  },
  register(data: Record<string, unknown>) {
    return apiClient.post<{id: number, team: string}>('/register', data)
  }
}