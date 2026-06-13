import { routes } from "./routes/routes.jsx";
import { Routes, Route } from "react-router-dom";
import Header from "@components/layout/Header/Header";
import Footer from "@components/layout/Footer/Footer";
import { ToastMessgeProvider } from "@contexts/ToastMessgeProvider.jsx";
import { AuthProvider } from "@contexts/AuthProvider.jsx";
import { ProductsProvider } from "@contexts/ProductsProvider.jsx";
function App() {
  return (
    <ToastMessgeProvider>
      <AuthProvider>
        <ProductsProvider>
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

            {/* ADMIN ROUTES */}
            {/* {routesAdmin.map((route, index) => (
                            <Route
                            key={index}
                            path={route.path}
                            element={
                              <DefaultAdmin>{route.element}</DefaultAdmin>
                              // role === 'admin' ? (
                                // ) : (
                                  //     <Navigate to='/' replace />
                                  // )
                                  }
                                  />
                                  ))} */}
          </Routes>
        </ProductsProvider>
      </AuthProvider>
    </ToastMessgeProvider>
  );
}

export default App;
