import { lazy } from 'react';
const Dashboard = lazy(() => import('./pages/Dashboard'));
const ManageMDAS = lazy(() => import('./pages/MDAs/manage'));
const ManageMDAProduct = lazy(() => import('./pages/MDAs/product'));

export default [
  { path: '/', name: 'Dashboard', component: Dashboard, exact: true },
  { path: '/manage/mdas', name: 'Manage MDAs', component: ManageMDAS, exact: true },
  { path: '/manage/mdas/product/:id', name: 'Manage MDAs', component: ManageMDAProduct, exact: true },
  // { path: '/manage/products', name: 'Manage Product', component: ManageProduct, exact: true },
];
