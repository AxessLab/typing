import React from 'react';
import { IRootState } from '../../shared/reducers';
import { Link } from 'react-router-dom';

const mapStateToProps = ( state: IRootState) => ({
});

type StateProps = ReturnType<typeof mapStateToProps>;

type IProps = StateProps;

const Game= (props: IProps) => {

  return (
    <div className="container pad-top-60 text-center">
      <h1>Välkommen till Typing in the dark</h1>
      <p className="text-left">
        I det här spelet kommer du att få göra olika uppdrag med hjälp av tangentbordet. 
        Målet är att klara alla uppdrag i spelet och att lära sig att skriva på tangentborde, utan att se det.
      </p>
      <div className="row flex flex-center">
        <div className="col-2">
          <Link to="/explore" className="button">Starta</Link>
        </div>
      </div>
    </div>
  );
}

export default Game;
