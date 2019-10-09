import React, { useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import { IRootState } from '../../shared/reducers';
import { RouteComponentProps } from 'react-router-dom';

//Images
import { ReactComponent as CharacterIcon } from '../../static/images/Fosauri.svg';

import { completed } from './explore.reducer';


const mapStateToProps = ({ explore } : IRootState, ownProps) => ({
  isAnimating: explore.isAnimating,
  handleKey: ownProps.handleKey,
  handleAnimation: ownProps.handleAnimation
});

const mapDispatchToProps = {
  completed
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export interface ITaskProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

const ExploreInput : React.FC<ITaskProps> = (props : ITaskProps) => {
  const { 
    isAnimating
  } = props;

  const inputEl = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if(inputEl && inputEl.current) {
      inputEl.current.focus();
    }
  })

  const handleKey = event => {
    props.handleKey(event);
  }

  const handleAnimation = event => {
    props.handleAnimation();
  }
  return (
    <>
      <div 
        className="explore__input" 
        role="application"
        ref={inputEl} 
        tabIndex={0} 
        onKeyDown={handleKey}>
          <CharacterIcon 
            onAnimationEnd={handleAnimation}
            className={(isAnimating ? 'explore__character-large' : '')}
          />
      </div>
    </>
  );
}



export default connect(mapStateToProps)(ExploreInput);
