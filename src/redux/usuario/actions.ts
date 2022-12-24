// constants
import { UsuarioActionTypes } from './constants';

export interface UsuarioActionType<TPayload> {
    type:
        | UsuarioActionTypes.API_RESPONSE_SUCCESS
        | UsuarioActionTypes.API_RESPONSE_ERROR
        | UsuarioActionTypes.OPENMODAL
        | UsuarioActionTypes.ONINITBANDEJA
        | UsuarioActionTypes.INSERT
        | UsuarioActionTypes.CHANGEPAGINATEQUERY
        | UsuarioActionTypes.GETBYID,
    payload?: TPayload;
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

interface UsuarioInsertRequest {
    nombres: string;
    apellidos: string;
    correo: string;
    celular: string;
    rol: number;
    dni: string;
    contrasenia: string;
    permisos: PermisoRequest[]
}

interface PermisoRequest {
    idVista: number,
    visualizar: boolean,
    registrar: boolean,
    editar: boolean,
    eliminar: boolean
}

// common success
export const usuarioApiResponseSuccess = (actionType: string, data: UserData | {}): UsuarioActionType<any> => ({
    type: UsuarioActionTypes.API_RESPONSE_SUCCESS,
    payload: { actionType, data },
});
// common error
export const usuarioApiResponseError = (actionType: string, error: string): UsuarioActionType<any> => ({
    type: UsuarioActionTypes.API_RESPONSE_ERROR,
    payload: { actionType, error },
});

export const usuarioOpenModal = (open: boolean): UsuarioActionType<any> => ({
    type: UsuarioActionTypes.OPENMODAL,
    payload: { open }
});

export const usuarioOnInitBandeja = (limit: number, page: number): UsuarioActionType<any> => ({
    type: UsuarioActionTypes.ONINITBANDEJA,
    payload: { limit, page },
});

export const usuarioInsert = (data: UsuarioInsertRequest): UsuarioActionType<any> => ({
    type: UsuarioActionTypes.INSERT,
    payload: data,
});

export const usuarioChangePaginateQuery = (limit: number, page: number): UsuarioActionType<any> => ({
    type: UsuarioActionTypes.CHANGEPAGINATEQUERY,
    payload: { limit, page },
});

export const usuarioGetById = (id: number): UsuarioActionType<any> => ({
    type: UsuarioActionTypes.GETBYID,
    payload: { id },
});