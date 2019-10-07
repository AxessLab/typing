import React, { useRef, useEffect } from 'react';
import { connect } from 'react-redux';
import Speech from 'speak-tts';

import { IRootState, ITTSPlattform } from '../../shared/reducers';
import { onAudioEnded } from './audio.reducer';

const mapStateToProps = ({ task, audio }: IRootState) => ({
  taskCompleted: task.entity.completed,
  playUrls: audio.playUrls,
  playUrlsIndex: audio.currentIndex
});

const mapDispatchToProps = {
  onAudioEnded
};

// TODO: Check what all these keywords do...
type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

// Combine state and dispatch props
type IAudioProps = StateProps & DispatchProps;

const Audio: React.FC<IAudioProps> = (props: React.PropsWithChildren<IAudioProps>): React.ReactElement => {
  const {
    playUrls,
    playUrlsIndex,
    onAudioEnded
  } = props;

  const audio: React.MutableRefObject<HTMLMediaElement | null> = useRef(null);

  const incompatibilityMessage = props.children || (
    <p>Your browser does not support the <code>audio</code> element.</p>
  );
 
  useEffect(() => { //update and load new audio when changed, this probably prevents adding audio files one at a time
    const currentAudio: React.MutableRefObject<HTMLMediaElement | null> = audio;

    if (audio && audio.current && playUrls.length && playUrlsIndex >= 0) {
          audio.current.pause();
          audio.current.load();
          const promise = audio.current.play();

          if (promise !== undefined) {
            //promise.then().catch(error => console.log(error));
          }
      }
      const listener = () => onAudioEnded();
      // When the file has finished playing to the end
      currentAudio.current.addEventListener('ended', listener);

      return () => {
        currentAudio.current.removeEventListener('ended', listener);
      };
  }, [audio, playUrls, playUrlsIndex, onAudioEnded]); // We got an error message unless we included all prop variables in this array

  return (
      <audio
        id="Player"
        ref={audio}
        src={playUrls[playUrlsIndex]}>
        autoPlay
      >
        {incompatibilityMessage}
      </audio>
  );
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

export const speak = async (tts: ITTSPlattform):Promise<string> =>  {
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
    speech.cancel();
          await webSpeech(tts.text).then( data => { 
          return Promise.resolve(requestURL); }); 
      break;
    default:
      requestURL = '/assets/error' + tts.lang + '.mp3';
      return Promise.resolve(requestURL);
  }
}

/*TODO: Check browser support
  const text = speech.hasBrowserSupport();_*/

const webSpeech = async (text: string)  => {
  
  
  await speech.speak({
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
    })
    .then(data => { 
      return Promise.resolve('');
    })
    .catch(e => {
      console.error("An error occurred :", e);
      return Promise.reject('');
    });
}

export default connect(mapStateToProps, mapDispatchToProps)(Audio);
