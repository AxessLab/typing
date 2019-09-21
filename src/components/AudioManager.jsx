import React, { useState, useEffect  } from 'react';

const AudioManager = (props) => {
    const [audio, setAudio] = useState();

  useEffect(() => { //update and load new audio when changed, this probably prevents adding audio files one at a time
    if(audio){
       audio.pause();
       audio.load();
       audio.play();
    }
  });  

  const typeStr = () => { if(props.playURL[props.playURLIndex].length>3) { //set type automatically
                            const fileType="audio/"+props.playURL[props.playURLIndex].substr(
                              props.playURL[props.playURLIndex].length-3,
                              props.playURL[props.playURLIndex].length);
                              if(fileType==='mp3' || fileType==='wav' || fileType==='ogg') {
                                return("audio/"+fileType);
                              }
                              console.log("Typing AudioManager could not determine file type of "+props.playURL[props.playURLIndex]); 
                            }
                            return("audio/wav");
                          }

  return ( 
      <audio id="Player" ref={(audioref)=>{ setAudio(audioref) }} autoPlay onEnded={props.onEnded}>
        <source src={props.playURL[props.playURLIndex]} type={typeStr}></source>
      </audio>
  ); //BETTER ERROR HANDLING IS NEEDED
}

export default AudioManager;