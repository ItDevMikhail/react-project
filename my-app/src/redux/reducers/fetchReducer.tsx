import { ERROR_MESSAGE, CHANGE_LOADING } from "../types";

const initialState = {
    error: "",
    loading: false,
};

export const fetchReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case ERROR_MESSAGE:
            return { ...state, error: action.payload };
        case CHANGE_LOADING:
            return { ...state, loading: action.payload };
        default: return state;
    }
};
