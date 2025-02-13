import React, { useState } from "react";
import story from "../../../assets/story/story.png";
import { IoAddCircle } from "react-icons/io5";
import Modal from "../common/Modal";
import PreviewSlider from "../common/PreviewSlider";
import { useHistory } from 'react-router-dom';

const Stories = ({ data }) => {
  const [openModal, setOpenModal] = useState(false);
  const [storyData, setStoryData] = useState([]);
  const history = useHistory();
  const OWN = 'own';
  const OTHER = 'other';

  const handleOpenStory = (type) => {
    if(type === OWN) {
      setOpenModal(true);
      console.log("sdfasdfasdfw",data?.data?.myStories)
      setStoryData(data?.data?.myStories);
    }
    if(type === OTHER) {
      setOpenModal(true);
      setStoryData(data?.data?.friendsStories)
    }
  };

  const handleAddStory = () => {
    history.push('/stories/create');
  }
  return (
    <>
      <div className="story-item">
        <div className="inside-item">
          <div className="add-item add-new-story" onClick={handleAddStory}>
            <IoAddCircle className="icon" />
            <p>Create Story</p>
          </div>

          <div
            onClick={() => handleOpenStory("own")}
            className="added-items added-story own-item"
          >
            <PreviewSlider data={data?.data?.myStories} />
            <div className="info">
              <h4>Iraz Ramin</h4>
            </div>
          </div>
          <div 
           onClick={() => handleOpenStory("other")}
          className="added-items added-story other-item">
            <PreviewSlider data={data?.data?.friendsStories} />
            <div className="info">
              <h4>Iraz Ramin</h4>
            </div>
          </div>
        </div>
        {openModal && (
          <Modal
            openModal={openModal}
            setOpenModal={setOpenModal}
            data={storyData}
          />
        )}
      </div>
    </>
  );
};

export default Stories;
