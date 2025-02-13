import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import "./style.scss";
import { getRatioBasedValue } from "../../../_utils/getRatioBasedValue";
import { FaPlayCircle } from "react-icons/fa";
import { FaPauseCircle } from "react-icons/fa";
import Image from "next/image";

const Index = ({
  selectedStory,
  xAxis,
  setXAxis,
  yAxis,
  setYAxis,
  setActiveText,
  activeText,
  setStoryText,
  totalStories,
  setTotalStories,
  activeStory,
}) => {
  const previewStoryRef = useRef();
  const textRef = useRef({});
  const [isDrag, setIsDrag] = useState(false);
  const videoRef = useRef();
  const [isPlay, setIsPlay] = useState(true);
  const [containerHeight, setContainerHeight] = useState(0);
  const [showControlBtn, setShowControlBtn] = useState(false);
  const [render, setRender] = useState(false);

  useLayoutEffect(() => {
    const divHeightInPixels = previewStoryRef?.current?.clientHeight;

    const parentHeightInPixels =
      previewStoryRef?.current?.parentElement?.offsetHeight;

    const divHeightPercentage =
      (divHeightInPixels / parentHeightInPixels) * 100;
    setContainerHeight(Math.floor(divHeightPercentage));
  }, [previewStoryRef]);

  const handleMouseDown = (e, index) => {
    console.log(textRef);
    if (activeText === index) {
      e.preventDefault();

      setActiveText(index);
      setIsDrag(true);
      setXAxis(e.pageX);
      setYAxis(e.pageY);
    }
  };

  const handleMouseMove = (e, index) => {
    if (!isDrag) return false;
    const dx = e.pageX - xAxis;
    const dy = e.pageY - yAxis;

    textRef.current[index].style.top = `${
      textRef.current[index].offsetTop + dy
    }px`;
    textRef.current[index].style.left = `${
      textRef.current[index].offsetLeft + dx
    }px`;

    let updatedValue = [...totalStories];

    updatedValue = updatedValue.map((story, storyIndex) => {
      let updateText = [...story.texts];
      updateText = updateText.map((text, textIndex) => {
        if (activeText === textIndex) {
          text.textPositionX = textRef.current[textIndex].offsetLeft + dx;
          text.textPositionY = textRef.current[textIndex].offsetTop + dy;
        }
        return text;
      });
      
      if(storyIndex === activeStory) {
        story.texts = updateText;
      }
      return story;
    });
    setTotalStories(updatedValue);

    setXAxis(e.pageX);
    setYAxis(e.pageY);
  };

  const handleMouseUp = (e) => {
    setIsDrag(false);
  };

  const handleVideoControl = (type) => {
    if (type === "play") {
      videoRef?.current.pause();
      setIsPlay(false);
    }
    if (type === "pause") {
      videoRef?.current.play();
      setIsPlay(true);
    }
  };

  const handleSelectedText = (index) => {
    setActiveText(index);
  };

  const handleDeleteSelectedText = (index) => {

    console.log(activeText, activeStory);
    let updatedValue = [...totalStories];

    updatedValue = updatedValue.map((story, storyIdx) => {
      const filterStoryText = story.texts.filter(
        (text, textIdx) => index !== textIdx
      ); 
      
      if(activeStory === storyIdx) {
        story.texts = filterStoryText;
      }
      return story;
    });

    setTotalStories(updatedValue);

    if (activeText === index) {
      setRender(!render);
      setStoryText("");
    }
  };

  useEffect(() => {
    setActiveText(-1);
  }, [render]);

  return (
    <div className="w-[70%] h-[90%] bg-transparent border-[15px] border-white rounded-[10px] flex items-center justify-center">
      <div
        className="bg-[#1057c8] h-[90%] rounded-[10px] relative m-5 select-none"
        ref={previewStoryRef}
        style={{
          width: `${containerHeight && getRatioBasedValue(containerHeight)}%`,
        }}
      >
        <div className="w-full h-full relative overflow-hidden">
          {selectedStory?.background?.type === "video/mp4" ? (
            <div
              className="w-full h-full"
              onMouseOver={() => setShowControlBtn(true)}
              onMouseLeave={() => setShowControlBtn(false)}
            >
              <video
                ref={videoRef}
                width="320"
                height="240"
                controls={false}
                autoPlay
                className="w-full h-full object-cover select-none cursor-pointer"
              >
                <source
                  src={selectedStory?.background.value}
                  type="video/mp4"
                />
              </video>
              <div className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center ${showControlBtn ? 'block' : 'hidden'}`}>
                {isPlay ? (
                  <button
                    className="border-0 bg-transparent text-[60px] opacity-40 outline-none shadow-none active:border-0 active:outline-none"
                    onClick={() => handleVideoControl("play")}
                  >
                    <FaPauseCircle />
                  </button>
                ) : (
                  <button
                    className="border-0 bg-transparent text-[60px] opacity-40 outline-none shadow-none active:border-0 active:outline-none"
                    onClick={() => handleVideoControl("pause")}
                  >
                    <FaPlayCircle />
                  </button>
                )}
              </div>
            </div>
          ) : (
            <Image src={selectedStory?.background.value} alt="" width={100} height={100} className="w-full h-full object-cover select-none" />
          )}

          {selectedStory.texts.map((text, index) => {
            return (
              <p
                key={index}
                className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 select-none break-words cursor-pointer max-w-[70%] p-[3px] text-[#222] ${
                  activeText === index ? 'border border-white' : ''
                }`}
                ref={(element) => (textRef.current[index] = element)}
                onMouseDown={(e) => handleMouseDown(e, index)}
                onMouseMove={(e) => handleMouseMove(e, index)}
                onMouseUp={handleMouseUp}
                onClick={() => handleSelectedText(index)}
                style={{
                  fontSize: `${text?.fontSize}px`,
                  color: text?.textColor,
                  fontFamily: text?.font,
                }}
              >
                {text?.storyText}
                <span
                  onClick={() => handleDeleteSelectedText(activeText)}
                  className={`absolute w-5 h-5 bg-[#222] rounded-full text-white flex justify-center -top-[10px] -left-[10px] text-xs ${activeText === index ? 'opacity-100' : 'opacity-0'}`}
                >
                  &times;
                </span>
              </p>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Index;
