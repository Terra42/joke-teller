const button = document.getElementById('button');
const audioElement = document.getElementById('audio');

function tellMe(joke) {
  VoiceRSS.speech({
    key: APIkey,
    src: joke,
    hl: 'en-us',
    v: 'Linda',
    r: 0,
    c: 'mp3',
    f: '44khz_16bit_stereo',
    ssml: false,
  });
}

async function getJokes() {
  let joke = '';
  const apiUrl =
    'https://v2.jokeapi.dev/joke/Programming?blacklistFlags=nsfw,religious,political,racist,sexist,explicit';
  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    if (data.setup) {
      joke = `${data.setup} ... ${data.delivery}`;
    } else {
      joke = data.joke;
    }
    tellMe(joke);
  } catch (error) {
    console.log('Error getting jokes from API', error);
  }
}

button.addEventListener('click', getJokes);
audioElement.addEventListener('playing', () => (button.disabled = true));
audioElement.addEventListener('ended', () => (button.disabled = false));
