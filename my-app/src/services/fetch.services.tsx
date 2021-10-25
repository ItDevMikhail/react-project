export async function FetchApi(url: string, method: string = 'GET', body: string | null = null, headers = { 'Content-Type': 'application/json', credentials: 'include' }) {
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
        return data;
    } catch (e: any) {
        console.log(e, 'eerr');
        throw new Error(e.message || 'Ошибка, запрос не был выполнен');
    }
}

export async function CheckAuth(url: string = '/api/users/auth', method: string = 'GET', body = null, headers = { credentials: 'include' }) {
    try {
        const response = await fetch(url, { method, body, headers });
        if (response.status === 500) {
            if (window.location.pathname !== '/error') {
                window.location.pathname = '/error';
            }
            throw new Error('Сервер не отвечает, попробуйте повторить позже.')
        }
        const data = await response.json();
        if (!response.ok) {
            throw new Error(data.message || 'Ошибка, запрос не был выполнен');

        }
        return data;
    } catch (e: any) {
        throw new Error(e.message || 'Сервер не отвечает, попробуйте повторить позже.');
    }
};
