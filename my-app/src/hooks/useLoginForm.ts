import React, { useCallback, useReducer } from 'react';
import { LoginModel, validateModel } from '../models/LoginModel';
import { useValidation } from './useValidation'

interface Action {
    type: string;
    payload: unknown;
}

const initialState: LoginModel = {
    login: '',
    password: ''
}

const typesAction = {
    change: 'CHANGE_FIELD',
    reset: 'RESET'
}

const reducer = (state: LoginModel, action: Action): LoginModel => {
    const { type, payload } = action;
    switch (type) {
        case typesAction.change: {
            const [key, value] = payload as [keyof LoginModel, string];
            return { ...state, [key]: value }
        }
        case typesAction.reset: {
            return payload ? (payload as LoginModel) : { ...initialState };
        }
        default: return state
    }
}

export const useLoginForm = () => {
    const { validate, validateField, getFieldError, reset: resetValidation } = useValidation<LoginModel>(validateModel);

    const [state, dispatch] = useReducer(reducer, initialState);

    const changeField = useCallback((fieldName: keyof LoginModel, event: React.ChangeEvent<HTMLInputElement>) => {
        if (typeof event.target.value === 'string') {
            event.target.value = event.target.value.replace(/\s/g, ''); // удаляет пробелы
        }
        validateField(fieldName, event.target.value);
        dispatch({ type: typesAction.change, payload: [fieldName, event.target.value] } as Action)
    }, [dispatch, validateField]);

    const changeLogin = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        changeField('login', event)
    }, [changeField]);
    const changePassword = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        changeField('password', event)
    }, [changeField]);

    const setModel = useCallback((model?: LoginModel) => {
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
        changePassword,
        cleanUp,
        validate,
        setModel,
        getFieldError
    }
}