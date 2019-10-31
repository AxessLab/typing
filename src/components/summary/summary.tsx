import React, { useRef, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { IRootState } from '../../shared/reducers';
import { playAudio } from '../audio/audio';
import { speak } from '../tts/tts';
import { assetBaseUrl } from '../../config/audio';

import './summary.scss';

const mapStateToProps = ({ task }: IRootState) => ({
  taskErrors: task.errors
});

type StateProps = ReturnType<typeof mapStateToProps>;

type ISummmaryProps = StateProps;

const Summmary = ({ taskErrors }: ISummmaryProps) => {

  const [feedbackText, setFeedbackText] = useState('');
  const audioElement: React.MutableRefObject<HTMLMediaElement | null> = useRef(null);

  useEffect(() => {
    // TODO: useEffect runs twice, for some reason...
    if (taskErrors > 0) {
      speak(`Resultat. Bra jobbat! Du hade bara ${taskErrors} fel.`).then(url => {
        playAudio(audioElement, url).then(() => {
          playAudio(audioElement, assetBaseUrl + 'done.mp3')
            .catch(error => console.error('playAudio error', error));
        }).catch(error => console.error('playAudio error', error));
      }).catch(error => console.error('speak error', error));

      setFeedbackText(`Bra Jobbat! Du hade bara ${taskErrors} fel!`);
    } else {
      speak('Resultat. Jättebra jobbat! Felfri.').then(url => {
        playAudio(audioElement, url).then(() => {
          playAudio(audioElement, assetBaseUrl + 'done.mp3')
            .catch(error => console.error('playAudio error', error));
        }).catch(error => console.error('playAudio error', error));
      }).catch(error => console.error('speak error', error));

      setFeedbackText('Jättebra jobbat! Felfri!');
    }
  }, [feedbackText, taskErrors]);

  return (
    <div className="flex-m flex-center pad-top-60-m pad-top-30">
      <div className="summary__status">
        <h2>Resultat</h2>
          <p>{feedbackText}</p>
          <audio id="player" ref={audioElement} src="" autoPlay />
      </div>
    </div>
  );
};

export default connect(mapStateToProps)(Summmary);
