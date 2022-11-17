// constants
import { UsuarioActionTypes } from './constants';

const INIT_STATE = {
    usuarios: [],
    total: 0,
    limit: 10,
    page: 1,
    loading: false,
};

interface UserData {
    id: number;
    nombres: string;
    apellidos: string;
    correo: string;
    celular: string;
    dni: string;
    foto: string;
    rol: string;
}

interface UsuarioActionType {
    type:
        | UsuarioActionTypes.API_RESPONSE_SUCCESS
        | UsuarioActionTypes.API_RESPONSE_ERROR
        | UsuarioActionTypes.GETALLPAGINATE;
    payload: {
        actionType?: string;
        limit: number;
        page: number;
        data: { results: UserData[] | [], total: number | 0 };
        error?: string;
    };
}

interface State {
    usuarios?: UserData[] | [];
    total?: number;
    limit: number;
    page: number;
    loading?: boolean;
}

const Usuario = (state: State = INIT_STATE, action: UsuarioActionType): any => {
    switch (action.type) {
        case UsuarioActionTypes.API_RESPONSE_SUCCESS:
            switch (action.payload.actionType) {
                case UsuarioActionTypes.GETALLPAGINATE: {
                    return {
                        ...state,
                        usuarios: action.payload.data.results,
                        total: action.payload.data.total,
                        loading: false,
                    };
                }
                default:
                    return { ...state };
            }

        case UsuarioActionTypes.API_RESPONSE_ERROR:
            switch (action.payload.actionType) {
                case UsuarioActionTypes.GETALLPAGINATE: {
                    return {
                        ...state,
                        error: action.payload.error,
                        loading: false,
                    };
                }
                default:
                    return { ...state };
            }

        case UsuarioActionTypes.GETALLPAGINATE:
            return { ...state, loading: true, limit: action.payload.limit, page: action.payload.page };
        default:
            return { ...state };
    }
};

export default Usuario;
