import React from 'react';
import { Link } from 'react-router-dom';

const Game= () => {
  return (
    <div className="container pad-top-60 text-center">
      <h1>Välkommen till Typing in the dark</h1>
      <p className="text-left">
        I det här spelet kommer du att få göra olika uppdrag med hjälp av tangentbordet.
        Målet är att klara alla uppdrag i spelet och att lära sig att skriva på tangentborde, utan att se det.
        Uppdragen börjar med några få tangenter och blir mer avancerat ju fler uppdrag du har klarat.
      </p>
      <p className="text-left">
        För att starta spelet tryck på Enter. Det är knappen till höger på tangentbordet format som ett upp och nedvänt L.
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
