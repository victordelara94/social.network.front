import { Suspense, lazy } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

const Register = lazy(() => import('../register/register'));
const Login = lazy(() => import('../login/login'));
export const AppRoutes = () => {
  const paths = [
    { path: '' },
    { path: '/register' },
    { path: '/login' },
    { path: '*' },
  ];

  return (
    <Suspense>
      <Routes>
        <Route path={paths[0].path} element={<Register></Register>}></Route>
        <Route path={paths[1].path} element={<Register></Register>}></Route>
        <Route path={paths[2].path} element={<Login></Login>}></Route>
        <Route
          path={paths[3].path}
          element={<Navigate to="/register" />}
        ></Route>
      </Routes>
    </Suspense>
  );
};
