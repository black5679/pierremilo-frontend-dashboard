import { combineReducers } from 'redux';

import Auth from './auth/reducers';
import Usuario from './usuario/reducers';
import Layout from './layout/reducers';

export default combineReducers({
    Auth,
    Layout,
    Usuario
});
