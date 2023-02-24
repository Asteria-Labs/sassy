import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./HomeComponent";
import Dashboard from "./DashboardComponent";

import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.min.css' 

import WalletContext from "../contexts/WalletContext";

function Main() {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <>
      <ToastContainer position="top-center" theme="dark" />
      <main>
        <WalletContext autoLogin>
          <Routes>
            <Route
              exact
              path="/"
              element={<Home />}
            />
            <Route
              path="/dashboard"
              element={
                <Dashboard
                  isLoading={isLoading}
                  setIsLoading={setIsLoading}
                />
              }
            />
          </Routes>
        </WalletContext>
      </main>
    </>
  );
}

export default Main;
