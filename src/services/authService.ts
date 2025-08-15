import { ApiClient } from './ApiClient';


export const authApi = () => new ApiClient(`/user/login`);