import { useState, useCallback } from "react";


export const useHttpAuth = () => {
    const [errorMess, setError] = useState('');

    const requestAuth = useCallback(async (url: string = '/api/users/auth', method: string = 'GET', body = null, headers = { credentials: true }) => {
        try {
            const response = await fetch(url, { method, body, headers });
            console.log(response);
            if (response.status === 500) {
                setError('Сервер не отвечает, попробуйте повторить позже.')
                if (window.location.pathname !== '/error') {
                    window.location.pathname = '/error';
                }
            }
            const data = await response.json();
            if (!response.ok) {
                throw new Error(data.message || 'Ошибка, запрос не был выполнен');

            }
            return data;

        } catch (error) {
            // setError(e.message);
            console.log(error);
        }
    }, []);

    const clearError = () => setError('');

    return { requestAuth, errorMess, clearError };
}