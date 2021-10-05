import { useState, useCallback } from "react";

export const useHttpAuth = () => {
    const [errorMess, setError] = useState(null);

    const requestAuth = useCallback(async (url: string = '/api/users/auth', method: string = 'GET', body = null, headers = { credentials: true }) => {
        try {
            const response = await fetch(url, { method, body, headers });
            const data = await response.json()
            if (!response.ok) {
                throw new Error(data.message || 'Ошибка, запрос не был выполнен');
            }
            return data;

        } catch (e: any) {
            setError(e.message);
        }
    }, []);

    const clearError = () => setError(null);

    return { requestAuth, errorMess, clearError };
}