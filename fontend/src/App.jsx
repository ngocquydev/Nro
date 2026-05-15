import { routes } from "./routes/routes.jsx";
import { Routes, Route } from "react-router-dom";
import Header from "@components/layout/Header/Header";
import Footer from "@components/layout/Footer/Footer";
import { ToastMessgeProvider } from "@contexts/ToastMessgeProvider.jsx";
import { AuthProvider } from "@contexts/AuthProvider.jsx";
import { ProductsProvider } from "@contexts/ProductsProvider.jsx";
function App() {
  // const attackWithFakeIP = async () => {
  //   const URL = "http://localhost:3000/api/category/getAll";

  //   // Hàm tạo IP ngẫu nhiên
  //   const randomIP = () =>
  //     `${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}`;

  //   for (let i = 0; i < 500; i++) {
  //     const fakeIP = randomIP();

  //     fetch(URL, {
  //       method: "GET",
  //       headers: {
  //         "X-Forwarded-For": fakeIP, // Giả lập IP khách hàng
  //       },
  //     })
  //       .then((res) => console.log(`IP: ${fakeIP} | Status: ${res.status}`))
  //       .catch(() => {});

  //     await new Promise((r) => setTimeout(r, 10));
  //   }
  // };

  // attackWithFakeIP();
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
