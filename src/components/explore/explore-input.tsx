import React, { useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import { IRootState } from '../../shared/reducers';
import { RouteComponentProps } from 'react-router-dom';

// Images
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
    handleKey,
    handleAnimation,
    charId
  } = props;

  const inputElement = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (inputElement && inputElement.current) {
      inputElement.current.focus();
    }
  })

  return (
    <div
      className="explore__input"
      role="application"
      ref={inputElement}
      tabIndex={0}
      onKeyDown={handleKey}>
        <img
          src={charId === '1' ? logo1 : logo2}
          alt="character figure"
          onAnimationEnd={handleAnimation}
          className={isAnimating ? 'explore__character-large' : ''}
        />
    </div>
  );
}

export default connect(mapStateToProps)(ExploreInput);
