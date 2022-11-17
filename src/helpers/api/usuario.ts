import { APICore } from './apiCore';

const api = new APICore();

// account
function getAllPaginate(params: { limit: number; page: number }) {
    const baseUrl = '/usuario/paginate';
    return api.get(`${baseUrl}`, params);
}

export { getAllPaginate };
