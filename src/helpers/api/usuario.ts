import { APICore } from './apiCore';

const api = new APICore();

// account

interface UsuarioInsertRequest {
    nombres: string;
    apellidos: string;
    correo: string;
    celular: string;
    rol: number;
    dni: string;
    contrasenia: string;
}

function getAllPaginate(params: { limit: number; page: number }) {
    const baseUrl = '/usuario/paginate';
    return api.get(`${baseUrl}`, params);
}

function insert(params: UsuarioInsertRequest) {
    const baseUrl = '/usuario';
    return api.create(`${baseUrl}`, params);
}

// account
function getById(params: { id: number }) {
    const baseUrl = '/usuario/';
    return api.get(`${baseUrl}/${params.id}`, null);
}

export { getAllPaginate, getById, insert };
