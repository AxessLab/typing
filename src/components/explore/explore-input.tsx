import React, { useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import { IRootState } from '../../shared/reducers';
import { RouteComponentProps } from 'react-router-dom';

//Images
import logo1 from '../../static/images/Fosauri.svg';
import logo2 from '../../static/images/Onzua.svg';

import { completed } from './explore.reducer';


const mapStateToProps = ({ explore }: IRootState, ownProps) => ({
  isAnimating: explore.isAnimating,
  handleKey: ownProps.handleKey,
  handleAnimation: ownProps.handleAnimation,
  charId: ownProps.charId
});

const mapDispatchToProps = {
  completed
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export type ITaskProps = StateProps & DispatchProps & RouteComponentProps<{ url: string }>;

const ExploreInput = (props: ITaskProps) => {
  const {
    isAnimating,
    handleAnimation,
    charId
  } = props;

  const inputEl = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if(inputEl && inputEl.current) {
      inputEl.current.focus();
    }
  })

  const handleKey = (event: React.KeyboardEvent) => {
    props.handleKey(event);
  }

  return (
    <div
      className="explore__input"
      role="application"
      ref={inputEl}
      tabIndex={0}
      onKeyDown={handleKey}>
        <img
          src={charId === "1" ? logo1 : logo2}
          alt={'character figure'}
          onAnimationEnd={handleAnimation}
          className={(isAnimating ? 'explore__character-large' : '')}
        />
    </div>
  );
}

export default connect(mapStateToProps)(ExploreInput);
