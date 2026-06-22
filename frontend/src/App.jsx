import { routes } from './routes/routes.jsx';
import { Routes, Route } from 'react-router-dom';
import Header from '@components/layout/Header/Header';
import Footer from '@components/layout/Footer/Footer';
import { ToastMessgeProvider } from '@contexts/ToastMessgeProvider.jsx';
import { AuthProvider } from '@contexts/AuthProvider.jsx';
import { ProductsProvider } from '@contexts/ProductsProvider.jsx';
import { RechagresProvider } from '@contexts/RechagresProvider.jsx';
import { AtmPaymentProvider } from '@contexts/AtmPaymentProvider.jsx';
function App() {
  return (
    <ToastMessgeProvider>
      <AuthProvider>
        <ProductsProvider>
          <AtmPaymentProvider>
            <RechagresProvider>
              <Routes>
                {/* USER ROUTES */}
                {routes.map((route, index) => (
                  <Route
                    key={index}
                    path={route.path}
                    element={
                      <>
                        <Header />
                        {route.element}
                        <Footer />
                      </>
                    }
                  />
                ))}
              </Routes>
            </RechagresProvider>
          </AtmPaymentProvider>
        </ProductsProvider>
      </AuthProvider>
    </ToastMessgeProvider>
  );
}

export default App;
