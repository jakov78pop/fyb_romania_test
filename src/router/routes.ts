import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    // component: () => import('layouts/MainLayout.vue'),
    // children: [{ path: '', component: () => import('pages/IndexPage.vue') }],
    redirect: '/auth/login',
  },
  {
    path: '/auth',
    component: () => import('layouts/AuthLayout.vue'),
    children: [
      {
        path: '',
        redirect: 'login',
      },
      {
        path: 'login',
        name: 'LoginPage',
        component: () => import('src/pages/Auth/LoginPage.vue'),
      },
      {
        path: 'register',
        name: 'RegisterPage',
        component: () => import('src/pages/Auth/RegisterPage/RegisterPage.vue'),
      },
      {
        path: 'verify',
        name: 'VerifyPage',
        component: () => import('src/pages/Auth/VerifyPage.vue'),
      },
    ],
  },

  {
    path: '/user',
    component: () => import('layouts/UserLayout.vue'),
    children: [
      {
        path: '',
        name: 'UserDashboardPage',
        component: () => import('src/pages/User/UserDashboard.vue'),
      },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;
