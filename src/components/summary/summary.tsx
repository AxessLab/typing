import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';

import { IRootState, ITTSPlattform } from '../../shared/reducers';

import { playAudio } from '../audio/audio.reducer';

import AudioManager, { speak, TTS_PLATTFORM } from '../audio/audio';

import './summary.scss';

type ISummmaryProps = StateProps & DispatchProps;

const Summmary = (props: React.PropsWithChildren<ISummmaryProps>) => {
    const {
      taskErrors,
      playAudio,
    } = props;

    const [feedbackText, setFeedbackText] = useState('');

    const textToSpeak: ITTSPlattform = { 
        type: TTS_PLATTFORM.MARY, 
        lang: 'sv-SE',
        text: ''
       };

    useEffect(() => {
      if (taskErrors > 0) {
        textToSpeak.text = "Resultat. Bra jobbat! Du hade bara " + taskErrors + " fel.";
        speak(textToSpeak).then((data) => { 
            if(data) {
              console.log(data);
                playAudio([data, '/assets/done.mp3']);
            }
            else {
                playAudio(['/assets/done.mp3']);
            }
        });
        setFeedbackText("Bra Jobbat! Du hade bara " + taskErrors + " fel!");
      }
      else {
        textToSpeak.text = "Resultat. Jättebra jobbat! Felfri.";
        speak(textToSpeak).then((data) => {
            if(data) {
               playAudio([data, '/assets/done.mp3']);     
            }
            else {
                playAudio(['/assets/done.mp3']);
            }
        });
        setFeedbackText("Jättebra jobbat! Felfri!");
      }
    }, [feedbackText, playAudio, taskErrors, textToSpeak]);

    return (
    <>
      <div className="flex-m flex-center pad-top-60-m pad-top-30">
        <div className="summary__status">
          <h2>Resultat</h2>
            <p>{feedbackText}</p>
            <AudioManager />
        </div>
      </div>
    </>
  );
}

const mapStateToProps = ({ task }: IRootState) => ({
  taskErrors: task.errors
});


const mapDispatchToProps = {
  playAudio
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Summmary);
