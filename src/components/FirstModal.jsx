import React, { useState } from "react";
import { toast } from "react-toastify";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

import TermsConditionsComponent from "./TermsConditionsComponent";
import sassyAlone from "../assets/Sassy_Icon_From_Logo.png";

import useNftContract from "../hooks/useNftContract";
import { MESSAGES } from "../config";

function FirstModal({
  selectedArray,
  setSelectedArray,
  showLodged,
  handleToggleShowLodged,
  nfts,
  reloadUserNfts,
  isLoading,
  setIsLoading,
}) {
  const [show, setShow] = useState(false);

  const [isDisabled, setIsDisabled] = useState(true);
  const [checked, setChecked] = useState(false);

  const { nftContract } = useNftContract();

  const handleClose = () => setShow(false);
  const handleShow = () => {
    setShow(true);
    setChecked(false);
    setIsDisabled(true);
  };

  const canBeSubmitted = () => {
    return checked ? setIsDisabled(true) : setIsDisabled(false);
  };

  const onCheckboxClick = () => {
    setChecked(!checked);
    return canBeSubmitted();
  };

  async function handleTCButtonClick() {
    if (showLodged) {
      await handleLodging();
    } else {
      handleShow();
    }
  }

  async function handleLodging() {
    if (
      !selectedArray ||
      selectedArray.length < 1 ||
      !selectedArray.some((i) => Number.isInteger(i))
    ) {
      setChecked(false);
      setIsDisabled(true);
      handleClose();
      handleToggleShowLodged();
      window.alert("No Sassy selected!");
    }

    const ids = nfts
      .filter((_, idx) => {
        const array = selectedArray || [];
        return array.includes(idx);
      })
      .map(({ id }) => id);

    await _trySassyLodge(ids);
    // await fakePromise();
  }

  async function fakePromise() {
    setIsLoading(true);
    try {
      await new Promise((resolve) => {
        setTimeout(() => {
          resolve("Creating your Lodge, Don't close this window");
        }, 5000);
      });

      setIsLoading(false);
      setSelectedArray([]);
      handleClose();
    } catch (_) {
      setIsLoading(false);
      setSelectedArray([]);
      handleClose();
    }
  }

  async function _trySassyLodge(ids) {
    setIsLoading(true);
    try {
      const tx = await nftContract.toggleLodging(ids);
      await tx.wait();

      await reloadUserNfts();
      toast.success(
        `Sassy successfully ${showLodged ? "unlodged" : "lodged"}!`
      );

      setIsLoading(false);
      setSelectedArray([]);
      handleClose();
    } catch (error) {
      console.error(error);

      const errorCode =
        error?.reason?.split(/:(.*)/s)[1]?.trim() || error?.code;
      if (errorCode == "Sassy: Lodging Closed!") {
        toast.error("Lodging is not open yet!");
      } else if (errorCode && MESSAGES[`mint.error.${errorCode}`]) {
        toast.error(MESSAGES[`mint.error.${errorCode}`]);
      } else {
        toast.error(MESSAGES["mint.error.DEFAULT"]);
      }

      setIsLoading(false);
      setSelectedArray([]);
      handleClose();
    }
  }

  return (
    <>
      <div className="flex place-content-center">
        <Form
          onChange={handleToggleShowLodged}
          style={{
            cursor:
              selectedArray && selectedArray.some((n) => !!n)
                ? "pointer"
                : "auto",
          }}
          className="bg-[#230842] w-full justify-evenly rounded-3xl font-['kiddos'] text-white text-[35px] flex p-2 px-4"
        >
          <Form.Check type="switch" />

          <Button
            className="lodgebutton pr-8 flex-grow text-xl sm:text-4xl border-none hover:bg-bg-blue-700"
            style={{
              cursor:
                !selectedArray || selectedArray.every((n) => n == undefined)
                  ? "auto"
                  : "pointer",
            }}
            disabled={
              !selectedArray || selectedArray.every((n) => n == undefined)
            }
            variant="primary"
            type="button"
            onClick={handleTCButtonClick}
          >
            {showLodged ? "Unlodge your Sassy!" : "Lodge your Sassy!"}
          </Button>
        </Form>
      </div>

      <Modal
        scrollable={true}
        show={show}
        onHide={handleClose}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Body className="text-center mt-4">
          <img
            src={sassyAlone}
            alt="sassyAlone"
            className="img-fluid sassyAlonemodal1"
          />
          <p className="tabs-font2">
            {showLodged ? "Unlodge your Sassy!" : "Lodge your Sassy"}
          </p>
          <div className="text-start px-4">
            <p className="mont-light">
              While your Sassy is lodging, you won’t be able to sell it on
              marketplaces such as Opensea or our own. To do this, you’ll need
              to un-lodge your Sassy on this website first. You will be able to
              list your Sassy on a marketplace BUT it will not be able to be
              sold whilst it is lodging. To prevent confusion if we detect you
              have listed your Sassy on a marketplace, we reserve the right to
              remove it from the lodge. When a Sassy is removed from the lodge,
              the timer will reset and revert to zero.
            </p>
            <p className="mont-light">
              Full terms and condition{" "}
              <span>
                <TermsConditionsComponent />
              </span>
            </p>
            <div className="form-check mb-4">
              <input
                className="form-check-input"
                type="checkbox"
                onClick={onCheckboxClick}
                id="checkTerms"
              />
              <label className="form-check-label purple" htmlFor="checkTerms">
                I have read the above and agree
              </label>
            </div>
            <div className="row mb-3">
              <Button
                className="lodgebutton"
                disabled={isDisabled}
                variant="primary"
                onClick={handleLodging}
              >
                {showLodged ? "Lets unlodge" : "Lets lodge"}
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default FirstModal;
