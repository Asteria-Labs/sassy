import React from "react";
import ConnectButton from "./ConnectButtonComponent";

function Home() {
  return (
    <div className="home overflow-y-hidden">
      <img
        className="img-fluid mainBg"
        height={10000}
        width={10000}
        alt="lodgeDoor"
      />
      <div className="center">
        <ConnectButton />
      </div>
    </div>
  );
}

export default Home;
