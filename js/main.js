//Example fetch using pokemonapi.co
document.querySelector('button').addEventListener('click', getFetch)
let hidden = true;


function getFetch(){
  const date = document.getElementById("userDate").value;
  console.log(date);
  const url = `https://api.nasa.gov/planetary/apod?api_key=75Bnr6NAMZMjHVO0hCfFGUC9ECGK03DAP8iI5usM&date=${date}`
  console.log(hidden);
 hidden = !hidden;
  fetch(url)
      .then(res => res.json()) // parse response as JSON
      .then(data => {
        console.log(data)
        document.querySelector('h3').innerText = data.explanation;
        document.getElementById("photoDesc").hidden = false; 
        if(data.media_type === 'image'){

          document.getElementById("nasaImageWrap").hidden = false;         
          document.getElementById("nasaVideoWrap").hidden = true;         

          document.querySelector('img').src = data.hdurl;    
        }else if(data.media_type === 'video'){        
          document.getElementById("nasaImageWrap").hidden = true; 

          document.getElementById("nasaVideoWrap").hidden = !document.getElementById("nasaVideoWrap").hidden;          

          document.getElementById("video").src = data.url; 
        }
      })
      .catch(err => {
          console.log(`error ${err}`)
      });
}

