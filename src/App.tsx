import React, {useState, useEffect, useContext, Dispatch, SetStateAction} from 'react';
import {BrowserRouter as Router, Routes, Route, Link} from 'react-router-dom';
import logo from './logo.svg';
import nasaLogo from './NASA.svg';
import './App.css';

interface CounterProps {
  counter: {
    count: number;
    setCount: Dispatch<SetStateAction<number>>;
  }
}

interface MyTemplateProps {
  name: string;
  image: string;
  children: JSX.Element[];
}

function Count() {
  let countText = localStorage.getItem('count');
  let countFromLocalStorage = countText ? parseInt(countText!) : 0;

  const [count, setCount] = useState(countFromLocalStorage);

  useEffect(() => {
    localStorage.setItem('count', count.toString());
  });

  return (
      <div>
        <p>You clicked {count} times</p>
        <button onClick={() => setCount(count + 1)}>
          Click me
        </button>
      </div>
  );
}


function Component1(){
  let countText = localStorage.getItem('count2');
  let countFromLocalStorage = countText ? parseInt(countText!) : 0;
  const [count, setCount] = useState(countFromLocalStorage);
  useEffect(() => {
    localStorage.setItem('count2', count.toString());
  });
  return <div>
    <Component2 counter = {{count, setCount}} ></Component2>
    <Component3 counter = {{count, setCount}} ></Component3>
  </div>
}

function Component2(props: CounterProps){
  return <div>
    <button onClick={() => props.counter.setCount(props.counter.count + 1)}>
      Click me
    </button>
  </div>
}

function Component3(props: CounterProps){
  return <div>
    <p>agheheasthath</p>
    <Component4 counter = {props.counter}/>
  </div>
}

function Component4(props: CounterProps){
  return <p>You clicked {props.counter.count} times</p>
}


const MyContext = React.createContext({count: 0, setCount: (val: number) => {}});

function Component11(){
  let countText = localStorage.getItem('count3');
  let countFromLocalStorage = countText ? parseInt(countText!) : 0;
  const [count, setCount] = useState(countFromLocalStorage);
  useEffect(() => {
    localStorage.setItem('count3', count.toString());
  });
  return <MyContext.Provider value={{count, setCount}}>
    <Component12></Component12>
    <Component13></Component13>
  </MyContext.Provider>
}

function Component12(){
  const context = useContext(MyContext);
  return <div>
    <button onClick={() => context.setCount(context.count + 1)}>
      Click me
    </button>
  </div>
}

function Component13(){
  return <div>
    <p>agheheasthath</p>
    <Component14/>
  </div>
}

function Component14(){
  const context = useContext(MyContext);
  return <p>You clicked {context.count} times</p>
}


function MyTemplate(props: MyTemplateProps){
  return <div>
    <h1>{props.name}</h1>
    {props.children}
    <img src={props.image} className="App-logo" alt="logo" />
  </div>
}

function App() {
  return (
      <Router>
        <h1>Main Title</h1>
        <Routes>
          <Route path = "/home" element = {
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
                <Link to="/NASA"> NASA </Link>
                <Link to="/counter1"> counter1 </Link>
                <Link to="/counter2"> counter2 </Link>
                <Link to="/counter3"> counter3 </Link>
              </header>
            </div>
          }/>
          <Route path = "/NASA" element = {
            <div>
              <MyTemplate name="NASA" image={nasaLogo}>
                <p>sdhtf st hhesh s </p>
                <p>sethahy a skh s</p>
              </MyTemplate>
              <Link to="/home"> home </Link>
              <Link to="/counter1"> counter1 </Link>
              <Link to="/counter2"> counter2 </Link>
              <Link to="/counter3"> counter3 </Link>
            </div>
          }/>
          <Route path = "/counter1" element = {
            <div>
              <p>counter 1</p>
              <Count></Count>
              <Link to="/home"> home </Link>
              <Link to="/NASA"> NASA </Link>
              <Link to="/counter2"> counter2 </Link>
              <Link to="/counter3"> counter3 </Link>
            </div>
          }/>
          <Route path = "/counter2" element = {
            <div>
              <p>counter 2</p>
              <Component1></Component1>
              <Link to="/home"> home </Link>
              <Link to="/NASA"> NASA </Link>
              <Link to="/counter1"> counter1 </Link>
              <Link to="/counter3"> counter3 </Link>
            </div>
          }/>
          <Route path = "/counter3" element = {
            <div>
              <p>counter 3</p>
              <Component11></Component11>
              <Link to="/home"> home </Link>
              <Link to="/NASA"> NASA </Link>
              <Link to="/counter1"> counter1 </Link>
              <Link to="/counter2"> counter2 </Link>
            </div>
          }/>
        </Routes>
      </Router>
  );
}

export default App;
