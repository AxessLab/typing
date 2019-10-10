export const playAudioAsync = async (audio, url: string) => {
    if(url==null || url==='' || audio==null || audio.current==null) { 
        return Promise.resolve('');
    }
    else {
    return new Promise((resolve, reject) => {   // return a promise
        audio.current.src = url;
        audio.current.pause();
        audio.current.load();
        audio.current.addEventListener('ended',resolve);
        audio.current.addEventListener('error',reject); 
        audio.current.play();
    });
}
}