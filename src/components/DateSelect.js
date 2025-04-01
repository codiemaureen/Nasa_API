import { useState, useEffect } from "react";
import '../style/dateselect.css'
import Spinner from "./Spinner";

  const DateSelect = () => {
    const today = new Date();

    const day = today.getDate();
    const month = (today.getMonth() + 1).toString().padStart(2, "0"); // Month is 0-indexed
    const year = today.getFullYear();
    const customFormattedDate = `${year}-${month}-${day}`;
    console.log(customFormattedDate);
    const [isLoading, setIsLoading] = useState(false);
    const [isImageVisible, setIsImageVisible] = useState(false);
    const [isVideoVisible, setIsVideoVisible] = useState(false);
    const [photoUrl, setPhotoUrl] = useState("");
    const [videoUrl, setVideoUrl] = useState("");
    const [photoDesc, setPhotoDesc] = useState("");
    const [selectedDate, setSelectedDate] = useState(customFormattedDate);

const handleDateChange = async(event) => {
  setSelectedDate(event.target.value);
}

const getPhotoUrl = async() => {
  setIsLoading(true);
  setIsImageVisible(false) 
  setIsVideoVisible(false)   
  const url = `https://api.nasa.gov/planetary/apod?api_key=cW3MjyR23t5ybWlIRARhHdvE0pohUf0SXUO1gYuM&date=${selectedDate}`
  await fetch(url)
      .then(res => 
        res.json()) // parse response as JSON

      .then(data => {
        if(data.media_type === 'image'){
          setIsLoading(false)
          setPhotoUrl(data.hdurl)  
          setIsImageVisible(true) 
          setIsVideoVisible(false)    
        } else if(data.media_type === 'video'){
          setIsLoading(false)
          setVideoUrl(data.url)
          setIsImageVisible(false)
          setIsVideoVisible(true)
        }
      })
  getPhotoDesc()
}

useEffect(() => {
  getPhotoUrl();
}, []);

const getPhotoDesc = async() => {
    const url = `https://api.nasa.gov/planetary/apod?api_key=cW3MjyR23t5ybWlIRARhHdvE0pohUf0SXUO1gYuM&date=${selectedDate}`
    await fetch (url)
      .then(res => res.json())
      .then(data => {
        setPhotoDesc(data.explanation)
    })
}



return(
    <section className="potdContainer">
      <div className="date-select">
        <p className="potd-text"> Select a Date to See NASA's Choice <span className="potd-span">Image Of The Day</span></p>
        
        <input
          type="date"
          id="userDate"
          value={selectedDate}
          onChange={handleDateChange}
          />
        <button 
          className="photo-button"
          type="button" 
          name="button" 
          onClick={getPhotoUrl}>See the Photo of the Day!
        </button>
        {isLoading && (<Spinner />)}
        {isImageVisible && (<div className="potd">
        <img className="ImageOTD" src={photoUrl} alt="photo-of-the-day"/></div>)}

        {isVideoVisible && (<div className="votd">
        <iframe 
          src={videoUrl}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
          className="videoOTD" >
        </iframe></div> )}
      </div>

      <div>
        {(isImageVisible || isVideoVisible) && 
          (<div className="descriptionContainer">
          <p className="description-title">Learn More About This Image!</p>
          <p className="photo-description">{photoDesc}</p></div>)}
      </div>
    </section>
)
}

export default DateSelect
