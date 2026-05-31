import { Suspense } from 'react';
import routers from '@routers/routers';
import { Routes, Route, useLocation } from 'react-router-dom';
import DefaultLayout from '@components/layouts/DefaultLayout';
import LoginPage from '@pages/LoginPage/LoginPage';
function App() {
  const location = useLocation();
  return (
    <>
      <Suspense fallback={<div>Loading...</div>}>
        {location.pathname !== '/login' ? (
          <DefaultLayout>
            <Routes>
              {routers.map((router, index) => {
                return <Route key={index} path={router.path} element={router.element} />;
              })}
            </Routes>
          </DefaultLayout>
        ) : (
          <LoginPage />
        )}
      </Suspense>
    </>
  );
}

export default App;
