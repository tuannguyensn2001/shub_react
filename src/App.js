import {BrowserRouter, Routes, Route} from 'react-router-dom';
import routes from '~/routes/routes';
import {Fragment, Suspense, createElement} from 'react';
import DefaultLayout from '~/layout/default';

function App() {
    return (
        <Suspense fallback={<div>loading</div>}>
            <BrowserRouter>
                <Routes>
                    {routes.map((route) => (
                        <Fragment key={route.path}>
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
                            {!route?.layout && route?.children && Array.isArray(route?.children) && (
                                <Route
                                    path={route.path}
                                    element={
                                        <DefaultLayout>
                                            {createElement(route.element)}
                                        </DefaultLayout>
                                    }
                                >
                                    {route?.children?.map(item => (
                                        <Route path={item.path} key={item.path}
                                               element={createElement(item.element)}/>
                                    ))}
                                </Route>
                            )}
                        </Fragment>
                    ))}
                </Routes>
            </BrowserRouter>
        </Suspense>
    );
}

export default App;
