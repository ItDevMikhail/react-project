import { useCallback, useState } from 'react';

export const useValidation = <T extends Record<string, any>>(validate: (name: keyof T, value: any) => string | null) => {
    const [errors, setErrors] = useState<Partial<Record<keyof T, string | null>>>({});
    // содержит пары ключ-значение (ключ - имя импута из модели, значение - ошибка)

    const validateField = useCallback((name: keyof T, value: any) => {
        const result = validate(name, value);
        // проверка валидации из модели возвращает либо null, либо строку с ошибкой
        setErrors((errors) =>
            result === errors[name] ? errors : { ...errors, [name]: result }
            // если такая ошибка есть, то оставляет её, иначе добавляет пару "имя поля" : "стройка с ошибкой" или удаляет ошибку
        );
    }, [validate, setErrors]);

    const isValid = useCallback((errors: Partial<Record<keyof T, string | null>>): boolean => {
        return !Object.values(errors).find((value: any) => Boolean(value));
        // если в массиве еррорс все валью фолсе(null) (нет ошибок, то возвращает тру)
    }, [])

    const validateModel = useCallback((model: T) => { //аргумент - данные из редюсера (ключ-значения)
        const validationResult: Partial<Record<keyof T, string | null>> = {};
        // содержит текст ошибки (имя инпута - ошибка или null)
        Object.keys(model).forEach((key: keyof T) => {
            validationResult[key] = validate(key, model[key]); // проверка валидации инпутов и занесения результата
        });
        setErrors(validationResult); // обновление объекта с ошибками
        return isValid(validationResult); // если ошибок нет, то вернет тру
    }, [validate, setErrors, isValid]);
    const getFieldError = useCallback((name: keyof T) => {
        return errors[name] || null;
    }, [errors]); // возвращает текст ошибки определенного инпута, если есть ошибка

    const reset = useCallback(() => {
        setErrors({});
    }, [setErrors]); // очищает стейт с ошибками

    return {
        reset,
        validate: validateModel,
        validateField,
        getFieldError,
    };
}
