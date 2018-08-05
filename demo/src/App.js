import React from 'react';
import logo from './logo.svg';
import './App.css';

// Navigation Class - Use state to open and close menu, add classes and drive UI //
class Navigation extends React.Component {
  constructor(props) {
    super(props);
    this.buttonSize = 150;
    this.state = {
      menu: false,
    };
  }
  getPosition = (index) => {
    const {
      items,
      classes
    } = this.props;
    const {
      menu
    } = this.state;
    const size = this.buttonSize;
    const steps = 360 / items.length;
    const top = menu ? `${Math.sin(steps * index * Math.PI / 180) * size + size / 3}px` : '50%';
    const left = menu ? `${Math.cos(steps * index * Math.PI / 180) * size + size / 3}px` : '50%';
    return {
      top,
      left,
    };
  };
  menuToggle = () => {
    this.setState({
      menu: !this.state.menu
    });
  };
  render() {
    const {
      items
    } = this.props;
    const {
      menu
    } = this.state;
    const navigation = items.map((item, index) => {
      const position = this.getPosition(index);
      const inlineStyle = {
        ...position,
        transitionDelay: `${index * 50}ms`
      };
      return (
        <a 
          key = {`link${index}`}
          style = { inlineStyle }
          className = {`button ${menu ? 'open' : null}`}>
          {item}
        </a>
      );
    });
    return (
      <div className="wrapper">
        <button className={`circle ${menu ? 'open' : null}`} onClick = {this.menuToggle}>
          <span>
            {this.state.menu ? 'close' : 'open' }
          </span>
        </button>
        {navigation}
      </div>
    );
  }
}

// Demo Application - Sub navigation buttons will arrange themselves around the circle depending on amount //
class App extends React.Component {
  render() {
    const items = ['proj1', 'proj2', 'proj3', 'linkedIn', 'github', 'contact', 'about', 'favs'];
    return (
      <div id="widget">
        <Navigation items = {items}/>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("app"));
export default App;
