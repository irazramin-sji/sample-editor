import React from 'react'
import "./list-dropdown.style.scss"

const ListDropdown = ({ data, dropdownData, setDropdownData, showListDropdown, setShowListDropdown, type, totalStories, setTotalStories, activeStory }) => {
    
    const handleAddDropdownData = (item, index) => {
        if(type === 'privacy') {
            setDropdownData(item);
            setShowListDropdown((prevState) => {
                return {...prevState, privacy: false}
            });

            let updatedValue = [...totalStories];

            updatedValue = updatedValue.map((story, storyIndex) => {
                if(activeStory === storyIndex) {
                    story.privacy = item.name
                }
              return story
            })
        
            setTotalStories(updatedValue);
        }
        if(type === 'duration') {
            setDropdownData(item);
            setShowListDropdown((prevState) => {
                return {...prevState, duration: false}
            });

            
            let updatedValue = [...totalStories];

            updatedValue = updatedValue.map((story, storyIndex) => {
                if(activeStory === storyIndex) {

                    story.duration = getFutureDate(item.value)
                    console.log("future date: ", getFutureDate(item.value))
                }
              return story
            })
        
            setTotalStories(updatedValue);
        }
    }

    function getFutureDate(days) {
        const currentDate = new Date();
        const futureDate = new Date(currentDate);
        futureDate.setDate(currentDate.getDate() + days);
      
        return futureDate;
      }

    return (
    <div className='list-dropdown'>
        <ul className='list-items'>
            {data.map((item, index) => {
                return (
                    <li key={index} onClick={() => handleAddDropdownData(item, index)}> 
                        <div className='icon'>
                            <item.Icon />
                        </div>
                        <p>{item.name}</p>
                    </li>
                )
            })}
        </ul>
    </div>
  )
}

export default ListDropdown