export const playAudioAsync = async (audio, url: string, rate: number):Promise<string> => {
    if(url == null || url === '' || audio == null || audio.current == null) { 
        return Promise.reject('playAduioAsync url: '+url+' audio: '+audio);
    }
    else {
        return new Promise((resolve, reject) => {   // return a promise
        audio.current.playbackRate = rate;
        audio.current.src = url;
        audio.current.pause();
        audio.current.load();
        audio.current.addEventListener('ended',resolve);
        audio.current.addEventListener('error',reject); 
        const promise = audio.current.play();
        if(promise !== undefined) {
            promise.catch(e => { /*console.log('audio play error: '+e);*/ reject(e+''); });
        }
    });
}
}