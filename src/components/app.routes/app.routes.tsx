import { Suspense, lazy } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { useUsers } from '../../hooks/use.users';

const Register = lazy(() => import('../register/register'));
const Login = lazy(() => import('../login/login'));
const Home = lazy(() => import('../home/home'));
const CreatePost = lazy(() => import('../create.post.form/create.post.form'));
const UserDetail = lazy(() => import('../user.detail/user.detail'));
export const AppRoutes = () => {
  const { actualUser } = useUsers();
  const paths = [
    { path: '' },
    { path: '/register' },
    { path: '/login' },
    { path: '/home' },
    { path: '/create-posts' },
    { path: '/user-detail' },
    { path: '*' },
  ];

  return (
    <Suspense>
      <Routes>
        <Route path={paths[0].path} element={<Login></Login>}></Route>
        <Route path={paths[1].path} element={<Register></Register>}></Route>
        <Route path={paths[2].path} element={<Login></Login>}></Route>
        {actualUser.token ? (
          <>
            <Route path={paths[3].path} element={<Home></Home>}></Route>
            <Route
              path={paths[4].path}
              element={<CreatePost></CreatePost>}
            ></Route>
            <Route
              path={paths[5].path}
              element={<UserDetail></UserDetail>}
            ></Route>
          </>
        ) : (
          <Route
            path={paths[6].path}
            element={<Navigate to="/login" />}
          ></Route>
        )}
      </Routes>
    </Suspense>
  );
};
