import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import routes from '~/routes/routes';
import { Fragment, Suspense, createElement, useEffect } from 'react';
import DefaultLayout from '~/layout/default';
import useAuthStore from '~/store/useAuthStore';

function App() {
    const getMe = useAuthStore((state) => state.getMe);
    const isLoaded = useAuthStore((state) => state.isLoaded);
    const isAuth = useAuthStore((state) => state.isLoggedIn);

    useEffect(() => {
        getMe();
    }, []);

    return (
        <Suspense fallback={<div>loading</div>}>
            {!!isLoaded && (
                <BrowserRouter>
                    <Routes>
                        {routes.map((route) => (
                            <Fragment key={route.path}>
                                {!route?.layout && !route?.children && (
                                    <>
                                        {!route.private && (
                                            <Route
                                                path={route.path}
                                                element={
                                                    <DefaultLayout>
                                                        {createElement(
                                                            route.element
                                                        )}
                                                    </DefaultLayout>
                                                }
                                            />
                                        )}
                                        {route.private && isAuth() && (
                                            <Route
                                                path={route.path}
                                                element={
                                                    <DefaultLayout>
                                                        {createElement(
                                                            route.element
                                                        )}
                                                    </DefaultLayout>
                                                }
                                            />
                                        )}
                                        {route.private && !isAuth() && (
                                            <Route
                                                path={route.path}
                                                element={
                                                    <Navigate
                                                        to={'/login'}
                                                        replace
                                                    />
                                                }
                                            />
                                        )}
                                    </>
                                )}
                                {!route?.layout &&
                                    route?.children &&
                                    Array.isArray(route?.children) && (
                                        <>
                                            {!route.private && (
                                                <Route
                                                    path={route.path}
                                                    element={
                                                        <DefaultLayout>
                                                            {createElement(
                                                                route.element
                                                            )}
                                                        </DefaultLayout>
                                                    }
                                                >
                                                    {route?.children?.map(
                                                        (item) => (
                                                            <Route
                                                                path={item.path}
                                                                key={item.path}
                                                                element={createElement(
                                                                    item.element
                                                                )}
                                                            />
                                                        )
                                                    )}
                                                </Route>
                                            )}
                                            {route.private && isAuth() && (
                                                <Route
                                                    path={route.path}
                                                    element={
                                                        <DefaultLayout>
                                                            {createElement(
                                                                route.element
                                                            )}
                                                        </DefaultLayout>
                                                    }
                                                >
                                                    {route?.children?.map(
                                                        (item) => (
                                                            <Route
                                                                path={item.path}
                                                                key={item.path}
                                                                element={createElement(
                                                                    item.element
                                                                )}
                                                            />
                                                        )
                                                    )}
                                                    {route.private &&
                                                        !isAuth() && (
                                                            <Route
                                                                path={
                                                                    route.path
                                                                }
                                                                element={
                                                                    <Navigate
                                                                        to={
                                                                            '/login'
                                                                        }
                                                                        replace
                                                                    />
                                                                }
                                                            />
                                                        )}
                                                </Route>
                                            )}
                                        </>
                                    )}
                            </Fragment>
                        ))}
                    </Routes>
                </BrowserRouter>
            )}
        </Suspense>
    );
}

export default App;

function RenderRoute({ route }) {
    return (
        <Fragment>
            {!route?.layout && !route?.children && (
                <Route
                    path={route.path}
                    element={
                        <DefaultLayout>
                            {createElement(route.element)}
                        </DefaultLayout>
                    }
                />
            )}
            {!route?.layout &&
                route?.children &&
                Array.isArray(route?.children) && (
                    <Route
                        path={route.path}
                        element={
                            <DefaultLayout>
                                {createElement(route.element)}
                            </DefaultLayout>
                        }
                    >
                        {route?.children?.map((item) => (
                            <Route
                                path={item.path}
                                key={item.path}
                                element={createElement(item.element)}
                            />
                        ))}
                    </Route>
                )}
        </Fragment>
    );
}
