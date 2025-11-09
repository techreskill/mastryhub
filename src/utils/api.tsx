import { projectId, publicAnonKey } from './supabase/info'

const API_BASE = `https://${projectId}.supabase.co/functions/v1/make-server-66e6c95d`

export async function apiCall(endpoint: string, options: RequestInit = {}) {
  const token = localStorage.getItem('access_token')
  
  const headers: HeadersInit = {
    ...options.headers,
  }
  
  if (token) {
    headers['Authorization'] = `Bearer ${token}`
  } else {
    headers['Authorization'] = `Bearer ${publicAnonKey}`
  }
  
  if (!(options.body instanceof FormData)) {
    headers['Content-Type'] = 'application/json'
  }
  
  const response = await fetch(`${API_BASE}${endpoint}`, {
    ...options,
    headers,
  })
  
  const data = await response.json()
  
  if (!response.ok) {
    console.error(`API Error (${endpoint}):`, data)
    throw new Error(data.error || 'API request failed')
  }
  
  return data
}
