import React from 'react';
import ConnectButton from './ConnectButtonComponent';

function Home({accounts, setAccounts}) {

  return (
    <div className='container-fluid home'>
      <img className='img-fluid mainBg' width={1000} alt='lodgeDoor' />
      <div className='center'>
        <ConnectButton accounts={accounts} setAccounts={setAccounts} />
      </div>
    </div>
  );
}

export default Home;
