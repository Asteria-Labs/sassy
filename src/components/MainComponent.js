import React, { useState } from 'react';
import { Routes, Route, Redirect } from 'react-router-dom';
import Home from './HomeComponent';
import Dashboard from './DashboardComponent';
import { NFTS } from './ExampleArray';

function Main() {

  const [accounts, setAccounts] = useState([]);
  const [selectedArray,setSelectedArray]=useState([])
  const [nfts, setNFTS] = useState(NFTS);
  const [lodged, setLodged] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [loadedData, setLoadedData] = useState();

  return (
    <>
      <Routes>
        <Route exact path='/' element={<Home 
                                        accounts={accounts} 
                                        setAccounts={setAccounts} 
                                      />} />
        <Route path='/dashboard' element={<Dashboard 
                                            accounts={accounts} 
                                            setAccounts={setAccounts}
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
                                        />} />
      </Routes>
    </>
  );
}

export default Main;
