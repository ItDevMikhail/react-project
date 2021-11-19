
export interface RegisterModel {
    login: string;
    name: string;
    lastName: string;
    email: string;
    password: string;
    confirmPassword: string;
}

let pass = '';

export const validateModel = (key: keyof RegisterModel, value: string): string | null => {
    if (key === 'login') {
        return !Boolean(value)
            ? `введите логин`
            : value.search(/^[a-zA-Z]+([-_]?[a-z0-9]+){1,2}$/)
                ? 'некорректный логин'
                : null
    }
    if (key === 'name') {
        return !Boolean(value)
            ? `введите имя`
            : value.length < 3
                ? 'некорректное имя'
                : null
    }
    if (key === 'lastName') {
        return !Boolean(value)
            ? `введите фамилию`
            : value.length < 3
                ? 'некорректная фимилия'
                : null
    }
    if (key === 'email') {
        return !Boolean(value)
            ? `введите email`
            : value.search(/.+@.+\..+/)
                ? 'некорректный email'
                : null
    }
    if (key === 'password') {
        if (value) {
            pass = value;
        }
        return !Boolean(value)
            ? `введите пароль`
            : value.search(/^((?=\S*?[A-Z])(?=\S*?[a-z])(?=\S*?[0-9]).{7,})\S$/)
                ? 'некорректный пароль'
                : null
    }
    if (key === 'confirmPassword') {
        return !Boolean(value)
            ? `подвердите пароль`
            : value === pass
                ? null
                : 'пароли не совпадают'
    }
    return Boolean(value) ? null : 'Заполните поле';
};
