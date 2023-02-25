import React from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import sassyAlone from "../assets/Sassy_Icon_From_Logo.png";
import { Link } from "react-router-dom";

function MyVerticallyCenteredModal(props) {
  return (
    <Modal
      scrollable={true}
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Body className="text-center mt-5">
        <img
          src={sassyAlone}
          alt="sassyAlone"
          className="img-fluid sassyAlonemodal1"
        />
        <p className="tabs-font2">Lodging your Sassy!</p>
        <div className="text-start px-4">
          <p className="mont-light">
            Lodging of your Shredding Sassy NFT is at your election and, without
            limiting anything else in these Terms, is subject to the following:
          </p>
          <br />
          <p className="mont-light">
            Lodging of a Shredding Sassy NFT is at your own risk, and we accept
            no responsibility for smart contract risk.
          </p>

          <br />
          <p className="mont-light">
            Lodging and un-lodging of a Shredding Sassy NFT happens on (domain
            url).
          </p>

          <br />
          <p className="mont-light">
            We reserve the right to unlodge your Shredding Sassy NFT if it is
            listed for sale or in the event that your Shredding Sassy NFT, or
            any interest in your Shredding Sassy NFT, is transferred.
          </p>

          <br />
          <p className="mont-light">
            We are not responsible for attacks or transfers that occur when
            using third party Lodging or other staking websites. You are aware
            that you are using this Lodging functionality and the Site fully at
            your own risk.
          </p>

          <br />
          <p className="mont-light">
            The nature of digital assets may lead to an increased risk of fraud
            or cyberattacks and any losses due to fraudulent or accidental
            transactions will likely not be recoverable.
          </p>

          <br />
          <p className="mont-light">
            In the event that you lose your Lodging rewards, if your Lodging
            rewards are stolen, or if we determine to unlodge your Shredding
            Sassy NFT or remove you from the lodge for any reason, you will have
            no right to any payment or other consideration for any such lodging
            rewards.
          </p>
          <br />
          <p className="mont-light">
            We will only offer rewards for Lodging that is initiated and occurs
            through
            <a
              href="https://shreddingsassy.com"
              rel="noreferrer"
              target={"_blank"}
            >
              {" "}
              shreddingsassy.com
            </a>
          </p>
          <br />
          <p className="mont-light">
            Sassy Labs will only support lodging rewards earned through our
            website, and we undertake no responsibility to support or honor
            rewards that may be earned on or through other sites or service
            providers.
          </p>
          <br />
          <p className="mont-light">
            Lodging benefits and rewards, both physical and digital may be
            revoked for any reason at any time. We may be forced to suspend,
            discontinue, terminate or change aspects of nesting in any
            jurisdiction, without notice, if demanded by regulatory or
            applicable law or for whatever other reason. In such a case, your
            Shredding Sassy NFT could be frozen for an indefinite period of time
            until the matter is resolved or we may terminate any such features
            or eliminate certain rewards.
          </p>
          <br />
          <p className="mont-light">
            If you intend to sell your Shredding Sassy NFT, please come back and
            unlodge it at any time - there is no lockup period. Once unlodged,
            it will be free to sell.
          </p>
          <br />
          <p className="mont-light">
            This section is not exhaustive and does not disclose all the risks
            associated with lodging your Shredding Sassy NFT.
          </p>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <div className="row">
          <Button
            className="lodgebutton"
            onClick={props.onHide}
            variant="primary"
          >
            Return to Lodge
          </Button>
        </div>
      </Modal.Footer>
    </Modal>
  );
}

function TermsConditionsComponent() {
  const [modalShow, setModalShow] = React.useState(false);

  return (
    <>
      <button
        className="tabs-font3"
        style={{
          background: "none",
          border: "none",
          textDecoration: "underline",
        }}
        variant="primary"
        onClick={() => setModalShow(true)}
      >
        here
      </button>

      <MyVerticallyCenteredModal
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
    </>
  );
}

export default TermsConditionsComponent;
