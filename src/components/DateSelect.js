import { useState } from "react";
import '../style/dateselect.css'

const DateSelect = () => {
 const [isImageVisible, setIsImageVisible] = useState(false)
 const [photoUrl, setPhotoUrl] = useState('')
 const [photoDesc, setPhotoDesc] = useState('')

 const [selectedDate, setSelectedDate] = useState('')

const handleDateChange = async(event) => {
  setSelectedDate(event.target.value);
}

const getPhotoUrl = async() => {
  const url = `https://api.nasa.gov/planetary/apod?api_key=cW3MjyR23t5ybWlIRARhHdvE0pohUf0SXUO1gYuM&date=${selectedDate}`

  await fetch(url)
      .then(res => res.json()) // parse response as JSON
      .then(data => {
        if(data.media_type === 'image'){
          setPhotoUrl(data.hdurl)  
          setIsImageVisible(true)     
        } else if(data.media_type === 'video'){
          setPhotoUrl(data.url)
          setIsImageVisible(true)
        }
      })
  getPhotoDesc()
}

const getPhotoDesc = async() => {
    const url = `https://api.nasa.gov/planetary/apod?api_key=cW3MjyR23t5ybWlIRARhHdvE0pohUf0SXUO1gYuM&date=${selectedDate}`
    await fetch (url)
      .then(res => res.json())
      .then(data => {
        setPhotoDesc(data.explanation)
    })
}

return(
    <div>
      <input
        type="date"
        id="userDate"
        value={selectedDate}
        onChange={handleDateChange} // Update state on change
      />
      <button className="photo-button"type="button" name="button" onClick={getPhotoUrl}>Get Today's Photo</button>
      {isImageVisible && (
      <img  className="ImageOTD" src={photoUrl} alt="photo-of-the-day" />)}
      <p className="photo-description">{photoDesc}</p>
    </div>
)
}

export default DateSelect
