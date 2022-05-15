import API from '~/network';

export const fetchLogin = (data) => API.post('/v1/auth/login', data);

export const fetchMe = () => API.get('/v1/auth/me');
