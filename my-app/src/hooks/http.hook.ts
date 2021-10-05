import { useState, useCallback } from "react";

export const useHttp = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState(null);

    const request = useCallback(async(url: string, method: string = 'GET', body = null, headers = {'Content-Type': 'application/json', credentials: 'include'}) =>{
        setLoading(true);
        try {
            const response = await fetch(url, {method, body, headers});
            const data = await response.json();
            if(!response.ok) {
                throw new Error(data.message || 'Ошибка, запрос не был выполнен');
            }
            setLoading(false);
            return data;

        } catch (e : any) {
            setLoading (false);
            setError(e.message);
        }
    }, []);

    const clearError = () => setError(null);

    return { loading, request, error, clearError};
}