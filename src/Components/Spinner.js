import React from 'react';
import spinner from "./Spinner-200px.gif"

const Spinner = () => {
    return (
        <>
            <div className={"spinner"}>
                <img src={spinner} alt="loading"/>
            </div>
        </>
    )
        ;
}

export default Spinner;