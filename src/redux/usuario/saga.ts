import { all, fork, put, takeEvery, call } from 'redux-saga/effects';
import { SagaIterator } from '@redux-saga/core';

// helpers
import {
    usuarioGetAllPaginate as usuarioGetAllPaginateApi,
} from '../../helpers/';

// actions
import { usuarioApiResponseSuccess, usuarioApiResponseError } from './actions';

// constants
import { UsuarioActionTypes } from './constants';

interface UserData {
    payload: {
        limit: number;
        page: number;
    };
    type: string;
}

/**
 * Login the user
 * @param {*} payload - username and password
 */
function* getAllPaginate({ payload: { limit, page }, type }: UserData): SagaIterator {
    try {
        const response = yield call(usuarioGetAllPaginateApi, { limit, page });
        let users = response.data;
        yield put(usuarioApiResponseSuccess(UsuarioActionTypes.GETALLPAGINATE, users));
    } catch (error: any) {
        yield put(usuarioApiResponseError(UsuarioActionTypes.GETALLPAGINATE, error));
    }
}

export function* watchGetAllPaginate() {
    yield takeEvery(UsuarioActionTypes.GETALLPAGINATE, getAllPaginate);
}

function* authSaga() {
    yield all([fork(watchGetAllPaginate)]);
}

export default authSaga;
