import React, { useRef, useEffect  } from 'react';
import { connect } from 'react-redux';
import { IRootState } from '../../shared/reducers';
import { RouteComponentProps } from 'react-router-dom';
import { onAudioEnded } from './audio.reducer';
import task from 'components/task/task';

type IAudioProps = StateProps & DispatchProps & RouteComponentProps<{ url: string }>;

const Audio = (props): React.ReactElement => {
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
    //console.log("audio-useEffect taskCompleted: "+props.taskCompleted+" index: "+playUrlsIndex);
    if(props.taskCompleted && playUrlsIndex==-1) {
      //props.history.push('/summary');
    }
    if (audio && audio.current && playUrls.length && playUrlsIndex>=0) {
          audio.current.pause();
          audio.current.load();
          const promise = audio.current.play();

          if (promise !== undefined) {
            promise.then().catch(error => console.log(error));
          }
      }
      const listener = () => onAudioEnded();
      // When the file has finished playing to the end
      audio.current.addEventListener('ended', listener);

      return () => {
        audio.current.removeEventListener('ended', listener);
      };
  }, [audio, playUrls, playUrlsIndex]);

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

const mapStateToProps = ({ task, audio }: IRootState) => ({
  taskCompleted: task.entity.completed,
  taskDone: task.taskDone,
  playUrls: audio.playUrls,
  playUrlsIndex: audio.currentIndex
});

const mapDispatchToProps = {
  onAudioEnded
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Audio);
