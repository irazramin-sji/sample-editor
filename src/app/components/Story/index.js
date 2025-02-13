import React from "react";
import "./style.scss";
import user from "../../assets/home/User.png";
import Stories from "./Stories";
import Reels from "./Reels";
import News from "./News";
import Modal from "./common/Modal";
import { getStories } from "../../pages/Stories/Hooks";

const Story = () => {
  const data = [
        "https://images.unsplash.com/photo-1587579531524-f31144f0cb85?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxjb2xsZWN0aW9uLXBhZ2V8OHwyNDg0NzIyfHxlbnwwfHx8fHw%3D",
        "https://images.unsplash.com/photo-1578458329607-534298aebc4d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxjb2xsZWN0aW9uLXBhZ2V8MTd8MjQ4NDcyMnx8ZW58MHx8fHx8",
        "https://images.unsplash.com/photo-1673460243744-3de0b7c6acd4?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxjb2xsZWN0aW9uLXBhZ2V8MTZ8MjQ4NDcyMnx8ZW58MHx8fHx8",
        "https://images.unsplash.com/photo-1587579531524-f31144f0cb85?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxjb2xsZWN0aW9uLXBhZ2V8OHwyNDg0NzIyfHxlbnwwfHx8fHw%3D",
  ];

  const reelsData = [
    "https://images.unsplash.com/photo-1536009282123-37ba63756c6b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8cmVlbHN8ZW58MHwxfDB8fHww",
    "https://images.unsplash.com/photo-1629293403472-3c468f54da07?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mjd8fHJlZWxzfGVufDB8MXwwfHx8MA%3D%3D",
    "https://images.unsplash.com/photo-1643885589803-afa5fe920d52?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzZ8fHJlZWxzfGVufDB8MXwwfHx8MA%3D%3D",
    "https://images.unsplash.com/photo-1616348857217-6de7e26cbd03?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzV8fHJlZWxzfGVufDB8MXwwfHx8MA%3D%3D"
  ]

  const {stories} = getStories();
  

  return (
    <div className="story-wrapper">
      <div className="stories">
        <h4 className="story-title">Stories</h4>
        <Stories data={stories} />
      </div>

      <div className="reels">
      <h4 className="story-title">Reels</h4>
        <Reels data={reelsData} />
      </div>

      <div className="news">
      <h4 className="story-title">News</h4>
        <News />
      </div>

    </div>
  );
};

export default Story;
