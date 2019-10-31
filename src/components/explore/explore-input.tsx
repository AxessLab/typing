import React, { useEffect, useRef, useState } from 'react';
import { connect } from 'react-redux';
import { IRootState } from '../../shared/reducers';
import { RouteComponentProps } from 'react-router-dom';

const mapStateToProps = (state: IRootState, ownProps) => ({
  currentGameCharacter: state.game.gameCharacter,
  handleKey: ownProps.handleKey
});

type StateProps = ReturnType<typeof mapStateToProps>;

export type IProps = StateProps & RouteComponentProps<{ url: string }>;

const ExploreInput = (props: IProps) => {
  const {
    handleKey,
    currentGameCharacter
  } = props;

  const [ className, setClassNames ] = useState('');

  const inputElement = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (inputElement && inputElement.current) {
      inputElement.current.focus();
    }
  });

  const handleKeyUp = (event: React.KeyboardEvent) => {
    setClassNames(className ? '' : 'explore__character-animation');
    handleKey(event);
  };

  const onAnimationEnd = () => {
    setClassNames('');
  };

  return (
    <div
      className="explore__input"
      role="application"
      ref={inputElement}
      tabIndex={0}
      onKeyUp={(event: React.KeyboardEvent) => handleKeyUp(event)}>
        <img
          src={currentGameCharacter.image}
          alt={currentGameCharacter.name}
          onAnimationEnd={onAnimationEnd}
          className={className}
          />
    </div>
  );
};

export default connect(mapStateToProps)(ExploreInput);
