import React from 'react';
//import { connect } from 'react-redux';
//import { IRootState } from '../../shared/reducers';
import { Link } from 'react-router-dom';

import './home.scss';

//const mapStateToProps = ( state: IRootState) => ({
//});

//type StateProps = ReturnType<typeof mapStateToProps>;

//type IProps = StateProps;

const Home = () => {

  return (
    <div className="container pad-top-60 text-center">
      <h1>Typing in the dark</h1>
      <div className="row flex flex-center">
        <div className="col-2">
          <Link to="/explore" className="button">Starta</Link>
        </div>
      </div>
    </div>
  );
}

export default Home;
