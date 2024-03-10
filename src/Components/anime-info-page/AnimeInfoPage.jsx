/* eslint-disable no-undef */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { Link, useParams } from "react-router-dom";
import { useFetch } from "../../hooks/useFetch";
import { useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { text } from "@fortawesome/fontawesome-svg-core";
import CharachterCardStructure from "../global/CharactersCardStructure";
import Loader from "../global/Loader";

export default function AnimeInfoPage() {

    const [tab, setTab] = useState("0");

    useEffect(() => {
        let allTabs = Array.from(document.querySelectorAll(`.tabs ul li`));
        allTabs.forEach(tab => tab.classList.remove("active"))
        let currentTab = document.querySelector(`.tabs ul li[data-tabindex="${tab}"]`);
        currentTab.classList.add("active")
    }, [tab])

    function tabsClick(e) {
        setTab(e.target.dataset.tabindex)
    }

    return (
        <div className="anime-info-page">
            <div className="container">

                <div className="tabs">
                    <ul>
                        <li onClick={(e) => tabsClick(e)} data-tabindex="0">Details</li>
                        <li onClick={(e) => tabsClick(e)} data-tabindex="1">Characters & Staff</li>
                        <li onClick={(e) => tabsClick(e)} data-tabindex="2">Stats</li>
                    </ul>
                </div>

                <div className="tab-content">
                    {
                        [
                            <Details key={Math.random()} />,
                            <Characters key={Math.random()} />,
                            <Stats key={Math.random()} />
                        ][+tab]
                    }
                </div>

            </div>
        </div>
    )
}


// details tab is done
function Details() {
    const animeId = useParams().animeId;

    const URL = `https://api.jikan.moe/v4/anime/${animeId}`;
    const animeDetails = useFetch(URL) || "loading";

    // show more or less char about text
    const textBox = useRef();
    const showMoreLess = useRef();
    useEffect(() => {
        window.scrollTo({ top: 0 })
        if (animeDetails !== "loading") {
            showMoreLess.current.addEventListener("click", () => {
                const displayProp = textBox.current.style.display;
                if (displayProp === "-webkit-box") {
                    textBox.current.style.display = "block";
                    showMoreLess.current.innerHTML = "show less";
                } else if (displayProp === "block") {
                    textBox.current.style.display = "-webkit-box";
                    showMoreLess.current.innerHTML = "show more";
                }
            })
        }
    }, [animeDetails])

    return (
        <div className="details-tab">

            {
                animeDetails === "loading"
                    ?
                    <>
                        <Loader />
                        <div style={{ height: "110vh" }}></div>
                    </>
                    :
                    <>
                        <h2 className="tab-sub-title">General Informations</h2>
                        <div className="section-one">
                            <div className="pic">
                                <img src={animeDetails?.data.images.jpg.large_image_url} loading="lazy" alt="" />
                                <div className="rank">
                                    #{animeDetails?.data.rank}
                                </div>
                                <div className="score">
                                    <span><FontAwesomeIcon icon="fa-solid fa-star" /></span>
                                    {animeDetails?.data.score}
                                </div>
                                <div className="favorites">
                                    <span><FontAwesomeIcon icon="fa-solid fa-heart" /></span>
                                    {animeDetails?.data.favorites}
                                </div>
                            </div>
                            <div className="infos">
                                <div>
                                    <span>Title</span>: {animeDetails?.data.title}
                                </div>
                                <div>
                                    <span>Japanese title</span>: {animeDetails?.data.title_japanese}
                                </div>
                                <div>
                                    <span>Type</span>: {animeDetails?.data.type}
                                </div>
                                <div>
                                    <span>Source</span>: {animeDetails?.data.source}
                                </div>
                                <div>
                                    <span>Status</span>: {animeDetails?.data.status}
                                </div>
                                <div>
                                    <span>Episodes</span>: {animeDetails?.data.episodes}
                                </div>
                                <div>
                                    <span>Duration</span>: {parseInt(animeDetails?.data.duration)} min per episode
                                </div>
                                <div>
                                    <span>Rating</span>: {animeDetails?.data.rating}
                                </div>
                                <div>
                                    <span>Season</span>: {animeDetails?.data.season} {animeDetails?.data.year}
                                </div>
                                <div>
                                    <span>Genres</span>: {animeDetails?.data.genres.concat(animeDetails.data.demographics).map(genre => genre.name).join(", ")}
                                </div>
                                <div>
                                    <span>Studios</span>: {animeDetails?.data.studios.map(studio => studio.name).join(", ")}
                                </div>
                            </div>
                        </div>
                        <div className="synopsis">
                            <h2 className="tab-sub-title">Synopsis</h2>
                            <div style={{ display: "-webkit-box" }} ref={textBox}>{animeDetails?.data.synopsis}</div>
                            <a ref={showMoreLess}>show more</a>
                        </div>
                        <div className="trailer">
                            <h2 className="tab-sub-title">Trailer</h2>
                            <div>
                                {
                                    animeDetails?.data.trailer.youtube_id === null
                                        ?
                                        <p className="yt-null">
                                            Something Went Wrong :)
                                        </p>
                                        :
                                        <iframe width="753" height="380"
                                            src={`https://www.youtube.com/embed/${animeDetails?.data.trailer.youtube_id}`}>
                                        </iframe>
                                }
                            </div>
                        </div>
                    </>
            }

        </div>
    )
}

function Characters() {
    const animeId = useParams().animeId;

    const URL = `https://api.jikan.moe/v4/anime/${animeId}/characters`;
    const animeCharacters = useFetch(URL) || "loading";

    return (
        <div className="characters-tab">

            {
                animeCharacters === "loading"
                    ?
                    <>
                        <Loader />
                        <div style={{ height: "110vh" }}></div>
                    </>
                    :
                    <>
                        <h2 className="tab-sub-title">Main Characters</h2>
                        <div className="characters main-role">
                            {animeCharacters?.data.map(char => {
                                if (char.role === "Main") {
                                    return <CharactersCard key={Math.random()} data={char} />
                                }
                            })}
                        </div>
                        <h2 className="tab-sub-title">Supporting Characters</h2>
                        <div className="characters main-role">
                            {animeCharacters?.data.map(char => {
                                if (char.role !== "Main") {
                                    return <CharactersCard key={Math.random()} data={char} />
                                }
                            })}
                        </div>
                    </>
            }


        </div>
    )
}

function Stats() {
    const animeId = useParams().animeId;

    const URL = `https://api.jikan.moe/v4/anime/${animeId}/statistics`;
    const animeEpisodes = useFetch(URL);

    return (
        <div className="stats-tab" style={{ minHeight: "500px" }}>
            <div className="score score_10">
                <div className="num">10</div>
                <div className="stats-holder">
                    <span data-perc={`${animeEpisodes?.data.scores[9].percentage}% (${animeEpisodes?.data.scores[9].votes} votes)`} style={{ width: `${animeEpisodes?.data.scores[9].percentage}%` }}></span>
                </div>
            </div>
            <div className="score score_9">
                <div className="num">9</div>
                <div className="stats-holder">
                    <span data-perc={`${animeEpisodes?.data.scores[8].percentage}% (${animeEpisodes?.data.scores[8].votes} votes)`} style={{ width: `${animeEpisodes?.data.scores[8].percentage}%` }}></span>
                </div>
            </div>
            <div className="score score_8">
                <div className="num">8</div>
                <div className="stats-holder">
                    <span data-perc={`${animeEpisodes?.data.scores[7].percentage}% (${animeEpisodes?.data.scores[7].votes} votes)`} style={{ width: `${animeEpisodes?.data.scores[7].percentage}%` }}></span>
                </div>
            </div>
            <div className="score score_7">
                <div className="num">7</div>
                <div className="stats-holder">
                    <span data-perc={`${animeEpisodes?.data.scores[6].percentage}% (${animeEpisodes?.data.scores[6].votes} votes)`} style={{ width: `${animeEpisodes?.data.scores[6].percentage}%` }}></span>
                </div>
            </div>
            <div className="score score_6">
                <div className="num">6</div>
                <div className="stats-holder">
                    <span data-perc={`${animeEpisodes?.data.scores[5].percentage}% (${animeEpisodes?.data.scores[5].votes} votes)`} style={{ width: `${animeEpisodes?.data.scores[5].percentage}%` }}></span>
                </div>
            </div>
            <div className="score score_5">
                <div className="num">5</div>
                <div className="stats-holder">
                    <span data-perc={`${animeEpisodes?.data.scores[4].percentage}% (${animeEpisodes?.data.scores[4].votes} votes)`} style={{ width: `${animeEpisodes?.data.scores[4].percentage}%` }}></span>
                </div>
            </div>
            <div className="score score_4">
                <div className="num">4</div>
                <div className="stats-holder">
                    <span data-perc={`${animeEpisodes?.data.scores[3].percentage}% (${animeEpisodes?.data.scores[3].votes} votes)`} style={{ width: `${animeEpisodes?.data.scores[3].percentage}%` }}></span>
                </div>
            </div>
            <div className="score score_3">
                <div className="num">3</div>
                <div className="stats-holder">
                    <span data-perc={`${animeEpisodes?.data.scores[2].percentage}% (${animeEpisodes?.data.scores[2].votes} votes)`} style={{ width: `${animeEpisodes?.data.scores[2].percentage}%` }}></span>
                </div>
            </div>
            <div className="score score_2">
                <div className="num">2</div>
                <div className="stats-holder">
                    <span data-perc={`${animeEpisodes?.data.scores[1].percentage}% (${animeEpisodes?.data.scores[1].votes} votes)`} style={{ width: `${animeEpisodes?.data.scores[1].percentage}%` }}></span>
                </div>
            </div>
            <div className="score score_1">
                <div className="num">1</div>
                <div className="stats-holder">
                    <span data-perc={`${animeEpisodes?.data.scores[0].percentage}% (${animeEpisodes?.data.scores[0].votes} votes)`} style={{ width: `${animeEpisodes?.data.scores[0].percentage}%` }}></span>
                </div>
            </div>
        </div>
    )
}

// characters card
function CharactersCard({ data }) {
    return (
        <Link to={`/characters/${data.character.mal_id}`} className="char-item">
            <div className="pic">
                <img src={data.character.images.jpg.image_url} loading="lazy" alt="" />
                <div className="favorites">
                    <span><FontAwesomeIcon icon="fa-solid fa-heart" /></span>
                    <span>{data.favorites}</span>
                </div>
                <div className="char-name">{data.character.name}</div>
            </div>
        </Link>
    )
}