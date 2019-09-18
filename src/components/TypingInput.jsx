import React, { useEffect, useRef } from 'react';

const TypingInput = (props) => {
  const inputEl = useRef(null);
  
  useEffect(() => {
    inputEl.current.focus();
  })

  const handleKey = e => {
    props.handleKey(e);
  }

  return (
    <div 
      className="typing-text-input" 
      role="application" 
      ref={inputEl} 
      tabIndex="0" 
      onKeyUp={handleKey}
      aria-label={'Type the text ' + props.valueToType}>
        {props.children}
      </div>
  );
}

export default TypingInput;