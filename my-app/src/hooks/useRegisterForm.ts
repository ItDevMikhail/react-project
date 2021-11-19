import React, { useCallback, useReducer } from 'react';
import { RegisterModel, validateModel } from '../models/RegisterModel'
import { useValidation } from './useValidation'

interface Action {
    type: string;
    payload: unknown;
}

const initialState: RegisterModel = {
    login: '',
    name: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
}

const typesAction = {
    change: 'CHANGE_FIELD',
    reset: 'RESET'
}

const reducer = (state: RegisterModel, action: Action): RegisterModel => {
    const { type, payload } = action;
    switch (type) {
        case typesAction.change: {
            const [key, value] = payload as [keyof RegisterModel, string];
            return { ...state, [key]: value }
        }
        case typesAction.reset: {
            return payload ? (payload as RegisterModel) : { ...initialState };
        }
        default: return state
    }
}

export const useRegisterForm = () => {
    const { validate, validateField, getFieldError, reset: resetValidation } = useValidation<RegisterModel>(validateModel);

    const [state, dispatch] = useReducer(reducer, initialState);

    const changeField = useCallback((fieldName: keyof RegisterModel, event: React.ChangeEvent<HTMLInputElement>) => {
        if (typeof event.target.value === 'string') {
            event.target.value = event.target.value.replace(/\s/g, ''); // удаляет пробелы
        }
        validateField(fieldName, event.target.value);
        dispatch({ type: typesAction.change, payload: [fieldName, event.target.value] } as Action)
    }, [dispatch, validateField]);

    const changeLogin = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        changeField('login', event)
    }, [changeField]);
    const changeName = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        changeField('name', event)
    }, [changeField]);
    const changeLastName = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        changeField('lastName', event)
    }, [changeField]);
    const changeEmail = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        changeField('email', event)
    }, [changeField]);
    const changePassword = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        changeField('password', event)
    }, [changeField]);
    const changeConfirmPassword = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        changeField('confirmPassword', event)
    }, [changeField]);

    const setModel = useCallback((model?: RegisterModel) => {
        resetValidation();
        dispatch({ type: typesAction.reset, payload: model } as Action)
    }, [resetValidation])

    const cleanUp = useCallback(() => {
        setModel();
    }, [setModel]);
    return {
        state,
        changeField,
        changeLogin,
        changeName,
        changeLastName,
        changeEmail,
        changePassword,
        changeConfirmPassword,
        cleanUp,
        validate,
        setModel,
        getFieldError
    }
}