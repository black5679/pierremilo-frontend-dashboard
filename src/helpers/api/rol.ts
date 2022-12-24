import { APICore } from './apiCore';

const api = new APICore();

// account
function getAll() {
    const baseUrl = '/rol';
    return api.get(`${baseUrl}`, null);
}

export { getAll };