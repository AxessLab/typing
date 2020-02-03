import Speech from 'speak-tts';
import { ttsEndpointUrl } from '../../config/audio';

export interface ITTS {
  platform?: 'GOOGLE' | 'WEBSPEECH';
  encoding?: 'OPUS' | 'MP3' | 'PCM';
  rate?: number;
  pitch?: number;
  language?: string;
  voice?: string;
  gender?: 'MALE' | 'FEMALE';
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

export const speak = async (text = '', options: ITTS = {}): Promise<string> => {
  const parameters: ITTS & { text: string } = { text, ...options };

  //Fix missing parameters to ensure a voice is returned from backend
  if (text === '' || text === null || text === undefined) {
    return Promise.reject('No text defined');
  }
  if (parameters.gender === null || parameters.gender === undefined) {
    parameters.gender = 'MALE';
  }
  if (parameters.rate === null || parameters.rate === undefined) {
    parameters.rate = 1;
  }
  if (parameters.language === null || parameters.language === undefined) {
    parameters.language = 'sv-SE';
  }
  if (parameters.language === 'sv-SE') {
    parameters.voice = 'sv-SE-Wavenet-A';
  }
  if (parameters.language === 'en-US') {
    parameters.voice = "en-US-Wavenet-A";
  }

  // Remove other bad parameters
  Object.keys(parameters).forEach(key => {
    if (['', null, undefined].some(badValue => parameters[key] === badValue)) delete parameters[key];
  });

  // Return URL without parameters if there are none
  if (!Object.keys(parameters)) return Promise.resolve(ttsEndpointUrl);

  if (!parameters.platform || parameters.platform === 'GOOGLE') {
    return Promise.resolve(ttsEndpointUrl + '?' +
      Object.keys(parameters).map(key => `${key}=${encodeURIComponent(parameters[key])}`).join('&')
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
  speech.speak({ text, queue: false }).catch(error => {
    console.error('Web speech error', error);
    reject(`Web speech error: ${error}`);
  });
  resolve('Web speech done');
});
