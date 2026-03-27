import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

const api = axios.create({
  baseURL: API_URL,
});

api.interceptors.request.use((config) => {
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

export interface About {
  id: number;
  name: string;
  title: string;
  description: string;
  photoUrl: string | null;
  stats: { value: string; label: string }[] | null;
}

export interface Project {
  id: number;
  title: string;
  shortDescription: string;
  longDescription: string;
  imageUrl: string | null;
  techStack: string[];
  githubUrl: string | null;
  demoUrl: string | null;
}

export interface Skill {
  id: number;
  name: string;
  level: number;
}

export interface Video {
  id: number;
  title: string;
  description: string | null;
  videoUrl: string;
}

export interface Message {
  id: number;
  name: string;
  email: string;
  message: string;
  createdAt: string;
}

export interface Settings {
  id: number;
  primaryColor: string;
  secondaryColor: string;
  themeMode: string;
}

export const getAbout = () => api.get<About>('/about').then((r) => r.data);
export const updateAbout = (data: Partial<About>) => api.put<About>('/about', data).then((r) => r.data);

export const getProjects = () => api.get<Project[]>('/projects').then((r) => r.data);
export const getProject = (id: number) => api.get<Project>(`/projects/${id}`).then((r) => r.data);
export const createProject = (data: Partial<Project>) => api.post<Project>('/projects', data).then((r) => r.data);
export const updateProject = (id: number, data: Partial<Project>) => api.put<Project>(`/projects/${id}`, data).then((r) => r.data);
export const deleteProject = (id: number) => api.delete(`/projects/${id}`);

export const getSkills = () => api.get<Skill[]>('/skills').then((r) => r.data);
export const createSkill = (data: Partial<Skill>) => api.post<Skill>('/skills', data).then((r) => r.data);
export const updateSkill = (id: number, data: Partial<Skill>) => api.put<Skill>(`/skills/${id}`, data).then((r) => r.data);
export const deleteSkill = (id: number) => api.delete(`/skills/${id}`);

export const getVideos = () => api.get<Video[]>('/videos').then((r) => r.data);
export const createVideo = (data: Partial<Video>) => api.post<Video>('/videos', data).then((r) => r.data);
export const updateVideo = (id: number, data: Partial<Video>) => api.put<Video>(`/videos/${id}`, data).then((r) => r.data);
export const deleteVideo = (id: number) => api.delete(`/videos/${id}`);

export const getMessages = () => api.get<Message[]>('/messages').then((r) => r.data);
export const sendMessage = (data: { name: string; email: string; message: string }) => api.post<Message>('/messages', data).then((r) => r.data);
export const deleteMessage = (id: number) => api.delete(`/messages/${id}`);

export const getSettings = () => api.get<Settings>('/settings').then((r) => r.data);
export const updateSettings = (data: Partial<Settings>) => api.put<Settings>('/settings', data).then((r) => r.data);

export const login = (email: string, password: string) => api.post<{ access_token: string }>('/auth/login', { email, password }).then((r) => r.data);

export const uploadFile = (file: File) => {
  const formData = new FormData();
  formData.append('file', file);
  return api.post<{ url: string }>('/uploads', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  }).then((r) => r.data);
};

export default api;
