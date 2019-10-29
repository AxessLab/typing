import React, { useRef, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { speak } from '../tts/tts';
import { playAudio } from '../audio/audio';
import { IRootState } from 'shared/reducers';
import { setCharacter } from 'shared/reducers/game-data';

const mapStateToProps = (state: IRootState) => ({
  gameCharacters: state.game.gameCharacters
});

const mapDispatchToProps = {
  setCharacter
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export type IProps = StateProps & DispatchProps & RouteComponentProps<{ url: string }>;

const ExploreMenu = (props: IProps) => {
  const {gameCharacters, setCharacter} = props;
  const headerText = 'Välj ninja';
  const introText = 'Tryck tabb för att navigera. Välj genom att trycka på enter.';

  const audioElementIntro: React.MutableRefObject<HTMLMediaElement | null> = useRef(null);
  const menuElement = useRef(null);

  const handleKey = (event: React.KeyboardEvent) => {
    if (event.keyCode === 38 || event.keyCode === 40) {
      menuElement.current.children[0].focus();
    }
  }

  useEffect(() => {
    if(menuElement && menuElement.current) {
      menuElement.current.focus();
      console.log(menuElement.current.children[0]);
    }
  }, []);

  useEffect(() => {
    speak(headerText + ' ' + introText).then(url => playAudio(audioElementIntro, url));
  }, [headerText, introText]);

  const handleFocus = (e: React.FocusEvent<HTMLLIElement>) => {
    e.preventDefault();
    const id = e.currentTarget.dataset.id;
    speak(gameCharacters[id].name + '.  ' + gameCharacters[id].description).then(url => playAudio(audioElementIntro, url))
  }
  return (
    <div className="container pad-top-60 text-center">
      <h1>{headerText}</h1>
      <p>{introText}</p>
      <audio id="intro-audio" ref={audioElementIntro} src="" />
      <div className="flex-m flex-wrap-m flex-center-m pad-top-10">
        <div className="explore__menu col-3-l col-12 pad-top-30">
          <ul
            tabIndex={-1}
            role="menu"
            ref={menuElement}
            onKeyUp={handleKey}>
              {gameCharacters.map((character, index) => (
                <li
                  key={character.id}
                  data-id={character.id}
                  role="none"
                  onFocus={handleFocus}>
                  <Link role="menuitem" to="/explore/play" onClick={() => setCharacter(index)}>
                    <img src={character.image} className="explore__menu-image" alt="Fosuari character" />
                    <span>
                      <h2>{character.name}</h2>
                      <p>{character.description}</p>
                    </span>
                  </Link>
                </li>
              ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(ExploreMenu);
