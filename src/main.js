//Example fetch using pokemonapi.co
document.querySelector('button').addEventListener('click', getFetch)
let hidden = true;


function getFetch(){
  const date = document.getElementById("userDate").value;
  console.log(date);
  const url = `https://api.nasa.gov/planetary/apod?api_key=cW3MjyR23t5ybWlIRARhHdvE0pohUf0SXUO1gYuM&date=${date}`
  console.log(hidden);
 hidden = !hidden;
  fetch(url)
      .then(res => res.json()) // parse response as JSON
      .then(data => {
        console.log(data)
        document.querySelector('h3').innerText = data.explanation;
        document.getElementById("photoDesc").hidden = hidden; 
        if(data.media_type === 'image'){

          document.getElementById("nasaImageWrap").hidden = hidden;           
          document.querySelector('img').src = data.hdurl;    
        }else if(data.media_type === 'video') {        
  
          document.getElementById("video").hidden = hidden;          
          document.getElementById("video").src = data.url; 
        }
      })
      .catch(err => {
          console.log(`error ${err}`)
      });
}

