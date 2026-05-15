import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "./assets/vite.svg";
import heroImg from "./assets/hero.png";
import { Suspense } from "react";
import routers from "@routers/routers";
import { Routes, Route } from "react-router-dom";
import DefaultLayout from "@components/layouts/DefaultLayout";
function App() {
  return (
    <>
      <Suspense fallback={<div>Loading...</div>}>
        <DefaultLayout>
          <Routes>
            {routers.map((router, index) => {
              return (
                <Route
                  key={index}
                  path={router.path}
                  element={router.element}
                />
              );
            })}
          </Routes>
        </DefaultLayout>
      </Suspense>
    </>
  );
}

export default App;
