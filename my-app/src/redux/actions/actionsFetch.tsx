import { ERROR_MESSAGE, CHANGE_LOADING } from "../types";

export function errorMessage(message: string) {
    return (
        {
            type: ERROR_MESSAGE,
            payload: message
        })
}
export function changeLoading(changeLoading: boolean) {
    return {
        type: CHANGE_LOADING,
        payload: changeLoading,
    };
}