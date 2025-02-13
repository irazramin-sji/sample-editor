import React, { useState } from "react";
import { getUrl } from './../../../../shared/functions/index';

const PreviewSlider = ({data}) => {
    const timeoutRef = React.useRef(null);
    const [currentIndex, setCurrentIndex] = useState(0);

  function resetTimeout() {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  }

  React.useEffect(() => {
    resetTimeout();
    timeoutRef.current = setTimeout(
      () =>
        // setCurrentIndex((prevIndex) =>
        //   prevIndex === data?.length - 1 ? 0 : prevIndex + 1
        // ),
      2000
    );

    return () => {
      resetTimeout();
    };
  }, [currentIndex, data?.length]);
  
  return (
    <div
      className="slideshowSlider"
      style={{ transform: `translate3d(${-currentIndex * 100}%, 0, 0)` }}
    >
      {data?.map((item, index) => (
        <div className="slide" key={index}>
            {item?.mediaType !== 'video/mp4' ?  (
              <img src={getUrl(item?.imageLink, item?.user?.username)} alt="" />
            ) : (
              <video
              width="320"
              height="240"
              controls={false}
              autoPlay
            >
              <source
                src={getUrl(item?.imageLink, item?.user?.username)}
                type="video/mp4"
              />
            </video>
            )}
        </div>
      ))}
    </div>
  );
};

export default PreviewSlider;
