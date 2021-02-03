function bgChange(bg) {
    document.body.style.background = bg;
}
  
//game api call below
var api = config.api;

const div = document.querySelector('main');
const convertToTwoDigits = (digit) => { 
  if (digit.toString().length < 2) {
    digit = '0' + digit.toString()
  } 
  return digit
}
const date = new Date();
const year = date.getFullYear()
const month = convertToTwoDigits(date.getMonth() + 1)
const day = convertToTwoDigits(date.getDate())
const today = year + '-' + month + '-' + day
const nextYear = year + 1 + '-' + month + '-' + day;
const url = `https://rawg.io/api/users/MysticOfAngelz/games`

const handleResponse = (response) => {
	return response.json()
  .then(function (json) {
    if (response.ok) {
      return json;
    } else {
      return Promise.reject(response);
    }
  })
}

fetch(url)
  .then(handleResponse)
  .then(function (data) {

    data.results.map((game) => {

    const card = document.createElement('div');
    card.setAttribute('class','card');
    const title = document.createElement('h2');
    title.textContent = game.name;
    card.appendChild(title);

    if (game.background_image) {
      const image = document.createElement('img');
      image.src = game.background_image;
      card.appendChild(image);
    }      

    if (game.released) {
      let released = game.released;
      released = released.split('-');
      released.push(released.shift());
      released = released.join('/');
      const releaseDate = document.createElement('h4');
      releaseDate.innerText = 'Release date: ' + released;
      card.appendChild(releaseDate);
    }

    if (game.platforms) {
      const gamePlat = document.createElement('p');
      const platformText = document.createTextNode('Available on: ');
      gamePlat.appendChild(platformText);     
      let platformList = game.platforms.map(a => a.platform.name).join(", ");
      let platforms = document.createTextNode(platformList);      
      gamePlat.appendChild(platforms);
      card.appendChild(gamePlat);
    }

    const gameGenre = document.createElement('p');
    const genreText = document.createTextNode('Genres: ');
    gameGenre.appendChild(genreText);    
    let genreList = game.genres.map(a => a.name).join(", ");
    let genres = document.createTextNode(genreList);      
    gameGenre.appendChild(genres);
    card.appendChild(gameGenre);

    if (game.clip) {
      const vid = document.createElement('video');
      vid.controls = true;
      vid.setAttribute('width', '100%');
      vid.setAttribute('height', 'auto');
      vid.load();
      const vidSrc = document.createElement('source');
      vidSrc.src = game.clip.clip;
      vid.appendChild(vidSrc);
      card.appendChild(vid);
    } else {
      const noClip = document.createElement('p');
      const infoSoonText = document.createTextNode('More information coming soon.');
      noClip.appendChild(infoSoonText)
      card.appendChild(noClip)
    }

    div.appendChild(card);
  })
})
.catch(function (error) {
  console.log('error', error);
  const card = document.createElement('div');
  card.style.textAlign = 'center';
  card.style.margin = '0 auto'
  card.innerHTML = 'No information avaiable at this time!'
  div.appendChild(card);
})
