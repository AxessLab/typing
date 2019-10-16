import React from 'react';
import { connect } from 'react-redux';
import { IRootState } from '../../shared/reducers';
import { RouteComponentProps, Link } from 'react-router-dom';

//Images
import logo1 from '../../static/images/Fosauri.svg';
import logo2 from '../../static/images/Onzua.svg';


const mapStateToProps = ({ explore } : IRootState, ownProps) => ({
  handleKey: ownProps.handleKey,
  handleAnimation: ownProps.handleAnimation
});

const mapDispatchToProps = {
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export interface ITaskProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

const ExploreMenu : React.FC<ITaskProps> = (props : ITaskProps) => {

  const handleKey = (event : React.KeyboardEvent) => {
    //props.handleKey(event);
    if(event.keyCode === 38 || event.keyCode === 40) {
      //todo: keyboard navigation in menu
    }
  }

  return (
    <>
      <div className="container pad-top-60 text-center">
        <h1>Välj ninja</h1>
        <p>Tryck pil ned eller upp för att navigera. Välj genom att trycka på enter.</p>
        <div className="flex-m flex-wrap-m flex-center-m pad-top-10">
          <div className="explore__menu col-2-l col-12 pad-top-30">      
            <ul
              tabIndex={-1} 
              role="menu"
              onKeyUp={handleKey}>
                <li role="none">
                    <Link role="menuitem" to="/explore/1">
                      <img src={logo1} alt="Fosuari character" className="menu"/>
                    </Link>
                </li>
                <li role="none">
                    <Link role="menuitem" to="/explore/2">  
                      <img src={logo2} alt="Onzua character" className="pad-top-20 menu"/>
                    </Link>
                </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}



export default connect(mapStateToProps)(ExploreMenu);
