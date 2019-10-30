import Speech from 'speak-tts';
import { ttsEndpointUrl } from 'config/audio';

export interface ITTS {
  platform?: 'GOOGLE' | 'WEBSPEECH',
  encoding?: 'OPUS' | 'MP3' | 'PCM',
  rate?: number,
  pitch?: number,
  language?: string,
  voice?: string,
  gender?: 'MALE' | 'FEMALE',
  text: string
}

const speech = new Speech();
let isWebspeechLoaded = false;

speech.init({
  volume: 0.5,
  lang: "sv-SE",
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

export const speak = async (request: ITTS): Promise<string> => {
  if (!request.platform || request.platform === 'GOOGLE') {
    return Promise.resolve(ttsEndpointUrl + '?' + Object.keys(request).map(key => `${key}=${encodeURIComponent(request[key])}`).join('&'));
  } else {
    if (isWebspeechLoaded) {
      // speech.cancel();
      // TODO: Set language, rate, and pitch
      await webSpeech(request.text).then(() => Promise.resolve(''));
    } else {
      return Promise.reject('Webspeech not ready');
    }
  }
}

// TODO: Check browser support
// const text = speech.hasBrowserSupport();

const webSpeech = async (text: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    speech.speak({
      text: text,
      queue: false
    }).catch(error => {
      console.error('webSpeech error', error);
      reject(`webSpeech error: ${error}`);
    });
    resolve('webspeech done')
  });
}
