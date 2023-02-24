import React from 'react';
import ConnectButton from './ConnectButtonComponent';

function Home() {

  return (
    <div className='container-fluid home'>
      <img className='img-fluid mainBg' width={1000} alt='lodgeDoor' />
      <div className='center'>
        <ConnectButton />
      </div>
    </div>
  );
}

export default Home;
