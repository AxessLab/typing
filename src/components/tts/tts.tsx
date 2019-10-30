import Speech from 'speak-tts';
import { ttsEndpointUrl } from 'config/audio';

export interface ITTS {
  platform?: 'GOOGLE' | 'WEBSPEECH',
  encoding?: 'OPUS' | 'MP3' | 'PCM',
  rate?: number,
  pitch?: number,
  language?: string,
  voice?: string,
  gender?: 'MALE' | 'FEMALE'
}

const speech = new Speech();
let isWebspeechLoaded = false;

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

export const speak = async (text: string = '', options: ITTS = {}): Promise<string> => {
  const filteredOptions: ITTS & { text: string } = Object.assign({}, { text: text }, options);

  // Remove bad parameters
  Object.keys(filteredOptions).forEach(key => {
    if (['', null, undefined].some(badValue => filteredOptions[key] === badValue)) delete filteredOptions[key];
  });

  // Return URL without parameters if there are none
  if (!Object.keys(filteredOptions)) return Promise.resolve(ttsEndpointUrl);

  if (!filteredOptions.platform || filteredOptions.platform === 'GOOGLE') {
    return Promise.resolve(ttsEndpointUrl + '?' +
      Object.keys(filteredOptions).map(key => `${key}=${encodeURIComponent(filteredOptions[key])}`).join('&')
    );
  } else {
    if (isWebspeechLoaded) {
      // speech.cancel();
      // TODO: Set language, rate, and pitch
      await webSpeech(text).then(() => Promise.resolve(''));
    } else {
      return Promise.reject('Web speech not ready');
    }
  }

  return Promise.reject('');
};

// TODO: Check browser support
// const text = speech.hasBrowserSupport();

const webSpeech = async (text: string): Promise<string> => new Promise((resolve, reject) => {
  speech.speak({ text: text, queue: false }).catch(error => {
    console.error('Web speech error', error);
    reject(`Web speech error: ${error}`);
  });
  resolve('Web speech done')
});
