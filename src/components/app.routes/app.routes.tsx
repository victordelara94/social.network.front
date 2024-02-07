import { Suspense, lazy } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

const Register = lazy(() => import('../register/register'));
const Login = lazy(() => import('../login/login'));
const Home = lazy(() => import('../home/home'));
export const AppRoutes = () => {
  const paths = [
    { path: '' },
    { path: '/register' },
    { path: '/login' },
    { path: '/home' },
    { path: '*' },
  ];

  return (
    <Suspense>
      <Routes>
        <Route path={paths[0].path} element={<Login></Login>}></Route>
        <Route path={paths[1].path} element={<Register></Register>}></Route>
        <Route path={paths[2].path} element={<Login></Login>}></Route>
        <Route path={paths[3].path} element={<Home></Home>}></Route>
        <Route path={paths[4].path} element={<Navigate to="/login" />}></Route>
      </Routes>
    </Suspense>
  );
};
