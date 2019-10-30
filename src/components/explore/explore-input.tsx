import React, { useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import { IRootState } from '../../shared/reducers';
import { RouteComponentProps } from 'react-router-dom';

const mapStateToProps = (state: IRootState, ownProps) => ({
  isAnimating: state.explore.isAnimating,
  currentGameCharacter: state.game.gameCharacter,
  handleKey: ownProps.handleKey,
  handleAnimation: ownProps.handleAnimation
});

type StateProps = ReturnType<typeof mapStateToProps>;

export type IProps = StateProps & RouteComponentProps<{ url: string }>;

const ExploreInput = (props: IProps) => {
  const {
    isAnimating,
    handleKey,
    handleAnimation,
    currentGameCharacter
  } = props;

  const inputElement = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (inputElement && inputElement.current) {
      inputElement.current.focus();
    }
  });

  return (
    <div
      className="explore__input"
      role="application"
      ref={inputElement}
      tabIndex={0}
      onKeyDown={handleKey}>
        <img
          src={currentGameCharacter.image}
          alt={currentGameCharacter.name}
        />
    </div>
  );
};

export default connect(mapStateToProps)(ExploreInput);
