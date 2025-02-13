import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import "./slider.style.scss";
import { IoChevronBackSharp, IoChevronForwardSharp } from "react-icons/io5";
import { getRatioBasedValue } from "../../../../shared/functions/getRatioBasedValue";
import { getUrl } from "../../../../shared/functions";
const StorySlider = ({ data }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const PREV = "prev";
  const NEXT = "next";
  const sliderRef = useRef(null);
  const sliderContainerRef = useRef(null);
  const [containerHeight, setContainerHeight] = useState(0);

  const [layerOneImage, setLayerOneImage] = useState();
  const [layerTowImage, setLayerTwoImage] = useState();

  console.log("slider", data);

  const debounce = (func, delay) => {
    let timeoutId;

    return function (...args) {
      clearTimeout(timeoutId);

      timeoutId = setTimeout(() => {
        func.apply(this, args);
      }, delay);
    };
  };

  const handleSlider = debounce((type) => {
    //  change current index 1 to 0
    // next it may change like campaign
    if (data?.length > 1) {
      if (type === NEXT) {
        setCurrentIndex((prevIndex) => {
          if (prevIndex === 0) {
            sliderRef.current.style.transition = `none`;
            return data.length - 1;
          } else {
            sliderRef.current.style.transition = `100ms ease-out`;
            return prevIndex - 1;
          }
        });
      }
      if (type === PREV) {
        setCurrentIndex((prevIndex) => {
          if (prevIndex === data.length - 1) {
            sliderRef.current.style.transition = `none`;
            return 0;
          } else {
            sliderRef.current.style.transition = `100ms ease-out`;
            return prevIndex + 1;
          }
        });
      }
    }
  });

  useLayoutEffect(() => {
    const divHeightInPixels = sliderContainerRef.current.clientHeight;

    const parentHeightInPixels =
      sliderContainerRef.current.parentElement.offsetHeight;

    const divHeightPercentage =
      (divHeightInPixels / parentHeightInPixels) * 100;
    setContainerHeight(Math.floor(divHeightPercentage));
  }, [sliderContainerRef]);

  useEffect(() => {
    if (data.length === 1) {
      setLayerOneImage(data);
      setLayerTwoImage(data);
    }
    if (data.length === 2) {
      setLayerOneImage(data[1]);
      setLayerTwoImage(data[1]);
    }
    if (data.length === 3) {
      setLayerOneImage(data[1]);
      setLayerTwoImage(data[2]);
    }
    if (data.length > 3) {
      setLayerOneImage(data[2]);
      setLayerTwoImage(data[3]);
    }
  }, [data]);

  // style={{ backgroundImage: `url('${data[2]}')`, backgroundRepeat: "no-repeat", backgroundSize: "cover" }}
  return (
    <div className="story-slider-wrapper">
      <div className="layer-1">
        <img src={layerOneImage} alt="" />
      </div>
      <div className="layer-2">
        <img src={layerTowImage} alt="" />
      </div>
      <div
        className="story-slider-container"
        ref={sliderContainerRef}
        style={{
          width: `${containerHeight && getRatioBasedValue(containerHeight)}%`,
        }}
      >
        <div className="slideshow">
          <div
            className="slideshowSlider"
            ref={sliderRef}
            style={{
              transform: `translate3d(${-currentIndex * 100}%, 0, 0)`,
            }}
          >
            {data.map((item, index) => (
              <div className="slide" key={index}>
                {item?.mediaType !== "video/mp4" ? (
                  <img
                    src={getUrl(item?.imageLink, item?.user?.username)}
                    alt=""
                  />
                ) : (
                  <video width="320" height="240" controls={false} autoPlay>
                    <source
                      src={getUrl(item?.imageLink, item?.user?.username)}
                      
                      type="video/mp4"
                    />
                  </video>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="slider-control">
        <div className="btn prev-btn" onClick={() => handleSlider("next")}>
          <IoChevronBackSharp />
        </div>
        <div className="btn next-btn" onClick={() => handleSlider("prev")}>
          <IoChevronForwardSharp />
        </div>
      </div>
    </div>
  );
};

export default StorySlider;
