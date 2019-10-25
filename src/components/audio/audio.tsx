export const playAudio = async (audio, url: string, rate: number = 1): Promise<string> => {
  if (url == null || url === '' || audio == null || audio.current == null) {
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
}
