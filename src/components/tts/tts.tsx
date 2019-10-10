import Speech from 'speak-tts';

let isWebspeechLoaded = false;

export interface ITTS {
    lang: string,
    text: string,
    type: string
}

export const TTS_PLATTFORM = {
    GOOGLE: 'tts/GOOGLE',
    MARY: 'tts/MARY',
    WEBSPEECH: 'tts/WEBSPEECH'
}

const speech = new Speech();


speech
  .init({
  volume: 0.5,
  lang: "sv-SE",
  rate: 1,
  pitch: 1,
  listeners: {
    onvoiceschanged: voices => {
      voices.forEach(voice => { 
        if( voice.lang === 'sv-SE' || voice.lang === 'sv_SE') {
          console.log('Using swedish webspeech voice: '+voice.name);
          speech.setVoice(voice.name);
          isWebspeechLoaded = true;
      }});
    }
  }
})
.then( data =>  {
    //console.log("Speech is ready");
})
.catch(e => {
  console.error("An error occured while initializing : ", e);
});

export const speak = async (tts: ITTS):Promise<string> =>  {
        let requestURL: string = '';
        switch(tts.type) {
        case TTS_PLATTFORM.GOOGLE:
            requestURL = 'https://webbkonversation.se/googleCloudTTS.php?tts_txt='+encodeURIComponent(tts.text);
            return Promise.resolve(requestURL);
        case TTS_PLATTFORM.MARY:
            requestURL = 'http://webbkonversation.se:59125/process?INPUT_TYPE=TEXT&OUTPUT_TYPE=AUDIO&INPUT_TEXT=' +
            encodeURIComponent(tts.text) +
            '%0A&OUTPUT_TEXT=&VOICE_SELECTIONS=stts_sv_nst-hsmm%20sv%20male%20hmm&AUDIO_OUT=WAVE_FILE&LOCALE=sv&VOICE=stts_sv_nst-hsmm&AUDIO=WAVE_FILE';
            return Promise.resolve(requestURL);
        case TTS_PLATTFORM.WEBSPEECH:
            if(isWebspeechLoaded) {
                //speech.cancel();
                await webSpeech(tts.text).then( data => { 
                    return Promise.resolve(requestURL); 
                }); 
            }
            else {
                return Promise.reject('Webspeech not ready');
            }
            break;
        default:
            requestURL = '/assets/error' + tts.lang + '.mp3';
            return Promise.resolve(requestURL);
        }
    }

/*TODO: Check browser support
  const text = speech.hasBrowserSupport();_*/

const webSpeech = async (text: string)  => {  
    return new Promise((resolve,reject) => { 
        speech.speak({
        text: text,
        queue: false,
        listeners: {
            onstart: () => {
                //console.log("Start utterance");
            },
            onend: () => {
                //console.log("End utterance");
            },
            onresume: () => {
                //console.log("Resume utterance");
            },
            onboundary: event => {
                //console.log(event.name + " boundary reached after " + event.elapsedTime + " milliseconds.");
            }
        }
    }).then(data => { 
        resolve('webSpeech done');
    }).catch(e => {
      console.log("webSpeech, an error occurred :", e);
      reject('webSpeech error: '+e);
    });
    });
}
