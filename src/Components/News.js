import React, {useState, useEffect} from 'react';
import NewsCard from "./NewsCard";
import Spinner from "./Spinner";
import InfiniteScroll from 'react-infinite-scroll-component';
import Menu from "./Menu";


const News = (props) => {
    let axios = require("axios").default;
    // const apiKey = "10449f5abe674539bfcea0d7a3f211a1"
    // const apiKey = "d6a71b0dc8974820aef4b84be03d948e"
    // const apiKey = "1f752d733f734af3bfc1c907300496ac"
    // const apiKey = "cLmatSBFo8RVDSjp2q4NaAsJndDey2z85zvD3ksB";  // the newsapi
    // const apiKey = "1f752d733f734af3bfc1c907300496ac"
    const apiKey = "nnkpqabxlsJyTcY7DdlZErzZ4iom0amt5Ja6S-5g1fE";
    // const apiKey = "f0e37a95198478377e5ff3b1b55ec553"

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
        // let url = `https://mycorsproxy-d.herokuapp.com/https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${apiKey}&page=${page}&pageSize=${props.pageSize}`
        // let url =`https://mycorsproxy-d.herokuapp.com/https://api.thenewsapi.com/v1/news/top?api_token=${apiKey}&locale=${props.country}&limit=${props.pageSize}&categories=${props.category}&page=${page}`
        // let data = await fetch(url)
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
        // let url = `https://mycorsproxy-d.herokuapp.com/https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${apiKey}&page=${page + 1}&pageSize=${props.pageSize}`
        // let data = await fetch(url)
        // let parsedData = await data.json()
        // let url =`https://mycorsproxy-d.herokuapp.com/https://api.thenewsapi.com/v1/news/top?api_token=${apiKey}&locale=${props.country}&page=${page+1}&limit=${props.pageSize}&categories=${props.category}`
        // let url = `http://api.mediastack.com/v1/news?access_key=${apiKey}&keywords=general&countries=us`
        // let data = await fetch(url)
        // let parsedData =  await data.json();
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
        const darkBtn = document.getElementById('dark')
        if (news.style.display === "block") {
            news.style.display = "none";
            menu.style.display = "block";
            darkBtn.style.display = 'none'
            menuText.textContent = "Close"
            if(props.mode==="Light"){
                document.body.style.background = "#1d1f20"
            }
            else{
                document.body.style.background = "#f7f7f7"
            }
        } else {
            menu.style.display = "none";
            news.style.display = "block";
            darkBtn.style.display = 'block'
            if(props.mode==="Light"){
                document.body.style.background = "#181a1b"
            }
            else{
                document.body.style.background = "white"
            }
            menuText.textContent = "Menu"
        }
    }

    const countryName = (element) => {
        switch (element) {
            case "in":
                return "India"
            case "us":
                return "America"
            case "ru":
                return "Russia"
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
            <Menu country={props.country} changeCountry={props.changeCountry}/>
        </div>
    );
}


export default News;
