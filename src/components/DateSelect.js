import { useState } from "react";
import '../style/dateselect.css'

const DateSelect = () => {

 const [photoUrl, setPhotoUrl] = useState('')
 const [photoDesc, setPhotoDesc] = useState('')

const getPhotoUrl = async() => {
  const date = document.getElementById("userDate").value;
  console.log(date);
  const url = `https://api.nasa.gov/planetary/apod?api_key=cW3MjyR23t5ybWlIRARhHdvE0pohUf0SXUO1gYuM&date=${date}`

  await fetch(url)
      .then(res => res.json()) // parse response as JSON
      .then(data => {
        if(data.media_type === 'image'){
          setPhotoUrl(data.hdurl)       
        } else if(data.media_type === 'video'){
          setPhotoUrl(data.url)
        }
      })
  getPhotoDesc()
}

const getPhotoDesc = async() => {
    const date = document.getElementById("userDate").value;
    console.log(date);
    const url = `https://api.nasa.gov/planetary/apod?api_key=cW3MjyR23t5ybWlIRARhHdvE0pohUf0SXUO1gYuM&date=${date}`
    await fetch (url)
      .then(res => res.json())
      .then(data => {
        setPhotoDesc(data.explanation)
    })
}

return(
    <div>
      <input type="date" id="userDate" name="" value=""></input>
      <button className="photo-button"type="button" name="button" onClick={getPhotoUrl}>Get Today's Photo</button>
      <img  className="ImageOTD" src={photoUrl} alt="photo-of-the-day" />
      <p className="photo-description">{photoDesc}</p>
    </div>
)
}

export default DateSelect
