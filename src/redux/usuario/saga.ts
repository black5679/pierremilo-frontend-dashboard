import { all, fork, put, takeEvery, call } from 'redux-saga/effects';
import { SagaIterator } from '@redux-saga/core';

// helpers
import {
    usuarioGetAllPaginate as usuarioGetAllPaginateApi,
    usuarioGetById as usuarioGetByIdApi,
    usuarioInsert as usuarioInsertApi,
    rolGetAll as rolGetAllApi,
    vistaGetAll as vistaGetAllApi,
} from '../../helpers/';

// actions
import { usuarioApiResponseSuccess, usuarioApiResponseError } from './actions';

// constants
import { UsuarioActionTypes } from './constants';

interface UserData {
    payload: {
        limit: number;
        page: number;
        open: boolean;
    };
    type: string;
}

interface UsuarioInsertData {
    payload: UsuarioInsertRequest;
    type: string
}

interface UsuarioInsertRequest {
    nombres: string;
    apellidos: string;
    correo: string;
    celular: string;
    rol: number;
    dni: string;
    contrasenia: string;
}

interface GetByIdData {
    payload: {
        id: number
    };
    type: string;
}

/**
 * Login the user
 * @param {*} payload - username and password
 */
function* insert({payload, type}: UsuarioInsertData): SagaIterator {
    try {
        const response = yield call(usuarioInsertApi, payload);
        let data = response.data;
        yield put(usuarioApiResponseSuccess(UsuarioActionTypes.INSERT, data));
    } catch (error: any) {
        yield put(usuarioApiResponseError(UsuarioActionTypes.INSERT, error));
    }
}

function* onInitBandeja({ payload: { limit, page }, type }: UserData): SagaIterator {
    try {
        const [usuariosresponse, rolesResponse] = yield all([call(usuarioGetAllPaginateApi, { limit, page }),call(rolGetAllApi)]);
        const usuarios = usuariosresponse.data;
        const roles = rolesResponse.data;
        yield put(usuarioApiResponseSuccess(UsuarioActionTypes.ONINITBANDEJA, {usuarios,roles}));
    } catch (error: any) {
        yield put(usuarioApiResponseError(UsuarioActionTypes.ONINITBANDEJA, error));
    }
}

function* getById({ payload: { id }, type }: GetByIdData): SagaIterator {
    try {
        const [usuarioResponse, vistasResponse] = yield all([call(usuarioGetByIdApi, { id }),call(vistaGetAllApi)]);
        let usuario = usuarioResponse.data;
        let vistas = vistasResponse.data;
        yield put(usuarioApiResponseSuccess(UsuarioActionTypes.GETBYID, {usuario,vistas}));
    } catch (error: any) {
        yield put(usuarioApiResponseError(UsuarioActionTypes.GETBYID, error));
    }
}

export function* watchOnInitBandeja() {
    yield takeEvery(UsuarioActionTypes.ONINITBANDEJA, onInitBandeja);
}

export function* watchGetById() {
    yield takeEvery(UsuarioActionTypes.GETBYID, getById);
}

export function* watchInsert() {
    yield takeEvery(UsuarioActionTypes.INSERT, insert);
}

function* usuarioSaga() {
    yield all([fork(watchOnInitBandeja),fork(watchGetById),fork(watchInsert)]);
}

export default usuarioSaga;
