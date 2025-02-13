import React, { useState } from "react";
import "./modal.style.scss";
import { IoIosCloseCircleOutline } from "react-icons/io";
import StorySlider from "../StorySlider";
import like from "../../../../assets/reactions/Like.png"
import love from "../../../../assets/reactions/Love.png"
import angry from "../../../../assets/reactions/Angry.png"
import haha from "../../../../assets/reactions/Haha.png"
import sad from "../../../../assets/reactions/Sad.png"
import wow from "../../../../assets/reactions/Wow.png"

const Modal = ({ openModal, setOpenModal, data }) => {

  const reactionData = [
    {
      id: 1,
      name: "like",
      icon: like
    },
    {
      id: 2,
      name: "haha",
      icon: haha
    },
    {
      id: 3,
      name: "love",
      icon: love
    },
    {
      id: 4,
      name: "sad",
      icon: sad
    },
    {
      id: 5,
      name: "wow",
      icon: wow
    },
    {
      id: 6,
      name: "angry",
      icon: angry
    },

  ]
 

  console.log(data, "<============================= modal");
  
  return (
    <div className={`${openModal ? "open" : "close"} story-modal`}>
      <div>
        <button onClick={() => setOpenModal(false)} className="close-modal">
          <IoIosCloseCircleOutline />
        </button>
      </div>
      <StorySlider data={data} />
      {/* react part */}
      <div className="reaction-reply">
          <form action="#">
              <div className="form-input">
                  <input type="text" placeholder="send reply" />
              </div>
          </form>
          <div className="reaction">
              {reactionData?.map((reaction) => {
                return (
                  <img key={reaction.id} src={reaction.icon} alt="" />
                )
              })}
          </div>
      </div>
    </div>
  );
};

export default Modal;
