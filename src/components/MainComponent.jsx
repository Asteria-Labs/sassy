import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./HomeComponent";
import Dashboard from "./DashboardComponent";
import { NFTS } from "./ExampleArray";

import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.min.css' 

import WalletContext from "../contexts/WalletContext";

function Main() {
  const [selectedArray, setSelectedArray] = useState([]);
  const [nfts, setNFTS] = useState(NFTS);
  const [lodged, setLodged] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [loadedData, setLoadedData] = useState();

  return (
    <>
      <ToastContainer position="top-center" theme="dark" />
      <main>
        <WalletContext>
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
                  selectedArray={selectedArray}
                  setSelectedArray={setSelectedArray}
                  nfts={nfts}
                  setNFTS={setNFTS}
                  lodged={lodged}
                  setLodged={setLodged}
                  isLoading={isLoading}
                  setIsLoading={setIsLoading}
                  loadedData={loadedData}
                  setLoadedData={setLoadedData}
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
