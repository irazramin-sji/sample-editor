import React, {useState} from 'react';
import {IoMdArrowDropdown} from "react-icons/io";

const Index = ({data, activeText, setSelectedData, selectedData, Icon, type, activeStory, setTotalStories, totalStories}) => {
    const [showDropdown, setShowDropdown] = useState(false);

    const handleDropdown = () => {
        setShowDropdown(!showDropdown);
    }

    const handleSelectDropdownItem = (item) => {
    
        setShowDropdown(!showDropdown);
        setShowDropdown(!showDropdown);
       
        let updatedValue = [...totalStories];

        updatedValue = updatedValue.map((story, index) => {
          if (index === activeStory) {
            let updateText = [...story.texts];
            updateText = updateText.map((text, index) => {
              if (activeText === index) {
                text[type] = item;
                setSelectedData(item)
              }
              return text;
            });
            story.texts = updateText;
          }
          return story;
        });
        setTotalStories(updatedValue);
    }

    return (
        <div className="relative w-full">
            <div 
                className="p-3 rounded border border-[#e4e4e4] flex items-center justify-between cursor-pointer text-[17px] select-none transition-all duration-300 ease-in-out hover:border-[var(--default-color)]" 
                onClick={() => handleDropdown()}
            >
                <div className="flex items-center gap-[15px]">
                    <Icon />
                    <p className="capitalize">{selectedData}</p>
                </div>
                <IoMdArrowDropdown />
            </div>
            {showDropdown && (
                <div className="p-[10px] shadow-[1px_2px_8px_rgba(0,0,0,0.1)] rounded absolute top-full left-0 w-full bg-white z-10">
                    <ul className="w-full list-none">
                        {data.map((name, index) => (
                            <li 
                                key={index} 
                                className="w-full p-[3px] select-none cursor-pointer rounded hover:bg-[#e4e4e4]"
                                onClick={() => handleSelectDropdownItem(name)}
                            >
                                {name}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default Index;