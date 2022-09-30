import { api } from 'src/boot/axios';

export const getUserProfile = () => {
  return api.get('/users/me');
};
