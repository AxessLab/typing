import { ttsEndpointUrl } from 'config/audio';

export interface ITTS {
  encoding?: 'OPUS' | 'MP3' | 'PCM',
  rate?: number,
  pitch?: number,
  language?: string,
  voice?: string,
  gender?: 'MALE' | 'FEMALE',
  text: string
}

export const speak = async (request: ITTS): Promise<string> => Promise.resolve(
  ttsEndpointUrl + '?' + Object.keys(request).map(key => `${key}=${encodeURIComponent(request[key])}`).join('&')
);
