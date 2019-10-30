const AudioContext = window.AudioContext;
const audioCtx = new AudioContext();

async function getFile(filepath) {
  const response = await fetch(filepath);
  const arrayBuffer = await response.arrayBuffer();
  const audioBuffer = await audioCtx.decodeAudioData(arrayBuffer);
  return audioBuffer;
}

// function to call each file and return an array of decoded files
async function loadFile(filePath) {
  const track = await getFile(filePath);
  return track;
}

let offset = 0;
// create a buffer, plop in data, connect and play -> modify graph here if required
function playTrack(audioBuffer) {
  const trackSource = audioCtx.createBufferSource();
  trackSource.buffer = audioBuffer;
  trackSource.connect(audioCtx.destination)

  if (offset === 0) {
    trackSource.start();
    offset = audioCtx.currentTime;
  } else {
    trackSource.start(0, audioCtx.currentTime - offset);
  }

  return trackSource;
}

export const playAudio2 = (src: string) => {
 // load file
  loadFile(src).then(track => {
    // check if context is in suspended state (autoplay policy)
    if (audioCtx.state === 'suspended') {
      audioCtx.resume();
    }

    playTrack(track);
  });
};

export const playAudio = async (audio, url: string, rate = 1): Promise<string> => {
  if (url == null || url === '' || audio == null || audio.current == null) {
    return Promise.reject(`playAudio URL: ${url} audio: ${audio}`);
  } else {
    return new Promise((resolve, reject) => {
      audio.current.playbackRate = rate;
      audio.current.src = url;
      audio.current.pause();
      audio.current.load();
      audio.current.addEventListener('ended', resolve);
      audio.current.addEventListener('error', reject);

      const promise = audio.current.play();
      if (promise !== undefined) {
        promise.catch(error => reject(error + ''));
      }
    });
  }
};
