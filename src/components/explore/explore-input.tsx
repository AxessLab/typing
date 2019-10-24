import React, { useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import { IRootState } from '../../shared/reducers';
import { RouteComponentProps } from 'react-router-dom';
import { completed } from './explore.reducer';

const mapStateToProps = (state: IRootState, ownProps) => ({
  isAnimating: state.explore.isAnimating,
  gameCharacters: state.game.gameCharacters,
  currentGameCharacter: state.game.currentGameCharacter,
  handleKey: ownProps.handleKey,
  handleAnimation: ownProps.handleAnimation,
});

const mapDispatchToProps = {
  completed
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export type IProps = StateProps & DispatchProps & RouteComponentProps<{ url: string }>;

const ExploreInput = (props: IProps) => {
  const {
    isAnimating,
    handleKey,
    handleAnimation,
    gameCharacters,
    currentGameCharacter
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
          src={gameCharacters[currentGameCharacter].image}
          alt={gameCharacters[currentGameCharacter].name}
          onAnimationEnd={handleAnimation}
          className={isAnimating ? 'explore__character-large' : ''}
        />
    </div>
  );
}

export default connect(mapStateToProps)(ExploreInput);
