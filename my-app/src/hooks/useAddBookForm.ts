import React, { useCallback, useReducer } from 'react';
import { AddBookModel, validateModel } from '../models/AddBookModel';
import { useValidation } from './useValidation'

interface Action {
  type: string;
  payload: unknown;
}

const initialState: AddBookModel = {
  name: '',
  description: '',
  picture: undefined,
}

const typesAction = {
  change: 'CHANGE_FIELD',
  reset: 'RESET'
}

const reducer = (state: AddBookModel, action: Action): AddBookModel => {
  const { type, payload } = action;
  switch (type) {
    case typesAction.change: {
      const [key, value] = payload as [keyof AddBookModel, string];
      return { ...state, [key]: value }
    }
    case typesAction.reset: {
      return payload ? (payload as AddBookModel) : { ...initialState };
    }
    default: return state
  }
}

export const useAddBookForm = () => {
  const { validate, validateField, getFieldError, reset: resetValidation } = useValidation<AddBookModel>(validateModel);

  const [state, dispatch] = useReducer(reducer, initialState);

  const changeField = useCallback((fieldName: keyof AddBookModel, event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (event.target.type != 'file' && typeof event.target.value === 'string') {
      event.target.value = event.target.value.trimStart(); // удаляет пробелы в начале и в конце
      validateField(fieldName, event.target.value);
      dispatch({ type: typesAction.change, payload: [fieldName, event.target.value] } as Action)
    }
    if (event.target instanceof HTMLInputElement && event.target.files) {
      let files = event.target.files;
      if (files.length > 0) {
        validateField(fieldName, files);
        dispatch({ type: typesAction.change, payload: [fieldName, files] } as Action)
      } else {
        validateField(fieldName, undefined);
        dispatch({ type: typesAction.change, payload: [fieldName, undefined] } as Action)
      }
    }

  }, [dispatch, validateField]);

  const changeName = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    changeField('name', event)
  }, [changeField]);
  const changeDescription = useCallback((event: React.ChangeEvent<HTMLTextAreaElement>) => {
    changeField('description', event)
  }, [changeField]);
  const changeFiles = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    changeField('picture', event)
  }, [changeField]);

  const setModel = useCallback((model?: AddBookModel) => {
    resetValidation();
    dispatch({ type: typesAction.reset, payload: model } as Action)
  }, [resetValidation])

  const cleanUp = useCallback(() => {
    setModel();
  }, [setModel]);
  return {
    state,
    changeName,
    changeDescription,
    changeFiles,
    cleanUp,
    validate,
    setModel,
    getFieldError,
  }
}