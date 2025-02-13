import React, { useEffect, useState } from "react";
import SingleNews from "./SingleNews";

const News = () => {
  const timeoutRef = React.useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const data = [
    {
      id: 1,
      thumbnail:
        "https://plus.unsplash.com/premium_photo-1666896899754-56d45421c91c?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NzV8fG5hdHVyZXxlbnwwfDB8MHx8fDA%3D",
      title: "Lorem ipsum dolor sit amet.",
    },
    {
      id: 2,
      thumbnail:
        "https://plus.unsplash.com/premium_photo-1664197368374-605ce8ec8f54?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      title: "Lorem ipsum dolor sit amet.",
    },
    {
      id: 3,
      thumbnail:
        "https://images.unsplash.com/photo-1526470608268-f674ce90ebd4?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fG5ld3N8ZW58MHx8MHx8fDA%3D",
      title: "Lorem ipsum dolor sit amet.",
    },
    {
      id: 4,
      thumbnail:
        "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fG5ld3N8ZW58MHx8MHx8fDA%3D",
      title: "Lorem ipsum dolor sit amet.",
    },
  ];

  function resetTimeout() {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  }

  useEffect(() => {
    resetTimeout();
    timeoutRef.current = setTimeout(
      () =>
        setCurrentIndex((prevIndex) =>
          prevIndex === data?.length - 1 ? 0 : prevIndex + 1
        ),
      2000
    );

    return () => {
      resetTimeout();
    };
  }, [currentIndex]);

  return (
    <>
      <div className="story-item news">
        <div className="news-wrapper">
          <div
            className="slideshowSlider"
            style={{ transform: `translate3d(${-currentIndex * 100}%, 0, 0)` }}
          >
            {data?.map((news) => {
              return (
                <div className="slide">
                <img className="news-thumbnail" src={news.thumbnail} alt="" />
                <div className="info">
                  <div className="content">
                    <h3 className="news-title">{news?.title}</h3>
                    <div className="user-info">
                      <img
                        className="user-img"
                        src={news?.thumbnail}
                        alt=""
                      />
                      <h4 className="username">Iraz Ramin</h4>
                    </div>
                    <p className="posted-date">2 hours ago</p>
                  </div>
                </div>
              </div>
              )
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default News;
