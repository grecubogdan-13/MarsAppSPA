import React, {useState, useEffect, useContext, Dispatch, SetStateAction} from 'react';
import {BrowserRouter as Router, Routes, Route, Link} from 'react-router-dom';
import logo from './logo.svg';
import nasaLogo from './NASA.svg';
import './App.css';
import {FormControl, InputLabel, MenuItem, Select, SelectChangeEvent} from "@mui/material";
import axios from "axios";
import {BounceLoader} from "react-spinners";

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

function useCounter(countId: string): [number, Dispatch<SetStateAction<number>>] {
    let countText = localStorage.getItem(countId);
    let countFromLocalStorage = countText ? parseInt(countText) : 0;

    const [count, setCount] = useState(countFromLocalStorage);

    useEffect(() => {
        localStorage.setItem(countId, count.toString());
    });
    return [count, setCount];
}

function Count() {
    const [count, setCount] = useCounter('count');

    return (
        <div>
            <p>You clicked {count} times</p>
            <button onClick={() => setCount(count + 1)}>
                Click me
            </button>
        </div>
    );
}


function Component1() {
    const [count, setCount] = useCounter('count2');

    return <div>
        <Component2 counter={{count, setCount}}></Component2>
        <Component3 counter={{count, setCount}}></Component3>
    </div>
}

function Component2(props: CounterProps) {
    return <div>
        <button onClick={() => props.counter.setCount(props.counter.count + 1)}>
            Click me
        </button>
    </div>
}

function Component3(props: CounterProps) {
    return <div>
        <p>agheheasthath</p>
        <Component4 counter={props.counter}/>
    </div>
}

function Component4(props: CounterProps) {
    return <p>You clicked {props.counter.count} times</p>
}


const MyContext = React.createContext({
    count: 0, setCount: (val: number) => {
    }
});

function Component11() {
    const [count, setCount] = useCounter('count3');

    return <MyContext.Provider value={{count, setCount}}>
        <Component12></Component12>
        <Component13></Component13>
    </MyContext.Provider>
}

function Component12() {
    const context = useContext(MyContext);
    return <div>
        <button onClick={() => context.setCount(context.count + 1)}>
            Click me
        </button>
    </div>
}

function Component13() {
    return <div>
        <p>agheheasthath</p>
        <Component14/>
    </div>
}

function Component14() {
    const context = useContext(MyContext);
    return <p>You clicked {context.count} times</p>
}

function MyTemplate(props: MyTemplateProps) {
    return <div>
        <h1>{props.name}</h1>
        {props.children}
        <img src={props.image} className="App-logo" alt="logo"/>
    </div>
}

function TestNASA() {
    const [data, setData] = useState("");
    const [fetchData, setFetch] = useState(false);

    useEffect(() => {
        if (fetchData) {
            fetch('http://localhost:8000/rovers/curiosity/sol/1000/photos/html')
                .then((response) => response.text()).then((d) => setData(d));
        }
    }, [fetchData]);
    return (
        <div>
            <div dangerouslySetInnerHTML={{__html: data}}/>
            <button onClick={() => setFetch(true)}>Fetch Data</button>
        </div>
    );
};

function FindRovers() {
    const [RoverList, setRoverList] = useState(Array<any>);
    const [SelectedRover, setSelectedRover] = useState("");
    const [CameraList, setCameraList] = useState(Array<any>);
    const [SelectedCamera, setSelectedCamera] = useState("");
    const [getPhotos, setGetPhotos] = useState(false);
    const [photos, setPhotos] = useState([]);
    let [loadingRovers, setLoadingRovers] = useState(true);
    let [loadingCameras, setLoadingCameras] = useState(false);
    let [loadingPhotos, setLoadingPhotos] = useState(false);

    useEffect(() => {
        setLoadingRovers(true);
        axios.get('https://api.nasa.gov/mars-photos/api/v1/rovers?api_key=TxbNgclp1JXLSnghP5ecigSdEUvdMNcabY3p1lno').then(
            (d) => {
                let data = d.data.rovers;
                if (data != null) {
                    setRoverList(data);
                }
                sessionStorage.setItem("rovers", RoverList.toString());
                setLoadingRovers(false);
            }
        ).catch(err => console.log(err));
    }, []);

    useEffect(() => {
        setLoadingCameras(true);
        axios.get('http://localhost:8000/rovers/' + SelectedRover).then(
            (d) => {
                let data = d.data.cameras;
                if (data != null) {
                    setCameraList(data);
                }
                sessionStorage.setItem("cameras", CameraList.toString());
                setLoadingCameras(false);
            }
        ).catch(err => {
            console.log(err);
            setLoadingCameras(false);
        });
    }, [SelectedRover]);

    useEffect(() => {
        if (getPhotos) {
            setLoadingPhotos(true);
            axios.get('http://localhost:8000/rovers/' + SelectedRover + '/sol/1000/camera/' + SelectedCamera + '/photos').then(
                (d) => {
                    let data = d.data.photos;
                    if (data != null) {
                        setPhotos(data.map((element: any) => {
                            return element.img_src;
                        }));
                    }
                    sessionStorage.setItem("photos", photos.toString());
                    setLoadingPhotos(false);
                }
            ).catch(err => console.log(err));
        } else {
            setPhotos([]);
        }
    }, [getPhotos, SelectedCamera]);

    return (
        <div className = "poze">
            <FormControl fullWidth className= "poze">
                <InputLabel id="rover-select" className= "poze">Rover</InputLabel>
                <Select
                    labelId="rover-select"
                    id="rover-select"
                    value={SelectedRover!}
                    label="rover"
                    onChange={(event: SelectChangeEvent) => {
                        sessionStorage.setItem("selectedRover", event.target.value);
                        setSelectedRover(event.target.value);
                        setGetPhotos(false);
                    }}
                >
                    {RoverList.map((rover) => <MenuItem key={rover.id} value={rover.name}>{rover.name}</MenuItem>)}
                </Select>
            </FormControl>
            <p>
                <BounceLoader className= "poze" color={"red"} loading={loadingRovers}/>
            </p>
            <FormControl fullWidth className= "poze">
                <InputLabel id="camera-select" className= "poze">Camera</InputLabel>
                <Select
                    labelId="camera-select"
                    id="camera-select"
                    value={SelectedCamera!}
                    label="camera"
                    onChange={(event: SelectChangeEvent) => {
                        sessionStorage.setItem("selectedRover", event.target.value);
                        setSelectedCamera(event.target.value);
                        setGetPhotos(false);
                    }}
                >
                    {CameraList.map((camera) => {
                        return <MenuItem key={camera.name} value={camera.name}>{camera.full_name}</MenuItem>
                    })}
                </Select>
            </FormControl>
            <p>
                <BounceLoader color={"green"} loading={loadingCameras}/>
            </p>
            <button className= "poze" onClick={() => setGetPhotos(true)}>Get Photos</button>
            <br/>
            <p>
                <BounceLoader color={"blue"} loading={loadingPhotos}/>
            </p>
            {photos.map((photo) => <img className= "poze" key={photo} src={photo}/>)}
        </div>
    )
}

function App() {
    return (
        <Router>
            <h1>Main Title</h1>
            <Routes>
                <Route path="/" element={
                    <Link to="/home">home</Link>
                }
                />
                <Route path="/home" element={
                    <div className="App">
                        <header className="App-header">
                            <img src={logo} className="App-logo" alt="logo"/>
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
                            <Link to="/testnasa"> test </Link>
                            <Link to="/rovers"> nasa photos </Link>
                        </header>
                    </div>
                }/>
                <Route path="/NASA" element={
                    <div>
                        <MyTemplate name="NASA" image={nasaLogo}>
                            <p className="gsg" id={"paragraful1"}>sdhtf st hhesh s </p>
                            <p className="gsg" id={"paragraful2"}>sethahy a skh s</p>
                        </MyTemplate>
                        <Link to="/home"> home </Link>
                        <Link to="/counter1"> counter1 </Link>
                        <Link to="/counter2"> counter2 </Link>
                        <Link to="/counter3"> counter3 </Link>
                    </div>
                }/>
                <Route path="/counter1" element={
                    <div>
                        <p>counter 1</p>
                        <Count></Count>
                        <Link to="/home"> home </Link>
                        <Link to="/NASA"> NASA </Link>
                        <Link to="/counter2"> counter2 </Link>
                        <Link to="/counter3"> counter3 </Link>
                    </div>
                }/>
                <Route path="/counter2" element={
                    <div>
                        <p>counter 2</p>
                        <Component1></Component1>
                        <Link to="/home"> home </Link>
                        <Link to="/NASA"> NASA </Link>
                        <Link to="/counter1"> counter1 </Link>
                        <Link to="/counter3"> counter3 </Link>
                    </div>
                }/>
                <Route path="/counter3" element={
                    <div>
                        <p>counter 3</p>
                        <Component11></Component11>
                        <Link to="/home"> home </Link>
                        <Link to="/NASA"> NASA </Link>
                        <Link to="/counter1"> counter1 </Link>
                        <Link to="/counter2"> counter2 </Link>
                    </div>
                }/>
                <Route path="/testnasa" element={
                    <div>
                        <TestNASA></TestNASA>
                        <Link to="/home"> home </Link>
                    </div>
                }/>
                <Route path="/rovers" element={
                    <div className= "poze">
                        <FindRovers></FindRovers>
                        <Link to="/home"> home </Link>
                    </div>
                }/>
            </Routes>
        </Router>
    );
}

export default App;


