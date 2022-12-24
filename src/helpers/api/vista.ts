import { APICore } from './apiCore';

const api = new APICore();

// account
function getAll() {
    const baseUrl = '/vista';
    return api.get(`${baseUrl}`, null);
}

export { getAll };