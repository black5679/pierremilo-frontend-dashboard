// constants
import { UsuarioActionTypes } from './constants';

const INIT_STATE = {
    usuarios: [],
    roles: [],
    vistas: [],
    usuario: { nombres: "", apellidos: "", correo: "", dni: "", contrasenia: "", rol: 1, celular: "", permisos: [] },
    total: 0,
    limit: 10,
    page: 1,
    open: false,
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
    permisos: any[]
}

interface UsuarioActionType {
    type:
    | UsuarioActionTypes.API_RESPONSE_SUCCESS
    | UsuarioActionTypes.API_RESPONSE_ERROR
    | UsuarioActionTypes.OPENMODAL
    | UsuarioActionTypes.ONINITBANDEJA
    | UsuarioActionTypes.CHANGEPAGINATEQUERY
    | UsuarioActionTypes.GETBYID;
    payload: {
        actionType?: string;
        limit: number;
        page: number;
        open: boolean;
        data: any;
        error?: string;
    };
}

interface State {
    usuarios?: UserData[] | [];
    usuario: any;
    total?: number;
    limit: number;
    page: number;
    open: boolean;
    roles: any[];
    loading?: boolean;
}

const Usuario = (state: State = INIT_STATE, action: UsuarioActionType): any => {
    switch (action.type) {
        case UsuarioActionTypes.API_RESPONSE_SUCCESS:
            switch (action.payload.actionType) {
                case UsuarioActionTypes.ONINITBANDEJA: {
                    return {
                        ...state,
                        usuarios: action.payload.data.usuarios.results,
                        total: action.payload.data.usuarios.total,
                        roles: action.payload.data.roles,
                        loading: false,
                    };
                }
                case UsuarioActionTypes.INSERT: {
                    return {
                        ...state,
                        loading: false,
                    };
                }
                case UsuarioActionTypes.GETBYID: {
                    return {
                        ...state,
                        usuario: action.payload.data,
                        loading: false,
                    };
                }
                default:
                    return { ...state };
            }

        case UsuarioActionTypes.API_RESPONSE_ERROR:
            switch (action.payload.actionType) {
                case UsuarioActionTypes.ONINITBANDEJA:
                case UsuarioActionTypes.GETBYID:
                case UsuarioActionTypes.INSERT: {
                    return {
                        ...state,
                        error: action.payload.error,
                        loading: false,
                    };
                }
                default:
                    return { ...state };
            }
        case UsuarioActionTypes.ONINITBANDEJA:
            return { ...state, loading: true };
        case UsuarioActionTypes.OPENMODAL:
            return { ...state, open: action.payload.open };
        case UsuarioActionTypes.CHANGEPAGINATEQUERY:
            return { ...state, loading: true, limit: action.payload.limit, page: action.payload.page };
        default:
            return { ...state };
    }
};

export default Usuario;
