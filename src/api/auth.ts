import { api } from 'src/boot/axios';

export const login = (data: { email: string; password: string }) => {
  return api.post('/authentication_token', data);
};

export const register = (data: any) => {
  return api.post('/users/register', data);
};

export const verifyAccount = (uuid: string, emailVerificationToken: string) => {
  return api.get(`/users/${uuid}/verify`, {
    params: {
      emailVerificationToken,
    },
  });
};
