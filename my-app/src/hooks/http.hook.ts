import { useState, useCallback } from "react";
import { useDispatch } from 'react-redux';
import { errorMessage } from './../redux/actions/actionsFetch';

export const useHttp = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const dispatch = useDispatch();

    const request = useCallback(async (url: string, method: string = 'GET', body = null, headers = { 'Content-Type': 'application/json', credentials: 'include' }) => {
        setLoading(true);
        try {
            const response = await fetch(url, { method, body, headers });
            if (response.status === 500) {
                if (window.location.pathname !== '/error') {
                    window.location.pathname = '/error';
                }
            }
            const data = await response.json();
            if (!response.ok) {
                if (data.keyValue) {
                    if (data.keyValue.login) {
                        throw new Error(` login ${data.keyValue.login} уже существует`);
                    }
                    if (data.keyValue.email) {
                        throw new Error(`email ${data.keyValue.email} уже существует`);
                    }
                }
                throw new Error(data.message || 'Ошибка, запрос не был выполнен');
            }
            setLoading(false);
            return data;

        } catch (e: any) {
            setLoading(false);
            dispatch(errorMessage(e.message));
            setTimeout(() => dispatch(errorMessage('')), 2000);
        }
    }, []);

    return { loading, request };
}