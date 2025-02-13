import React, { useState } from "react";
import { IoAddCircle } from "react-icons/io5";
import PreviewSlider from "../common/PreviewSlider";
import Modal from "../common/Modal";

const Reels = ({ data }) => {

  const [openModal, setOpenModal] = useState(false);
  const [reelsData, setReelsData] = useState([]);

  const OWN = 'own';
  const OTHER = 'other';

  const handleOpenReels = (type) => {
    if(type === OWN) {
      setOpenModal(true);
      console.log("sdfasdfasdfw",data.slice(0, 3))
      setReelsData(data.slice(0,3));
    }
    if(type === OTHER) {
      setOpenModal(true);
      setReelsData([...data])
    }
  };

  return (
    <>
      <div className="story-item">
        <div className="inside-item">
          <div className="add-item add-new-reel">
            <IoAddCircle className="icon" />
            <p>Create Reel</p>
          </div>
          <div 
          onClick={() => handleOpenReels("own")}
          className="added-items added-reel own-item">
            {/* <PreviewSlider data={data} /> */}
            <div className="info">
              <h4>Iraz Ramin</h4>
            </div>
          </div>
          <div 
           onClick={() => handleOpenReels("other")}
          className="added-items added-reel other-item">
            {/* <PreviewSlider data={data} /> */}
            <div className="info">
              <h4>Iraz Ramin</h4>
            </div>
          </div>
        </div>
        {openModal && (
          <Modal
            openModal={openModal}
            setOpenModal={setOpenModal}
            data={reelsData}
          />
        )}
      </div>
    </>
  );
};

export default Reels;
