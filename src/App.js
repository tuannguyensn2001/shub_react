import { BrowserRouter, Routes, Route } from 'react-router-dom';
import routes from '~/routes/routes';
import { Fragment, Suspense } from 'react';
import DefaultLayout from '~/layout/default';

function App() {
    return (
        <Suspense fallback={<div>loading</div>}>
            <BrowserRouter>
                <Routes>
                    {routes.map((route) => (
                        <Fragment key={route.path}>
                            {!route?.layout && (
                                <Route
                                    path={route.path}
                                    element={
                                        <DefaultLayout>
                                            {route.element}
                                        </DefaultLayout>
                                    }
                                />
                            )}
                        </Fragment>
                    ))}
                </Routes>
            </BrowserRouter>
        </Suspense>
    );
}

export default App;
