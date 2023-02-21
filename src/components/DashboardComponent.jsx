import React, { useState } from 'react';
import { Modal } from 'bootstrap/dist/js/bootstrap.bundle';
import sassylogo from '../assets/Shredding_Sassy_Logo_-_Purple.png';
import sassyAlone from '../assets/Sassy_Icon_From_Logo.png';
import FirstModal from './FirstModal';
import discButton from '../assets/buttonConnect.png';
import checked from '../assets/paloma.png';
import dayjs from 'dayjs';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock } from '@fortawesome/free-solid-svg-icons';
import Loading from './LoadingComponent';
import PBar from './ProgressBarComponent';

import relativeTime from 'dayjs/plugin/relativeTime';

function Dashboard({accounts, setAccounts, selectedArray, lodged, setLodged,
                    setSelectedArray, nfts, setNFTS, isLoading, setIsLoading,
                    loadedData, setLoadedData}) {

  const isConnected = Boolean(accounts[0]);

  dayjs.extend(relativeTime)
  const [time, setTime] = useState(Date.now());

  const tiempo = dayjs(time).fromNow()

  async function disconnectAccount() {    
    window.location.replace('/');
  }

  const handleClick=(i)=>{
    const tempArray =[...selectedArray]
    if(tempArray[i]==i){tempArray[i]=undefined}
    else {tempArray[i]=i}

    setSelectedArray(tempArray)

    console.log(tempArray.length);
    console.log(tempArray);
  }

  return (
    
      
      
      <div className='container-fluid'>

        {isConnected ? (
          <>
            <Loading isLoading={isLoading} />
            <div>
              <div className='row align-items-center mt-4 mb-5'>
                <div className='col-sm-6 col-12 text-start ps-5'>
                  <img className='img-fluid sassylogo' src={sassylogo} alt='sassylogo' />
                </div>
                <div className='col-sm-6 col-12 text-end pe-5' >
                  <button className="btn" onClick={disconnectAccount}><img src={discButton} className='conDis img-fluid' /></button>
                </div>
              </div>
              <div className='row m-5 p-5'>
                

                <nav>
                  <div className="nav nav-tabs tabs-font" id="nav-tab" role="tablist">
                    <button className="nav-link active" id="lodge-tab" data-bs-toggle="tab" data-bs-target="#lodge" type="button" role="tab" aria-controls="lodge" aria-selected="true">Lodge</button>
                    <button className="nav-link" id="rewards-tab" data-bs-toggle="tab" data-bs-target="#rewards" type="button" role="tab" aria-controls="rewards" aria-selected="false">Rewards</button>
                    <button className="nav-link" id="profile-tab" data-bs-toggle="tab" data-bs-target="#profile" type="button" role="tab" aria-controls="profile" aria-selected="false">My profile</button>
                  </div>
                </nav>
                <div className="tab-content" id="nav-tabContent"  >
                  <div className="my-5 tab-pane fade show active" id="lodge" role="tabpanel" aria-labelledby="lodge-tab" tabIndex="0">
                    <div className='row'  > 
                      {nfts.map((sassy, index) => {
                        const selected = selectedArray[index]===index? true:false;
                        
                        return (
                          
                            <div key={sassy.id.toString()} className='col-md-3 col-sm-6 col-12 tabs-font4'  >
                              
                              <div className="card border-light" >
                                <img src={sassy.image} className="card-img-top img-fluid" alt={sassy.name} />
                                <div className="card-body">
                                  <div className='row idTime align-items-center'>
                                    <div className='col-3'><p>{sassy.id}</p></div>
                                    <div className='col-9 text-end '>{sassy.lodgeStatus ? (<p><FontAwesomeIcon icon={faClock} /> {tiempo}</p>):('')}</div>
                                  </div>
                                  <div className='row'>
                                    <p className={sassy.lodgeStatus ? "mont-semi2":"d-none"} >{sassy.lodgeStatus ? ('Sassy lodged'): ('')}</p>
                                    
                                    <button 
                                      className={selected ? 'btn btn-outline-secondary mont-semi2 px-1' : 'btn btn-light selectButton mont-semi2 px-1' } 
                                      style={sassy.lodgeStatus ? {display: 'none'}:{}}
                                      onClick={() => handleClick(index)}
                                      disabled={sassy.lodgeStatus ? (true): (false)}
              
                                    >
                                      {sassy.lodgeStatus ? (''): ('Select')}
                                    </button>
                                    
                                  </div>
                                </div>
                                <div className={selected ? 'checked' : 'checked d-none'} >
                                <img src={checked} className='paloma' alt={checked} />
                              </div>
                              </div>
                              <div className={selected ? 'checked' : 'checked d-none'} >
                                <img src={checked} className='paloma' alt={checked} />
                              </div>
                              
                              
                            </div>
                          
                        )
                      })}
                  </div>
                      
                    
                    <div className='row tabs-font mt-4 px-2'>    
                      <FirstModal 
                        selectedArray={selectedArray} setSelectedArray={setSelectedArray}
                        nfts={nfts} setNFTS={setNFTS}
                        lodged={lodged} setLodged={setLodged}
                        time={time} setTime={setTime}
                        isLoading={isLoading} setIsLoading={setIsLoading}
                        loadedData={loadedData} setLoadedData={setLoadedData}
                      />
                    </div>
                  </div>
                  <div className="my-5 tab-pane fade" id="rewards" role="tabpanel" aria-labelledby="rewards-tab" tabIndex="1">
                    <h1>Rewards</h1>
                  </div>
                  <div className="my-5 tab-pane fade" id="profile" role="tabpanel" aria-labelledby="profile-tab" tabIndex="2">
                    <h1>My profile</h1>
                  </div>
                </div>
              </div>
            </div>
            </>
          )
          :
          (
            <div className='text-center m-5 p-5'>
              <div className='m-3'>
                <h1 className='tabs-font'>You are not connected!!</h1>
              </div>
              <div className='m-3'>
                <img src={sassyAlone} alt='sassylogo' className='img-fluid alone' />
              </div>
              <div className='m-3'>
                <button className="lodgebuttonError" onClick={disconnectAccount} >Go to connect Wallet</button>
              </div>
            </div>
          )
        }
        
      </div>
    
  );
}

export default Dashboard;
