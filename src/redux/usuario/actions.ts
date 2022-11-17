// constants
import { UsuarioActionTypes } from './constants';

export interface UsuarioActionType {
    type:
        | UsuarioActionTypes.API_RESPONSE_SUCCESS
        | UsuarioActionTypes.API_RESPONSE_ERROR
        | UsuarioActionTypes.GETALLPAGINATE
    payload: {} | string;
}

interface UserData {
    id: number;
    username: string;
    password: string;
    firstName: string;
    lastName: string;
    role: string;
    token: string;
}

// common success
export const usuarioApiResponseSuccess = (actionType: string, data: UserData | {}): UsuarioActionType => ({
    type: UsuarioActionTypes.API_RESPONSE_SUCCESS,
    payload: { actionType, data },
});
// common error
export const usuarioApiResponseError = (actionType: string, error: string): UsuarioActionType => ({
    type: UsuarioActionTypes.API_RESPONSE_ERROR,
    payload: { actionType, error },
});

export const usuarioGetAllPaginate = (limit: number, page: number): UsuarioActionType => ({
    type: UsuarioActionTypes.GETALLPAGINATE,
    payload: { limit, page },
});