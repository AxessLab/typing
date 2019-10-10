import { connect } from 'react-redux';
import React, { useRef, useEffect } from 'react';

import { IRootState } from '../../shared/reducers';
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
            promise.then().catch(error => console.log(error));
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
        src={playUrls[playUrlsIndex]}
        autoPlay
      >
      {incompatibilityMessage}
      </audio>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(Audio);
