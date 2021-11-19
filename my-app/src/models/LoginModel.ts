export interface LoginModel {
    login: string;
    password: string;
}

export const validateModel = (key: keyof LoginModel, value: string): string | null => {
    if (key === 'login') {
        return Boolean(value) ? null : `Введите логин`;
    }
    if (key === 'password') {
        return Boolean(value) ? null : `Введите пароль`;
    }
    return Boolean(value) ? null : 'Заполните поле';
};