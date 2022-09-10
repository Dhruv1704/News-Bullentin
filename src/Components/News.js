import React, {useState, useEffect} from 'react';
import NewsCard from "./NewsCard";
import Spinner from "./Spinner";
import InfiniteScroll from 'react-infinite-scroll-component';
import Menu from "./Menu";


const News = (props) => {
    const apiKey = "10449f5abe674539bfcea0d7a3f211a1"
    // const apiKey = "d6a71b0dc8974820aef4b84be03d948e"
    // const apiKey = "1f752d733f734af3bfc1c907300496ac"

    const [articles, setArticles] = useState([]);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(true);
    const [totalResults, setTotalResults] = useState(0);


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
        let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${apiKey}&page=${page}&pageSize=${props.pageSize}`
        let data = await fetch(url)
        props.changeProgress(30)
        let parsedData = await data.json()
        props.changeProgress(50)
        setArticles(parsedData.articles)
        setLoading(false)
        setPage(page)
        setTotalResults(parsedData.totalResults)
        props.changeProgress(100)
    }


    const fetchMoreData = async () => {
        // duplicate problem due to setState is asynchronous  this.setState{page : this.state.page+1}
        let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${apiKey}&page=${page + 1}&pageSize=${props.pageSize}`
        let data = await fetch(url)
        let parsedData = await data.json()
        setPage(page + 1)
        setArticles(articles.concat(parsedData.articles))
        setTotalResults(parsedData.totalResults)
    }

    const showMenu = () => {
        const news = document.getElementById('news-div')
        const menu = document.getElementById('menu')
        const menuText = document.getElementById('menu-text')
        if (news.style.display === "block") {
            news.style.display = "none";
            menu.style.display = "block";
            menuText.textContent = "Close"
            document.body.style.background = "#dddddd"
        } else {
            menu.style.display = "none";
            news.style.display = "block";
            document.body.style.background = "white"
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
                {loading && <Spinner/>}

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
                                return <NewsCard title={element.title} description={element.content} key={index}
                                                 img={!element.urlToImage ? "https://cdn.telanganatoday.com/wp-content/uploads/2022/08/iPhone-14-Pro-models-likely-to-come-with-new-ultra-wide-camera.jpg" : element.urlToImage}
                                                 url={element.url} author={element.author} date={element.publishedAt}/>
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
