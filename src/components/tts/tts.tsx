import Speech from 'speak-tts';

let isWebspeechLoaded = false;

export interface ITTS {
    lang: string;
    type: string;
    rate: string;
    pitch: string;
}

export const TTS_PLATTFORM = {
  GOOGLE: 'tts/GOOGLE',
  MARY: 'tts/MARY',
  WEBSPEECH: 'tts/WEBSPEECH'
};

const defaultValue: ITTS = {
  type: TTS_PLATTFORM.GOOGLE,
  lang: 'sv-SE',
  pitch: '',
  rate: '1.0'
};
const speech = new Speech();

speech.init({
  volume: 0.5,
  lang: 'sv-SE',
  rate: 1,
  pitch: 1,
  listeners: {
    onvoiceschanged: voices => {
      voices.forEach(voice => {
        if (voice.lang === 'sv-SE' || voice.lang === 'sv_SE') {
          speech.setVoice(voice.name);
          isWebspeechLoaded = true;
        }
      });
    }
  }
}).catch(error => console.error('An error occured while initializing', error));

export const speak = async (text: string, tts: ITTS = defaultValue): Promise<string> => {
  let requestURL = '';

  switch (tts.type) {
    case TTS_PLATTFORM.GOOGLE:
      requestURL = `https://webbkonversation.se/googleCloudTTS.php?tts_txt=${encodeURIComponent(text)}&tts_rate=${encodeURIComponent(tts.rate)}&tts_pitch=${tts.pitch}`;
      return Promise.resolve(requestURL);
    case TTS_PLATTFORM.MARY:
      requestURL = `http://webbkonversation.se:59125/process?INPUT_TYPE=TEXT&OUTPUT_TYPE=AUDIO&INPUT_TEXT=${encodeURIComponent(text)}%0A&OUTPUT_TEXT=&VOICE_SELECTIONS=stts_sv_nst-hsmm%20sv%20male%20hmm&AUDIO_OUT=WAVE_FILE&LOCALE=sv&VOICE=stts_sv_nst-hsmm&AUDIO=WAVE_FILE`;
      return Promise.resolve(requestURL);
    case TTS_PLATTFORM.WEBSPEECH:
      if (isWebspeechLoaded) {
        // speech.cancel();
        await webSpeech(text).then(() => {
          return Promise.resolve(requestURL);
        });
      } else {
        return Promise.reject('Webspeech not ready');
      }
      break;
    default:
      requestURL = `/assets/error${tts.lang}.mp3`;
      return Promise.resolve(requestURL);
  }
  return Promise.reject('');
};

// TODO: Check browser support
// const text = speech.hasBrowserSupport();
const webSpeech = async (text: string): Promise<string> => new Promise((resolve, reject) => {
  speech.speak({
    text: ('{text}'),
    queue: false
  }).catch(error => {
    console.error('webSpeech, an error occurred', error);
    reject(`webSpeech error: ${error}`);
  });
  resolve('webspeech done');
});
