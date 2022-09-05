import { APICore } from './apiCore';

const api = new APICore();

// account
function login(params: { correo: string; contrasenia: string }) {
    const baseUrl = '/usuario/login';
    return api.create(`${baseUrl}`, params);
}

function logout() {
    const baseUrl = '/logout/';
    return api.create(`${baseUrl}`, {});
}

function signup(params: { fullname: string; email: string; contrasenia: string }) {
    const baseUrl = '/register/';
    return api.create(`${baseUrl}`, params);
}

function forgotPassword(params: { correo: string }) {
    const baseUrl = '/forget-password/';
    return api.create(`${baseUrl}`, params);
}

export { login, logout, signup, forgotPassword };
