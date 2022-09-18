import './App.css';

import React, {useState} from 'react';
import Navbar from "./Components/Navbar";
import News from "./Components/News";
import {
    BrowserRouter,
    Routes,
    Route,
} from "react-router-dom";
import LoadingBar from "react-top-loading-bar";

const App = () => {
    const pageSize = 8

    const [progress, setProgress] = useState(0);
    const [country, setCountry] = useState("in");
    const [mode, setMode] = useState("Dark");

    const changeProgress = (progress) => {
        setProgress(progress)
    }

    const changeCountry = (country) => {
        setCountry(country)
    }

    const toggleMode = () => {
        const navItem = document.getElementsByClassName('nav-item')
        if (mode === "Dark") {
            setMode("Light")
            document.body.style.background = "#181a1b"
            document.body.style.color = "white"
            document.getElementById('menu').style.background = "#1d1f20"
            for (let i = 0; i < navItem.length; i++) {
                navItem[i].style.color = "white"
            }
        } else {
            setMode("Dark")
            document.body.style.background = "white"
            document.body.style.color = "black"
            document.getElementById('menu').style.background = "#f7f7f7"
            for (let i = 0; i < navItem.length; i++) {
                navItem[i].style.color = "black"
            }

        }
    }

    return (
        <div>
            <BrowserRouter>
                <Navbar mode={mode} toggleMode={toggleMode}/>
                <LoadingBar
                    height={3}
                    color={"#00adee"}
                    progress={progress}
                />
                <Routes>
                    <Route exact path="/"
                           element={<News changeProgress={changeProgress} key={`${country} general`} category={"news"}
                                          mode={mode}
                                          country={"in"} changeCountry={changeCountry} pageSize={pageSize}/>}/>
                    <Route exact path={`/${country}/business`}
                           element={<News changeProgress={changeProgress} key={`${country} business`}
                                          category={"business"} mode={mode}
                                          country={country} changeCountry={changeCountry} pageSize={pageSize}/>}/>
                    <Route exact path={`/${country}/entertainment`}
                           element={<News changeProgress={changeProgress} key={`${country} entertainment`}
                                          category={"entertainment"} mode={mode}
                                          country={country} pchangeCountry={changeCountry} ageSize={pageSize}/>}/>
                    <Route exact path={`/${country}/general`}
                           element={<News changeProgress={changeProgress} key={`${country} general`} category={"news"}
                                          mode={mode}
                                          country={country} changeCountry={changeCountry} pageSize={pageSize}/>}/>
                    <Route exact path={`/${country}/beauty`}
                           element={<News changeProgress={changeProgress} key={`${country} health`} category={"beauty"}
                                          mode={mode}
                                          country={country} changeCountry={changeCountry} pageSize={pageSize}/>}/>
                    <Route exact path={`/${country}/science`}
                           element={<News changeProgress={changeProgress} key={`${country} science`}
                                          category={"science"} mode={mode}
                                          country={country} changeCountry={changeCountry} pageSize={pageSize}/>}/>
                    <Route exact path={`/${country}/sports`}
                           element={<News changeProgress={changeProgress} key={`${country} sports`} category={"sports"}
                                          mode={mode}
                                          country={country} changeCountry={changeCountry} pageSize={pageSize}/>}/>
                    <Route exact path={`/${country}/technology`}
                           element={<News changeProgress={changeProgress} key={`${country} technology`}
                                          category={"tech"} mode={mode}
                                          country={country} changeCountry={changeCountry} pageSize={pageSize}/>}/>
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
