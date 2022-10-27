import React from 'react'
import {Link} from "react-router-dom";

export default function Menu(props) {

    const modeToggle = ()=>{
        const navItem = document.getElementsByClassName('nav-item')
        const menu = document.getElementById("menu")
        if (props.mode === "Light") {
            document.body.style.background = "#181a1b"
            document.body.style.color = "white"
            menu.classList.add("dark");
            for (let i = 0; i < navItem.length; i++) {
                navItem[i].classList.add("dark-font-color")
            }
        } else {
            document.body.style.background = "white"
            document.body.style.color = "black"
            menu.classList.remove("dark")
            for (let i = 0; i < navItem.length; i++) {
                navItem[i].classList.remove("dark-font-color")
            }
        }
    }

    const showNews = ()=> {
        if (window.innerWidth <= 1053) {
            setTimeout(() => {
                const news = document.getElementById('news-div')
                const menu = document.getElementById('menu')
                const menuText = document.getElementById('menu-text')
                menu.style.display = "none";
                news.style.display = "block";
                menuText.textContent = "Menu";
            }, 1000)
        }
        setTimeout(()=>{  // routes to another page and refreshes the dom. that is why 1 sec timeout
            modeToggle();
        },0)
    }

    return (
        <div id={"menu"}>
            <h3 className={"menu-option"}>Country</h3>
            <li onClick={()=>{props.changeCountry("in")}}>
                <Link to="/in/general" className="nav-item " onClick={()=>{
                    showNews();
                }}>India</Link>
            </li>
            <li onClick={()=>{props.changeCountry("us")}}>
                <Link to="/us/general" className="nav-item " onClick={()=>{
                    showNews();
                }}>America</Link>
            </li>
            <li onClick={()=>{props.changeCountry("ca")}}>
                <Link to="/ca/general" className="nav-item " onClick={()=>{
                    showNews();
                }}>Canada</Link>
            </li>
            <li onClick={()=>{props.changeCountry("au")}}>
                <Link to="/au/general" className="nav-item " onClick={()=>{
                    showNews();
                }}>Australia</Link>
            </li>
            <h3 className={"menu-option"}>Category</h3>
            <nav>
                <li>
                    <Link to={`/${props.country}/general`} className="nav-item " onClick={showNews}>General</Link>
                </li>
                <li>
                    <Link to={`/${props.country}/entertainment`} className="nav-item " onClick={showNews}>Entertainment</Link>
                </li>
                <li>
                    <Link to={`/${props.country}/business`} className="nav-item " onClick={showNews}>Business</Link>
                </li>
                <li>
                    <Link to={`/${props.country}/beauty`} className="nav-item " onClick={showNews}>Beauty</Link>
                </li>
                <li>
                    <Link to={`/${props.country}/science`} className="nav-item" onClick={showNews}>Science
                    </Link></li>
                <li>
                    <Link to={`/${props.country}/sports`} className="nav-item" onClick={showNews}>Sports
                    </Link></li>
                <li>
                    <Link to={`/${props.country}/technology`} className="nav-item" onClick={showNews}>Technology</Link>
                </li>
            </nav>
        </div>
    )
}