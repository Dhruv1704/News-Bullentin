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

    const apiKey = process.env.REACT_APP_NEWS_API;
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
        const menu = document.getElementById("menu")
        if (mode === "Dark") {
            setMode("Light")
            document.body.style.background = "#181a1b"
            document.body.style.color = "white"
            menu.classList.add("dark");
            for (let i = 0; i < navItem.length; i++) {
                navItem[i].classList.add("dark-font-color")
            }
        } else {
            setMode("Dark")
            document.body.style.background = "white"
            document.body.style.color = "black"
            menu.classList.remove("dark")
            for (let i = 0; i < navItem.length; i++) {
                navItem[i].classList.remove("dark-font-color")
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
                                          mode={mode} toggleMode={toggleMode}
                                          country={"in"} changeCountry={changeCountry} apiKey={apiKey} pageSize={pageSize}/>}/>
                    <Route exact path={`/${country}/business`}
                           element={<News changeProgress={changeProgress} key={`${country} business`}
                                          category={"business"} mode={mode} toggleMode={toggleMode}
                                          country={country} changeCountry={changeCountry} apiKey={apiKey} pageSize={pageSize}/>}/>
                    <Route exact path={`/${country}/entertainment`}
                           element={<News changeProgress={changeProgress} key={`${country} entertainment`}
                                          category={"entertainment"} mode={mode} toggleMode={toggleMode}
                                          country={country} changeCountry={changeCountry} apiKey={apiKey} pageSize={pageSize}/>}/>
                    <Route exact path={`/${country}/general`}
                           element={<News changeProgress={changeProgress} key={`${country} general`} apiKey={apiKey} category={"news"}
                                          mode={mode} toggleMode={toggleMode}
                                          country={country} changeCountry={changeCountry} pageSize={pageSize}/>}/>
                    <Route exact path={`/${country}/beauty`}
                           element={<News changeProgress={changeProgress} key={`${country} health`} category={"beauty"}
                                          mode={mode} toggleMode={toggleMode}
                                          country={country} changeCountry={changeCountry} apiKey={apiKey} pageSize={pageSize}/>}/>
                    <Route exact path={`/${country}/science`}
                           element={<News changeProgress={changeProgress} key={`${country} science`}
                                          category={"science"} mode={mode} toggleMode={toggleMode}
                                          country={country} changeCountry={changeCountry} apiKey={apiKey} pageSize={pageSize}/>}/>
                    <Route exact path={`/${country}/sports`}
                           element={<News changeProgress={changeProgress} key={`${country} sports`} category={"sports"}
                                          mode={mode} toggleMode={toggleMode}
                                          country={country} changeCountry={changeCountry} apiKey={apiKey} pageSize={pageSize}/>}/>
                    <Route exact path={`/${country}/technology`}
                           element={<News changeProgress={changeProgress} key={`${country} technology`}
                                          category={"tech"} mode={mode} toggleMode={toggleMode}
                                          country={country} changeCountry={changeCountry} apiKey={apiKey} pageSize={pageSize}/>}/>
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
