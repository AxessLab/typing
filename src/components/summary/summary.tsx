import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';

import { IRootState } from '../../shared/reducers';

import { playAudio } from '../audio/audio.reducer';

import AudioManager from '../audio/audio';

import './summary.scss';

type ISummmaryProps = StateProps & DispatchProps;

const Summmary = (props: React.PropsWithChildren<ISummmaryProps>) => {
    const {
      taskErrors,
      playAudio,
    } = props;

    const [feedbackText, setFeedbackText] = useState('');

    useEffect(() => {
      if (taskErrors > 0) {
        const wellDone = "Resultat.%20Bra%20jobbat!%20Du%20hade%20bara%20" + taskErrors + "%20fel!";
        playAudio(  ['http://webbkonversation.se:59125/process?INPUT_TYPE=TEXT&OUTPUT_TYPE=AUDIO&INPUT_TEXT=' + wellDone + 
        '%0A&OUTPUT_TEXT=&VOICE_SELECTIONS=stts_sv_nst-hsmm%20sv%20male%20hmm&AUDIO_OUT=WAVE_FILE&LOCALE=sv&VOICE=stts_sv_nst-hsmm&AUDIO=WAVE_FILE',
        '/assets/done.mp3']);
        setFeedbackText("Bra Jobbat! Du hade bara " + taskErrors + " fel!");
      }
      const perfect = "Resultat.%20J%E4ttebra%20jobbat!%20Felfri!";
      playAudio(  [
        'http://webbkonversation.se:59125/process?INPUT_TYPE=TEXT&OUTPUT_TYPE=AUDIO&INPUT_TEXT=' + perfect + 
        '%0A&OUTPUT_TEXT=&VOICE_SELECTIONS=stts_sv_nst-hsmm%20sv%20male%20hmm&AUDIO_OUT=WAVE_FILE&LOCALE=sv&VOICE=stts_sv_nst-hsmm&AUDIO=WAVE_FILE',
        '/assets/done.mp3']);
      setFeedbackText("Jättebra jobbat! Felfri!");
    }, [feedbackText, playAudio, taskErrors]);

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
