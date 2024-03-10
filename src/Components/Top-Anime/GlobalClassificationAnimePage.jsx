/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { useEffect, useRef, useState } from "react";
import { useFetch } from "../../hooks/useFetch";
import AnimeCardStructure from "../global/AnimeCardStructure";
import Loader from "../global/Loader";

function GlobalClassificationAnime() {
    const [paginationTracker, setPaginationTracker] = useState(1);
    const [classificationData, setClassificationData] = useState([]);

    const URL = `https://api.jikan.moe/v4/top/anime?page=${paginationTracker}`;

    const getingData = useFetch(URL);

    useEffect(() => {
        if (getingData) {
            setClassificationData([
                ...classificationData,
                ...getingData.data
            ])
        }
    }, [getingData])

    function loadMore() {
        setPaginationTracker(prev => prev + 1)
    }

    return (
        <div className="global-classification-anime">
            <div className="container">

                <div className="page-title">
                    <h2>Anime Classification According to Global Rating</h2>
                </div>


                {
                    classificationData.length === 0
                        ?
                        <>
                            <Loader />
                            <div style={{ height: "110vh" }}></div>
                        </>
                        :
                        <div className="classification-wrapper">
                            {
                                classificationData.length > 0
                                    ?
                                    classificationData.map((obj, i) => {
                                        if (!obj.rank) obj.rank = " Not Ranked"
                                        return <AnimeCardStructure key={Math.random()} data={obj} />
                                    })
                                    : null
                            }
                        </div>
                }


                {
                    classificationData.length !== 0
                        ?
                        <div className="pagination-controler">
                            <button onClick={() => loadMore()}>Load More</button>
                        </div>
                        :
                        null
                }

            </div>
        </div>
    )
}

export default GlobalClassificationAnime


/*
function GlobalClassificationAnime() {
    const [paginationTracker, setPaginationTracker] = useState(1);
    const URL = `https://api.jikan.moe/v4/top/anime?page=1`;
    const classificationData = useFetch(URL);


    const prevPageDisabled = paginationTracker === 1;

    // to scroll into pageTitle when click next or prev button 
    const pageTitle = useRef(null);

    function nextPage() {
        setPaginationTracker(prev => prev + 1)
        pageTitle.current.scrollIntoView({
            behavior: "smooth",
            block: "start"
        })
    }

    function prevPage() {
        if (paginationTracker === 1) return;
        setPaginationTracker(prev => prev - 1)
        pageTitle.current.scrollIntoView({
            behavior: "smooth",
            block: "start"
        })
    }

    return (
        <div className="global-classification-anime">
            <div className="container">

                <div className="page-title" ref={pageTitle}>
                    <h2>Anime Classification According to Global Rating</h2>
                </div>

                <div className="pagination-tracker">
                    Page {classificationData?.pagination.current_page} Of {classificationData?.pagination.last_visible_page}
                </div>
                <div className="classification-wrapper">
                    {classificationData?.data.sort((a, b) => a.rank - b.rank).map((obj, i) => {
                        return <AnimeCardStructure key={Math.random()} data={obj} />
                    })
                    }
                </div>

                {
                    classificationData !== undefined
                        ?
                        <div className="pagination-controler">
                            <button className={`${prevPageDisabled ? "paginationDisabled" : null}`} onClick={() => prevPage()}>Previous Page</button>
                            <button onClick={() => nextPage()}>Next Page</button>
                        </div>
                        :
                        null
                }

            </div>
        </div>
    )
}
*/