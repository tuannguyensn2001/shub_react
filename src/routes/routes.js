import React from 'react';

const HomePage = React.lazy(() => import('../pages/Home/index'));
const ClassPage = React.lazy(() => import('../pages/Class/index'));
const ClassAddPage = React.lazy(() => import('../pages/ClassAdd/index'));
const DetailClassPage = React.lazy(() => import('../pages/DetailClass/index'));
const DetailClassNewsfeedPage = React.lazy(() =>
    import('../pages/DetailClassNewsfeed/index')
);
const LoginPage = React.lazy(() => import('../pages/Login/index'));

const routes = [
    { path: '/', element: HomePage },
    {
        path: '/class',
        element: ClassPage,
        private: true,
    },
    {
        path: '/class/add',
        element: ClassAddPage,
    },
    {
        path: '/class/:id/',
        element: DetailClassPage,
        children: [
            {
                path: 'newsfeed',
                element: DetailClassNewsfeedPage,
            },
        ],
    },
    {
        path: '/login',
        element: LoginPage,
    },
];

export default routes;
