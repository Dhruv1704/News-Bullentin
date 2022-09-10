import React from 'react';
import {Link} from "react-router-dom";

const Navbar = (props) => {

    return (
        <div className={"navbar"}>
            <nav className="navbar" id={"nav"}>
                <div className="title-div">
                    <Link to="/" className="site-title">NEWS BULLETIN</Link>
                </div>
                <div className="dark-div">
                    <button type="button" className="dark-btn" onClick={props.toggleMode}>{`Enable ${props.mode} Mode`}</button>
                </div>
            </nav>
        </div>
    );
}

export default Navbar;