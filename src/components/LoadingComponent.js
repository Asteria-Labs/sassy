import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import sassyloading1 from '../assets/SassyAnimation.gif';
import sassyloading2 from '../assets/SassyAnimation2.gif';

function Loading({ isLoading }) {

  return (
    <>
      <Modal
        size="lg"
        show={isLoading ? (true) : (false)}
        onHide={isLoading ? (true) : (false)}
        aria-labelledby="example-modal-sizes-title-sm"
        >
            <Modal.Body>
                <div className='tabs-font4 text-center'>
                    <h1>Lodging your Sassy</h1>
                    <img className='sassyLoading img-fluid' src={sassyloading1} alt='sassy loading' />
                    <h2 className='mont-semi'>Creating your Lodge</h2>
                    <p  className='mont-semi'>Don't close this window</p>
                </div>
            </Modal.Body>
        </Modal>
    </>
  );
}

export default Loading;
