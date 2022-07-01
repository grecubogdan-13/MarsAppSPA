import React, {useState, useEffect, useContext} from 'react';
import logo from './logo.svg';
import nasaLogo from './NASA.svg';
import './App.css';

function Count(){
  let countText = localStorage.getItem('count');
  let countInt: number = 0;
  if(countText == null){
    countInt = 0;
  }
  else {
    countInt = parseInt(countText);
  }
  const [count,setCount] = useState(countInt);

  useEffect(() => {
    localStorage.setItem('count',count.toString());
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
  let countInt: number = 0;
  if(countText == null){
    countInt = 0;
  }
  else {
    countInt = parseInt(countText);
  }
  const [count,setCount] = useState(countInt);
  useEffect(() => {
    localStorage.setItem('count2',count.toString());
  });
  return <div>
    <Component2 counter = {{count,setCount}} ></Component2>
    <Component3 counter = {{count,setCount}} ></Component3>
  </div>
}

function Component2(props: any){
  return <div>
    <button onClick={() => props.counter.setCount(props.counter.count + 1)}>
      Click me
    </button>
  </div>
}

function Component3(props: any){
  return <div>
    <p>agheheasthath</p>
    <Component4 counter = {props.counter}/>
  </div>
}

function Component4(props: any){
  return <p>You clicked {props.counter.count} times</p>
}


const MyContext = React.createContext({count: 0, setCount: (val: number)=>{}});

function Component11(){
  let countText = localStorage.getItem('count3');
  let countInt: number = 0;
  if(countText == null){
    countInt = 0;
  }
  else {
    countInt = parseInt(countText);
  }
  const [count,setCount] = useState(countInt);
  useEffect(() => {
    localStorage.setItem('count3',count.toString());
  });
  return <MyContext.Provider value={{count,setCount}}>
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
  const context = useContext(MyContext);
  return <div>
    <p>agheheasthath</p>
    <Component14/>
  </div>
}

function Component14(){
  const context = useContext(MyContext);
  return <p>You clicked {context.count} times</p>
}


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
          <p>counter 1</p>
          <Count></Count>
          <p>counter 2</p>
          <Component1></Component1>
          <p>counter 3</p>
          <Component11></Component11>
        </header>
      </div>
  );
}

export default App;
