import React from 'react';
import logo from './logo.svg';
import nasaLogo from './NASA.svg';
import './App.css';

function MyTemplate(props: any){
  return <div>
    <h1>{props.name}</h1>
    <p>{props.paragraph1}</p>
    <p>{props.paragraph2}</p>
    <img src={props.image} className="App-logo" alt="logo" />
  </div>
}

function App() {
  return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.tsx</code> and save to reload.
          </p>
          <a
              className="App-link"
              href="https://reactjs.org"
              target="_blank"
              rel="noopener noreferrer"
          >
            Learn React
          </a>
          <MyTemplate name="NASA" paragraph1="agsgahuoaoa aung aa iabng ka " paragraph2="aggraathh shsh siklesa lsjh ls" image={nasaLogo} />
        </header>
      </div>
  );
}

export default App;
