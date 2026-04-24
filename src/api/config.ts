/** Backend base URL, read from Vite env variable */
export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:8080'

export function getImageUrl(relativeImageUrl: string): string {
    return `${API_BASE_URL}${relativeImageUrl}`
}