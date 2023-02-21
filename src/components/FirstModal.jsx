import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import sassyAlone from '../assets/Sassy_Icon_From_Logo.png';
import TermsConditionsComponent from './TermsConditionsComponent';


function FirstModal({ selectedArray, setSelectedArray, nfts, setNFTS, lodged, setLodged,
                    time, setTime, isLoading, setIsLoading, loadedData, setLoadedData }) {

  

  const [isDisabled, setIsDisabled] = useState(true);
  const [checked, setChecked] = useState(false);

  const [show, setShow] = useState(false);

  const fakeRequest = () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(
          "Creating you Lodge, Don't close this window"
        );
      }, 5000);
    });
  };

  const handleClose = () => setShow(false);
  const handleShow = () => {
    setShow(true);
    setChecked(false);
    setIsDisabled(true);
  }

  const canBeSubmitted = () => {
    return checked ? setIsDisabled(true) : setIsDisabled(false);
  };

  const onCheckboxClick = () => {
    setChecked(!checked);
    return canBeSubmitted();
  };

  const updateLodgeStatus = async () => {
    if (selectedArray.some(i => Number.isInteger(i))) {

      if (lodged === false) {
        const lodgeStatus = nfts.map((nft, index) => {
          for (let i = 0; i < selectedArray.length; i++)
            if (index === selectedArray[i]) {
              return { 
                ...nft, 
                lodgeStatus: true,
              }
            }
            return nft
          });
        setLodged(true);
        setNFTS(lodgeStatus);
        setTime(Date.now());
        handleClose();
        
        setIsLoading(true);
        
        const result = await fakeRequest();
        setLoadedData(result);
        
        setIsLoading(false);

        console.log(nfts);
        console.log(time);
      }
      else if (lodged === true) {
        const lodgeStatus = nfts.map((nft, index) => {
              return { 
                ...nft, 
                lodgeStatus: false,
              }
            }
          );
        setLodged(false);
        setNFTS(lodgeStatus);
        handleClose();

        setIsLoading(true);
        
        const result = await fakeRequest();
        setLoadedData(result);
        
        setIsLoading(false);

        console.log(nfts);
      }

    } else {
      setChecked(false);
      setIsDisabled(true);
      handleClose();
      window.alert('No Sassy selected!')
    }
      
    
  };

  return (
    <>
      <Button 
        className='lodgebutton' 
        variant="primary" 
        onClick={handleShow}
        
      >
        {lodged ? 'Unlodge' : 'Lodging your Sassy!'}
      </Button>

      <Modal 
        scrollable={true}
        show={show} 
        onHide={handleClose}  
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
    
        <Modal.Body className='text-center mt-4' >
        <img src={sassyAlone} alt='sassyAlone' className='img-fluid sassyAlonemodal1' />
          <p className='tabs-font2'>Lodging your Sassy!</p>
          <div className='text-start px-4'>
              <p className='mont-light'>
                  Lodging of Shredding Sassy NFTs
              </p>
              <p className='mont-light'>
                  While your Sassy is lodging, you won’t be able to sell it on marketplaces 
                  such as Opensea or our own. To do this, you’ll need to un-lodge your Sassy 
                  on this website first. You will be able to list your Sassy on a marketplace 
                  BUT it will not be able to be sold whilst it is lodging. To prevent confusion 
                  if we detect you have listed your Sassy on a marketplace, we reserve the right 
                  to remove it from the lodge. When a Sassy is removed from the lodge, the timer 
                  will reset and revert to zero.
              </p>
              <p className='mont-light'>
                  Full terms and condition <span><TermsConditionsComponent /></span>
              </p>
              <div className="form-check mb-4">
                  <input className="form-check-input" type="checkbox" onClick={onCheckboxClick} id="checkTerms" />
                  <label className="form-check-label purple" htmlFor='checkTerms' >
                      I have read the above and agree
                  </label>
              </div>
              <div className='row mb-3'>
                  <Button 
                    className='lodgebutton' 
                    disabled={isDisabled} 
                    variant="primary" 
                    onClick={() => updateLodgeStatus()}
                  >
                      {lodged ? 'Lets unlodge' : 'Lets Lodge'}
                  </Button>
              </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default FirstModal;