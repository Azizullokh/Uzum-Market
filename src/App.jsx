import React from "react";
import { Route, Routes } from "react-router-dom";
import MainLayout from "./MainLayout/MainLayout";
import Home from "./pages/Home";
import Favorite from "./pages/Favorite";
import Cart from "./pages/Cart";
import Details from "./pages/Details";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <div>
      <ToastContainer></ToastContainer>
      <Routes>
      <Route
        path="/"
        element={
          <MainLayout>
            <Home></Home>
          </MainLayout>
        }
      ></Route>
      <Route
        path="/favorites"
        element={
          <MainLayout>
            <Favorite></Favorite>
          </MainLayout>
        }
      ></Route>
      <Route
        path="cart"
        element={
          <MainLayout>
            <Cart></Cart>
          </MainLayout>
        }
      ></Route>
      <Route path="/details/:id" element={<MainLayout><Details></Details></MainLayout>}></Route>
    </Routes>
    </div>
    
  );
}

export default App;
