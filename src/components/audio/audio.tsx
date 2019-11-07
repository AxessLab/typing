export const playAudio = async (audio, url: string, rate = 1): Promise<string> => {
  if (url == null || url === '' || audio == null || audio.current == null) {
    return Promise.reject(`playAudio URL: ${url} audio: ${audio}`);
  } else {
    return new Promise((resolve, reject) => {
      audio.current.pause();
      audio.current.setAttribute('src','');
      
      audio.current.setAttribute('playbackRate', rate);
      audio.current.setAttribute('src', url)  ;
      audio.current.load();
      audio.current.addEventListener('ended', resolve);
      audio.current.addEventListener('error', reject);
      const promise = audio.current.play().catch(error => console.error('playAudio error ' + error));
      if (promise === undefined) {
        promise.catch(error => reject(error + ''));
      }
    });
  }
};
