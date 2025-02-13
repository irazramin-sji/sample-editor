import React from "react";

const SingleNews = ({ news }) => {
  console.log("data", news);
  return (
    <div className="slide">
      <img className="news-thumbnail" src="" alt="" />
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
  );
};

export default SingleNews;
