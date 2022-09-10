import React from 'react';

const NewsCard = (props) => {
    let {title, description, img, url, author, date} = props
    return (
        <div className={"card"}>
            <img src={img} alt={"..."} className={"img"}/>
            <div className={"card-body"}>
                <h2>{title}</h2>
                <p>{description ? description : "..."}</p>
                <p><small>By {author ? author : "unknown"} on {new Date(date).toGMTString()}</small></p>
                <a className={"btn"} href={url} target={"_blank"} rel={"noreferrer"}>Read More</a>
            </div>
        </div>
    );

}


export default NewsCard;
