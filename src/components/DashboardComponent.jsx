import React, { useEffect, useState } from "react";
import axios from "axios";

import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en";

import { toast } from "react-toastify";
import { Alchemy } from "alchemy-sdk";

// import { Modal } from "bootstrap/dist/js/bootstrap.bundle";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock } from "@fortawesome/free-solid-svg-icons";

import FirstModal from "./FirstModal";
import Loading from "./LoadingComponent";
// import ProgressBar from "./ProgressBarComponent";

import sassylogo from "../assets/Shredding_Sassy_Logo_-_Purple.png";
import sassyAlone from "../assets/Sassy_Icon_From_Logo.png";
import discButton from "../assets/buttonConnect.png";
import checked from "../assets/paloma.png";

import useWallet from "../hooks/useWallet";
import useNftContract from "../hooks/useNftContract";

TimeAgo.addDefaultLocale(en);

import { ALCHEMY_SETTINGS, NFT_CONTRACT_ADDRESS } from "../config.ts";

function Dashboard({ isLoading, setIsLoading }) {
  const [showLodged, setShowLodged] = useState(false);

  const [nfts, setNfts] = useState([]);
  const [selectedArray, setSelectedArray] = useState([]);
  const { nftContract } = useNftContract();

  const { disconnect, isConnected, address } = useWallet();
  const timeAgo = new TimeAgo("en-US");

  useEffect(() => {
    if (!isConnected) window.location.replace("/");

    fetchUsersNfts(address).then((nfts) => {
      fetchSassyInfo(nfts).then((sassies) => {
        setNfts(sassies);
      });
    });
  }, [isConnected]);

  async function fetchUsersNfts(address) {
    if (!address) return [];

    try {
      const alchemy = new Alchemy(ALCHEMY_SETTINGS);
      const nfts = await alchemy.nft.getNftsForOwner(address, {
        contractAddresses: [NFT_CONTRACT_ADDRESS],
      });
      return nfts.ownedNfts.map(({ tokenId }) => parseInt(tokenId));
    } catch (e) {
      console.error(e);
      toast.error("Unable to fetch tokens. Please try again later");
    }
  }

  async function reloadSassyLodging() {
    if (!nfts || nfts.length < 1) return;
    const sassyLodging = await fetchLodgeState(nfts.map(({ id }) => id));
    const sassies = nfts.map(({ id, imgUrl }, idx) => {
      return {
        id,
        imgUrl,
        lodgeStatus: sassyLodging[idx],
      };
    });
    setNfts(sassies);
  }

  async function fetchSassyInfo(nfts) {
    const sassyImgs = await fetchImages(nfts);
    const sassyLodging = await fetchLodgeState(nfts);
    return sassyImgs.map(({ id, imgUrl }, idx) => {
      return {
        id,
        imgUrl,
        lodgeStatus: sassyLodging[idx],
      };
    });
  }

  async function fetchImages(nfts) {
    const imgPromises = nfts.map((id) => {
      return axios(
        `https://api.opensea.io/asset/0x165bd6e2ae984d9c13d94808e9a6ba2b7348c800/${id}`
      );
    });

    try {
      const res = await Promise.all(imgPromises);
      return res.map(({ data }) => {
        return { id: parseInt(data?.token_id), imgUrl: data?.image_url || "" };
      });
    } catch (e) {
      console.error(e);
      return nfts.map((id) => {
        return {
          id: id,
          imgUrl: `https://ipfs.io/ipfs/QmXbhJxe6rcKWQvTMBSpqEE7ia1CFeWGjQJmHTxWyF3jiU/${id}.png`,
        };
      });
    }
  }

  async function fetchLodgeState(nfts) {
    const lodgingPromises = nfts.map((id) => nftContract.lodgingPeriod(id));
    return await Promise.all(lodgingPromises);
  }

  async function disconnectAccount() {
    window.location.replace("/");
    disconnect();
  }

  const handleSelect = (id) => {
    let tempArray = [...selectedArray];
    if (tempArray.includes(id)) {
      tempArray = tempArray.filter((n) => n != id);
    } else {
      tempArray.push(id);
    }
    setSelectedArray(tempArray);
  };

  function handleToggleShowLodged() {
    setSelectedArray([]);
    setShowLodged(!showLodged);
  }

  return (
    <div className="container-fluid">
      {isConnected ? (
        <>
          <Loading isLoading={isLoading} />
          <div>
            <div className="row align-items-center mt-4 mb-5">
              <div className="col-sm-6 col-12 text-start ps-5">
                <img
                  className="img-fluid sassylogo"
                  src={sassylogo}
                  alt="sassylogo"
                />
              </div>
              <div className="col-sm-6 col-12 text-end pe-5">
                <button className="btn" onClick={disconnectAccount}>
                  <img src={discButton} className="conDis img-fluid" />
                </button>
              </div>
            </div>
            <div className="row sm:m-5 sm:p-5">
              <nav>
                <div
                  className="nav nav-tabs tabs-font"
                  id="nav-tab"
                  role="tablist"
                >
                  <button
                    className="nav-link active"
                    id="lodge-tab"
                    data-bs-toggle="tab"
                    data-bs-target="#lodge"
                    type="button"
                    role="tab"
                    aria-controls="lodge"
                    aria-selected="true"
                  >
                    Lodge
                  </button>
                  {/* <button
                    className="nav-link"
                    id="rewards-tab"
                    data-bs-toggle="tab"
                    data-bs-target="#rewards"
                    type="button"
                    role="tab"
                    aria-controls="rewards"
                    aria-selected="false"
                  >
                    Rewards
                  </button>
                  <button
                    className="nav-link"
                    id="profile-tab"
                    data-bs-toggle="tab"
                    data-bs-target="#profile"
                    type="button"
                    role="tab"
                    aria-controls="profile"
                    aria-selected="false"
                  >
                    My profile
                  </button> */}
                </div>
              </nav>
              <div className="tab-content" id="nav-tabContent">
                <div
                  className="my-5 tab-pane fade show active"
                  id="lodge"
                  role="tabpanel"
                  aria-labelledby="lodge-tab"
                  tabIndex="0"
                >
                  <div className="row">
                    {!nfts || nfts?.length < 1 ? (
                      <div className="flex justify-center">
                        <h1 className="text-center px-8 sm:px-32 pb-4 text-2xl sm:text-4xl max-w-full lg:max-w-[75%] font-['kiddos']">
                          Could not find any Sassies in your wallet. Make sure
                          you have the correct wallet connected and try again.
                        </h1>
                      </div>
                    ) : (
                      nfts
                        .filter(
                          ({ lodgeStatus: [status] }) => status == showLodged
                        )
                        .map(
                          ({
                            id,
                            lodgeStatus: [lodgeStatus, timeSince],
                            imgUrl,
                          }) => {
                            const array = selectedArray || [];
                            const selected = array.includes(id);

                            return (
                              <div
                                key={id}
                                className="col-md-3 col-sm-6 col-12 tabs-font4"
                              >
                                <div className="card border-light">
                                  <img
                                    src={imgUrl}
                                    className="card-img-top img-fluid"
                                    alt={`Shredding Sassy #${id}`}
                                  />
                                  <div className="card-body">
                                    <div className="row idTime align-items-center">
                                      <div className="col-3 whitespace-nowrap">
                                        <p>#{id}</p>
                                      </div>
                                      <div className="col-9 text-end ">
                                        {lodgeStatus ? (
                                          <p>
                                            <FontAwesomeIcon icon={faClock} />{" "}
                                            {timeAgo.format(
                                              Date.now() - timeSince * 13_000
                                            )}
                                          </p>
                                        ) : (
                                          ""
                                        )}
                                      </div>
                                    </div>
                                    <div className="row">
                                      <button
                                        className={
                                          !selected
                                            ? "btn btn-outline-secondary mont-semi2 px-1"
                                            : "btn btn-light selectButton mont-semi2 px-1"
                                        }
                                        onClick={() => handleSelect(id)}
                                      >
                                        Select
                                      </button>
                                    </div>
                                  </div>
                                  <div
                                    className={
                                      selected ? "checked" : "checked d-none"
                                    }
                                  >
                                    <img
                                      src={checked}
                                      className="paloma"
                                      alt={checked}
                                    />
                                  </div>
                                </div>
                              </div>
                            );
                          }
                        )
                    )}
                  </div>

                  <div className="row tabs-font mt-4 px-2">
                    <FirstModal
                      selectedArray={selectedArray}
                      setSelectedArray={setSelectedArray}
                      showLodged={showLodged}
                      handleToggleShowLodged={handleToggleShowLodged}
                      nfts={nfts}
                      reloadUserNfts={reloadSassyLodging}
                      isLoading={isLoading}
                      setIsLoading={setIsLoading}
                    />
                  </div>
                </div>
                {/* <div
                  className="my-5 tab-pane fade"
                  id="rewards"
                  role="tabpanel"
                  aria-labelledby="rewards-tab"
                  tabIndex="1"
                >
                  <h1>Rewards</h1>
                </div>
                <div
                  className="my-5 tab-pane fade"
                  id="profile"
                  role="tabpanel"
                  aria-labelledby="profile-tab"
                  tabIndex="2"
                >
                  <h1>My profile</h1>
                </div> */}
              </div>
            </div>
          </div>
        </>
      ) : (
        <div className="text-center m-5 p-5">
          <div className="m-3">
            <h1 className="tabs-font">You are not connected!!</h1>
          </div>
          <div className="m-3">
            <img src={sassyAlone} alt="sassylogo" className="img-fluid alone" />
          </div>
          <div className="m-3">
            <button className="lodgebuttonError" onClick={disconnectAccount}>
              Go to connect wallet
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Dashboard;
