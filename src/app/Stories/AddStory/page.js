'use client'
import React, { useEffect, useState } from "react";
import "./style.scss";
import { FaFont, FaTimes } from "react-icons/fa";
import { IoEarthSharp } from "react-icons/io5";
import { MdAddCircle } from "react-icons/md";
import { BsClockHistory } from "react-icons/bs";
import { FiTrash } from "react-icons/fi";
import { FaPlus } from "react-icons/fa";
import { IoPlayCircleOutline } from "react-icons/io5";
import { MdFormatSize } from "react-icons/md";
import { font } from "./utils/font";
import { IoIosColorPalette } from "react-icons/io";
import Dropdown from "../../components/Story/common/Dropdown";
import { fontSize } from "./utils/fontSize";
import PreviewStory from "../../components/Story/PreviewStory";
import { background } from "./utils/background";
import ListDropdown from "../../components/Story/common/ListDropdown";
import { privacyData } from "./utils/privacy";
import { durationData } from "./utils/duration";
import DiscardModal from "../../components/Story/common/DiscardModal";
import Image from "next/image";

const Index = () => {
  const [customFont, setCustomFont] = useState(font[0]);
  const [customFontSize, setCustomFontSize] = useState("16");
  const [textColor, setTextColor] = useState("#000000");
  const [storyText, setStoryText] = useState("");
  const [xAxis, setXAxis] = useState(0);
  const [yAxis, setYAxis] = useState(0);

  const [showListDropdown, setShowListDropdown] = useState({
    privacy: false,
    duration: false,
  });
  const [showDiscardModal, setShowDiscardModal] = useState(false);

  const [privacy, setPrivacy] = useState("");
  const [duration, setHistory] = useState("");
  const [selectedBackground, setSelectedBackground] = useState({
    type: background[0].type,
    value: background[0].value,
  });
  const [activeBackground, setActiveBackground] = useState(0);
  const [activeStory, setActiveStory] = useState(0);
  const [activeText, setActiveText] = useState(-1);

  const [storyBackground, setStoryBackground] = useState(background);

  const [totalStories, setTotalStories] = useState([
    {
      background: {
        type: selectedBackground.type,
        value: selectedBackground.value,
      },
      texts: [],
      duration : '1',
      privacy: 'Public'

    },
  ]);
  const [selectedStory, setSelectedStory] = useState(totalStories[0]);


  const handleAddMoreStory = () => {
    setTotalStories((prevState) => [
      ...prevState,
      {
        background: {
          type: selectedBackground.type,
          value: selectedBackground.value,
        },
        texts: [],
        duration : '1',
        privacy: 'Public'
      },
    ]);
    setStoryText("");
    setActiveText(-1)
  };

  const handleSelectBackground = (item, index) => {
    let updatedValue = [...totalStories];

    updatedValue = updatedValue.map((story, idx) => {
      if (idx === activeStory) {
        story.background.value = item.value;
        story.background.type = item.type;
      }
      return story;
    });

    setTotalStories(updatedValue);
    setActiveBackground(index);
  };

  const handleSelectedStory = (item, index) => {
    setSelectedStory(item);
    setActiveStory(index);
    setStoryText("");
    setActiveText(-1)
  };

  const handleChange = (e) => {
    if (e.target.name === "storyText") {
      setStoryText(e.target.value);
    }

    let updatedValue = [...totalStories];

    updatedValue = updatedValue.map((story, index) => {
      if (index === activeStory) {
        let updateText = [...story.texts];
        updateText = updateText.map((text, index) => {
          if (activeText === index) {
            text[e.target.name] = e.target.value;
          }
          return text;
        });
        story.texts = updateText;
      }
      return story;
    });
    setTotalStories(updatedValue);
  };

  const handleStoryDelete = (index) => {
    const afterDelete = totalStories.filter((item, idx) => index !== idx);
    setTotalStories(afterDelete);
    setSelectedStory(afterDelete[0]);
    setActiveStory(0);
  };

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    console.log(file);
    const convert = URL.createObjectURL(e.target.files[0]);
    setStoryBackground((prevState) => [
      ...prevState,
      { type: file.type, value: convert },
    ]);
  };

  const handleListDropdown = (type) => {
    if (type === "privacy") {
      setShowListDropdown({
        ...showListDropdown,
        privacy: !showListDropdown.privacy,
        duration: false,
      });
    }
    if (type === "duration") {
      setShowListDropdown({
        ...showListDropdown,
        duration: !showListDropdown.duration,
        privacy: false,
      });
    }
  };

  const handleAddTextToStory = () => {
    let updateStories = [...totalStories];

    updateStories = updateStories.map((story, index) => {
      if (index === activeStory) {
        story.texts.push({
          storyText: storyText,
          fontSize: "16",
          font: font[0],
          textColor: "#000000",
          textPositionX: '',
          textPositionY: ''
        });
      }

      return story;
    });
    setStoryText("");
    setActiveText(-1);
    setTotalStories(updateStories);
  };

  const handleClearTextToStory = () => {
      setActiveText(-1);
  }
  
  useEffect(() => {
    if(activeText === -1) {
      setStoryText("")
    }
  }, [activeText]);

  useEffect(() => {
    if(activeText !== -1) {
      setStoryText(totalStories[activeStory]?.texts[activeText]?.storyText)
    }
  }, [totalStories, activeStory, activeText]);

  useEffect(() => {
    console.log("total stories",totalStories);
  }, [totalStories])


  const handleShareToStory = async () => {
    const data = await Promise.all(totalStories.map(async (story) => {
      try {
        if (story.background.type === 'video/mp4') {
          const video = await convertUrlToFile(story.background.value);
          return { ...story, video: video, mediaType: story.background.type };
        } else {
          const image = await convertUrlToFile(story.background.value);
          return { ...story, image: image, mediaType: story.background.type };
        }
      } catch (error) {
        console.error('Error processing story:', error);
        return story;
      }
    }));

    const formData = new FormData();

    data.forEach((item, index) => {
      delete item.background
      formData.append(`media[${index}]`, item.image || item.video);
    });
    formData.append('data', JSON.stringify(data))

    // axios.post(`${BACKEND_URL}/profile/story/create`, formData,
    // {headers: userHeader()})
    // .then((response) => {
    //     if (response.status === 201 || response.status === 200) {
    //         console.log(response)
    //     }
    // })
    // .catch((error) => {
    //     console.log(error)
    // });
  }

  const convertUrlToFile = async (inputUrl) => {
    console.log(inputUrl);
    try {
      const response = await fetch(inputUrl);
      const blob = await response.blob();
  
      // Extract filename from the URL or use a default name
      const filename = inputUrl.split('/').pop() || 'defaultFileName';
  
      // Get the file extension dynamically
      const extension = (blob.type.split('/')[1] || '').toLowerCase();
  
      // Create a File object based on the file type
      let file;
      if (extension === 'jpeg' || extension === 'png' || extension === 'gif' || extension === 'jpg') {
        file = new File([blob], `${filename}.${extension}`, { type: blob.type });
      } else if (extension === 'mp4' || extension === 'webm' || extension === 'ogg') {
        file = new File([blob], `${filename}.${extension}`, { type: blob.type });
      } else {
        console.warn('Unsupported file type:', extension);
        return null; // or handle other file types as needed
      }
  
      return file;
    } catch (error) {
      console.error('Error converting URL to file:', error);
      return null;
    }
  };
  
 
  return (
    <div className="create-story">
      <div className="add-content">
        <div className="header-section">
          <h3>Your Story</h3>
          <div className="option-tools">
            <div className="privacy wrapper">
              <button onClick={() => handleListDropdown("privacy")}>
                <IoEarthSharp />
              </button>
              {showListDropdown.privacy && (
                <div className="dropdown-wrapper">
                  <ListDropdown
                    data={privacyData}
                    dropdownData={privacy}
                    setDropdownData={setPrivacy}
                    showListDropdown={showListDropdown}
                    setShowListDropdown={setShowListDropdown}
                    totalStories={totalStories}
                    setTotalStories={setTotalStories}
                    activeStory={activeStory}
                    type="privacy"
                  />
                </div>
              )}
            </div>
            <div className="duration wrapper">
              <button onClick={() => handleListDropdown("duration")}>
                <BsClockHistory />
              </button>
              {showListDropdown.duration && (
                <div className="dropdown-wrapper">
                  <ListDropdown
                    data={durationData}
                    dropdownData={duration}
                    setDropdownData={setPrivacy}
                    showListDropdown={showListDropdown}
                    setShowListDropdown={setShowListDropdown}
                    totalStories={totalStories}
                    setTotalStories={setTotalStories}
                    activeStory={activeStory}
                    type="duration"
                  />
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="writing-section">
          <textarea
            className="story-text"
            name="storyText"
            placeholder="Start typing"
            cols="30"
            rows="6"
            value={storyText}
            onChange={(e) => handleChange(e)}
          />
          <div className="add-text-btn">
            {activeText !== -1 && storyText !== "" ? (
              <button onClick={() => handleClearTextToStory()}>
                Save
              </button>
            ) : (
              <button onClick={() => handleAddTextToStory()}>
                Add Text
              </button>
            )}
          </div>
        </div>
        <div className="font-section">
          <Dropdown
            data={font}
            selectedData={customFont}
            setSelectedData={setCustomFont}
            Icon={FaFont}
            type="font"
            activeStory={activeStory}
            totalStories={totalStories}
            setTotalStories={setTotalStories}
            activeText={activeText}
          />
        </div>
        <div className="font-size-section">
          <Dropdown
            data={fontSize}
            setSelectedData={setCustomFontSize}
            selectedData={customFontSize}
            Icon={MdFormatSize}
            type="fontSize"
            activeStory={activeStory}
            totalStories={totalStories}
            setTotalStories={setTotalStories}
            activeText={activeText}
          />
          <div className="font-color">
            <IoIosColorPalette className="icon" />
            <input
              onChange={(e) => handleChange(e)}
              type="color"
              name="textColor"
            />
          </div>
        </div>

        <div className="background-color-section">
          <p>Background</p>
          <div className="background-item">
            <ul>
              {storyBackground.map((item, index) => {
                return (
                  <div key={index}>
                    <li
                      key={index}
                      className={`${
                        activeBackground === index ? "active" : ""
                      }`}
                      onClick={() => handleSelectBackground(item, index)}
                    >
                      {item.type === "video/mp4" ? (
                        <p>
                          <IoPlayCircleOutline />
                        </p>
                      ) : (
                        <Image src={item.value} alt="" width={100} height={100} />
                      )}
                    </li>
                  </div>
                );
              })}
              <li>
                <label htmlFor="addImage" className="image-label">
                  <FaPlus className="icon" />
                  <input
                    onChange={(e) => handleFileSelect(e)}
                    type="file"
                    className="add-image"
                    name="addImage"
                  />
                </label>
              </li>
            </ul>
          </div>
        </div>

        <div className="total-story">
          <p>Stories</p>
          <div className="created-stories">
            {totalStories?.map((story, index) => {
              return (
                <div key={index} className={`story`}>
                  {story?.background?.type === "video/mp4" ? (
                    // <p
                    //   onClick={() => handleSelectedStory(story, index)}
                    //   className={`${activeStory === index ? "active" : ""}`}
                    // >
                    //   <IoPlayCircleOutline />
                    // </p>

                    <video
                      onClick={() => handleSelectedStory(story, index)}
                      className={`${activeStory === index ? "active" : ""}`}
                      controls={false}
                      muted
                    >
                      <source src={story?.background.value} type="video/mp4" />
                    </video>
                  ) : (
                    <Image
                      onClick={() => handleSelectedStory(story, index)}
                      className={`${activeStory === index ? "active" : ""}`}
                      src={story?.background.value}
                      alt=""
                      width={100}
                      height={100}
                    />
                  )}

                  <button
                    className={`${index === 0 ? "hide" : ""} delete-story`}
                    onClick={() => handleStoryDelete(index)}
                    disabled={index === 0}
                  >
                    <FiTrash />
                  </button>
                </div>
              );
            })}
            <button className="add-more" onClick={handleAddMoreStory}>
              <MdAddCircle />
            </button>
          </div>
        </div>

        <div className="action-btn">
          <button className="discard" onClick={() => setShowDiscardModal(true)}>
            Discard
          </button>
          <button className="share" onClick={handleShareToStory}>Share to story</button>
        </div>
        {showDiscardModal && (
          <DiscardModal
            setShowDiscardModal={setShowDiscardModal}
            showDiscardModal={showDiscardModal}
          />
        )}
      </div>
      <div className="preview-story">
        <PreviewStory
          selectedStory={selectedStory}
          setXAxis={setXAxis}
          xAxis={xAxis}
          setYAxis={setYAxis}
          yAxis={yAxis}
          activeText={activeText}
          totalStories={totalStories}
          setTotalStories={setTotalStories}
          setStoryText={setStoryText}
          setActiveText={setActiveText}
          activeStory={activeStory}
        />
      </div>
    </div>
  );
};

export default Index;
