import React, {useState, useEffect} from 'react';
import NewsCard from "./NewsCard";
import Spinner from "./Spinner";
import InfiniteScroll from 'react-infinite-scroll-component';
import Menu from "./Menu";


const News = (props) => {
    let axios = require("axios").default;
    const apiKey = props.apiKey;

    const [articles, setArticles] = useState([]);
    const [page, setPage] = useState(1);
    const totalResults = 68;

    const capatalize = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    useEffect(() => {
        document.title = `News Bulletin - ${capatalize(props.category)}`;
        update();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])   // problem here infinte api calls as useEffect runs multiple times, use [] to solve.  imp


    const update = async () => {  // Wll run after render() is done executing.
        props.changeProgress(10)
        let url = `https://api.newscatcherapi.com/v2/latest_headlines?&countries=${props.country}&topic=${props.category}&page=${page}&page_size=${props.pageSize}&lang=en`
        let options = {
            method: 'GET',
            url: url,
            headers: {
                'x-api-key': apiKey
            }
        };
        let data = axios.request(options)
        props.changeProgress(30)
        let parsedData = (await data).data
        props.changeProgress(50)
        setArticles(parsedData.articles)
        props.changeProgress(100)
    }


    const fetchMoreData = async () => {
        // duplicate problem due to setState is asynchronous  this.setState{page : this.state.page+1}
        let url = `https://api.newscatcherapi.com/v2/latest_headlines?&countries=${props.country}&topic=${props.category}&page=${page+1}&page_size=${props.pageSize}&lang=en`
        let options = {
            method: 'GET',
            url: url,
            headers: {
                'x-api-key': apiKey
            }
        };
        let data = axios.request(options)
        let parsedData = (await data).data
        setPage(page + 1)
        setArticles(articles.concat(parsedData.articles))
    }

    const showMenu = () => {
        const news = document.getElementById('news-div')
        const menu = document.getElementById('menu')
        const menuText = document.getElementById('menu-text')
        if (news.style.display === "block") {
            news.style.display = "none";
            menu.style.display = "block";
            menuText.textContent = "Close"
        } else {
            menu.style.display = "none";
            news.style.display = "block";
            menuText.textContent = "Menu"
        }
    }

    const countryName = (element) => {
        switch (element) {
            case "in":
                return "India"
            case "us":
                return "America"
            case "au":
                return "Australia"
            case "ca":
                return "Canada"
            default:
                return ""

        }
    }

    return (
        <div className={"container"}>
            <div id={"news-div"}>
                <h1>{`Top ${countryName(props.country)}'s ${capatalize(props.category)} Headlines`}</h1>

                <InfiniteScroll
                    dataLength={articles.length}
                    next={fetchMoreData}
                    hasMore={articles.length !== totalResults}
                    loader={<Spinner/>}
                    endMessage={
                        <p style={{ textAlign: 'center' }}>
                            <b>No more news</b>
                        </p>
                    }
                >
                    <div id={"news-row"}>
                        <div className={"row"}>
                            {articles.map((element, index) => {
                                return <NewsCard title={element.title} description={element.summary.slice(0,230)+"..."} key={index}
                                                 img={!element.media? "https://cdn.telanganatoday.com/wp-content/uploads/2022/08/iPhone-14-Pro-models-likely-to-come-with-new-ultra-wide-camera.jpg" : element.media}
                                                 url={element.link} author={element.author} date={element.published_date}/>
                            })}
                        </div>
                    </div>
                </InfiniteScroll>
            </div>
            <div id={"menu-button"} onClick={showMenu}>
                <span id={"menu-text"}>Menu</span>
            </div>
            <Menu country={props.country} mode={props.mode} changeCountry={props.changeCountry}/>
        </div>
    );
}


export default News;
