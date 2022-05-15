import API from '~/network';

export const fetchCreateClass = (data) => API.post('/v1/classes', data);

export const fetchOwnClass = () => API.get('/v1/classes/owner');

export const getOption = (option) => API.get(`/v1/classes/option/${option}`);
