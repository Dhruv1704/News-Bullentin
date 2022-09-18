import React from 'react'
import {Link} from "react-router-dom";

export default function Menu(props) {
    const showNews = ()=> {
        if (window.innerWidth <= 1053) {
            document.body.style.background = "white"
            setTimeout(() => {
                const news = document.getElementById('news-div')
                const menu = document.getElementById('menu')
                const menuText = document.getElementById('menu-text')
                menu.style.display = "none";
                news.style.display = "block";
                menuText.textContent = "Menu"
            }, 1000)
        }
    }

    return (
        <div id={"menu"}>
            <h3 className={"menu-option"}>Country</h3>
            <li onClick={()=>{props.changeCountry("in")}}>
                <Link to="/in/general" className="nav-item" onClick={()=>{
                    showNews();
                }}>India</Link>
            </li>
            <li onClick={()=>{props.changeCountry("us")}}>
                <Link to="/us/general" className="nav-item" onClick={()=>{
                    showNews();
                }}>America</Link>
            </li>
            <li onClick={()=>{props.changeCountry("ca")}}>
                <Link to="/ca/general" className="nav-item" onClick={()=>{
                    showNews();
                }}>Canada</Link>
            </li>
            <li onClick={()=>{props.changeCountry("ru")}}>
                <Link to="/ru/general" className="nav-item" onClick={()=>{
                    showNews();
                }}>Russia</Link>
            </li>
            <h3 className={"menu-option"}>Category</h3>
            <nav>
                <li>
                    <Link to={`/${props.country}/general`} className="nav-item" onClick={showNews}>General</Link>
                </li>
                <li>
                    <Link to={`/${props.country}/entertainment`} className="nav-item" onClick={showNews}>Entertainment</Link>
                </li>
                <li>
                    <Link to={`/${props.country}/business`} className="nav-item" onClick={showNews}>Business</Link>
                </li>
                <li>
                    <Link to={`/${props.country}/beauty`} className="nav-item" onClick={showNews}>Beauty</Link>
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




var axios = require("axios").default;

var options = {
    method: 'GET',
    url: 'https://api.newscatcherapi.com/v2/search',
    params: {q: 'Bitcoin', lang: 'en', sort_by: 'relevancy', page: '1'},
    headers: {
        'x-api-key': 'your_key_1'
    }
};

axios.request(options).then(function (response) {
    console.log(response.data);
}).catch(function (error) {
    console.error(error);
});