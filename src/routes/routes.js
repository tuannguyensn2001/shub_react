import React from 'react';

const HomePage = React.lazy(() => import('../pages/Home/index'));
const ClassPage = React.lazy(() => import('../pages/Class/index'));
const ClassAddPage = React.lazy(() => import('../pages/ClassAdd/index'));

const routes = [
    { path: '/', element: React.createElement(HomePage) },
    {
        path: '/class',
        element: React.createElement(ClassPage),
    },
    {
        path: '/class/add',
        element: React.createElement(ClassAddPage),
    },
];

export default routes;
