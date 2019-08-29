import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
//import App from './App';
import * as serviceWorker from './serviceWorker';


class TypeMe extends React.Component {
    render() {
      return (
        <h1>Try the H shortcut on Jaws</h1>
      );
    }
  }
  
  class TypeHere extends React.Component {

    handleKey = e => {
        switch(e.key) { 
            case 'R': //Jaws regions
            case 'Q': //Jaws main content
            case 'H': //Jaws heading shortcut
            case '1': //Jaws heading 1-6 shortcut
            case '2':
            case '3':
            case '4':
            case '5':
            case '6': 
            case 'L': //Jaws lists
            case 'I': //JAws items
                console.log("Trying to supress "+e.key);
                e.stopPropagation();
                break;
            default:
                
        }
        
    }
    render() {
      return (
        <input type="text" name="TypeHereForm" onKeyDown={this.handleKey}></input>
      );
    }

  }

  
  class Game extends React.Component {
    render() {
      return (
        <div className="game">
          <div className="type-me">
            <TypeMe />
          </div>
          <div className="type-here">
            <TypeHere />
          </div>
          <div>
            <h1>Heading 1A</h1>
            <h2>Heading 2</h2>
            <h3>Heading 3</h3>
            <h4>Heading 4</h4>
            <h5>Heading 5</h5>
            <h6>Heading 6</h6>
            <h1>Heading 1B</h1>
          </div>
        </div>
      );
    }
  }
  

ReactDOM.render(<Game />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
