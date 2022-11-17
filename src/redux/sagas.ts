import { all } from 'redux-saga/effects';

import authSaga from './auth/saga';
import layoutSaga from './layout/saga';
import UsuarioSaga from './usuario/saga';

export default function* rootSaga() {
    yield all([authSaga(), layoutSaga(), UsuarioSaga()]);
}
