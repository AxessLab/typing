import React, { useRef, useEffect, useState } from 'react';
import { connect } from 'react-redux';

import { IRootState } from '../../shared/reducers';

import { playAudioAsync } from '../audioasync/audioasync';
import { speak, ITTS, TTS_PLATTFORM } from '../tts/tts';

import './summary.scss';

type ISummmaryProps = StateProps;

const Summmary = (props: React.PropsWithChildren<ISummmaryProps>) => {
    const {
      taskErrors
    } = props;

    const [feedbackText, setFeedbackText] = useState('');

    const audio: React.MutableRefObject<HTMLMediaElement | null> = useRef(null);

    //selecy voices
    //GOOGLE / MARY / WEBSPEECH
    const textToSpeak: ITTS = { 
        type: TTS_PLATTFORM.GOOGLE, 
        lang: 'sv-SE',
        text: '',
        rate: '1.00',
        pitch: '0.00'
       };

    useEffect(() => {
      console.log('Summary::UseEffect runs twice, for some reason....');
      if ( taskErrors > 0 ) {
        textToSpeak.text = "Resultat. Bra jobbat! Du hade bara " + taskErrors + " fel.";
        speak(textToSpeak).then(data => { 
            playAudioAsync(audio, data, 1).then( data => {
              playAudioAsync(audio, '/assets/done.mp3', 1).catch(e => { /*console.error('playAudioAsync error: '+e)*/; });
            }).catch(e => { /*console.error('playAudioAsync error: '+e);*/ });
        }).catch(e => { /*console.error('speak error: '+e);*/ });
        setFeedbackText("Bra Jobbat! Du hade bara " + taskErrors + " fel!");
      }
      else {
        textToSpeak.text = "Resultat. Jättebra jobbat! Felfri.";
        speak(textToSpeak).then(data => {
          playAudioAsync(audio, data, 1).then( data => {
          playAudioAsync(audio, '/assets/done.mp3', 1).catch(e => { /*console.error('playAudioAsync error: '+e);*/ });     
          }).catch(e => { /*console.error('playAudioAsync error: '+e);*/ });
          //);
        }).catch(e => { /*console.error('speak error: '+e);*/ });
        setFeedbackText("Jättebra jobbat! Felfri!");
      }
    }, [feedbackText, taskErrors, textToSpeak]);

    return (
    <>
      <div className="flex-m flex-center pad-top-60-m pad-top-30">
        <div className="summary__status">
          <h2>Resultat</h2>
            <p>{feedbackText}</p>
            <audio id="Player"
                ref={audio}
                src=""
                autoPlay></audio>
        </div>
      </div>
    </>
  );
}

const mapStateToProps = ({ task }: IRootState) => ({
  taskErrors: task.errors
});


type StateProps = ReturnType<typeof mapStateToProps>;

export default connect(
  mapStateToProps
)(Summmary);
