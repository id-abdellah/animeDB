/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/jsx-no-target-blank */
/* eslint-disable no-unused-vars */
import { Link, useParams } from "react-router-dom";
import { useFetch } from "../../hooks/useFetch";
import { useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Loader from "../global/Loader";

function CharacterInformations() {
    const charId = useParams().charId;

    const [formatingApiText, setFormatingApiText] = useState("");

    const URL = `https://api.jikan.moe/v4/characters/${charId}/full`;
    const charInfos = useFetch(URL) || "loading";

    useEffect(() => {
        if (charInfos !== "loading") {
            const apiAboutTex = charInfos?.data.about;
            const formatedText = apiAboutTex.replace(/\n/g, "<br>");
            setFormatingApiText(formatedText)
        }
    }, [charInfos]);


    // char animes
    const URL_CHAR_ANIMES = `https://api.jikan.moe/v4/characters/${charId}/anime`;
    const charAnimes = useFetch(URL_CHAR_ANIMES);


    // show more or less char about text
    const textBox = useRef();
    const showMoreLess = useRef();

    useEffect(() => {
        window.scrollTo({ top: 0 })
        if (charInfos !== "loading") {
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
    }, [charAnimes])

    return (
        <div className="character-informations-page">
            <div className="container">

                {
                    charInfos === "loading"
                        ?
                        <>
                            <Loader />
                            <div style={{ height: "110vh" }}></div>
                        </>
                        :
                        <fieldset>
                            <legend>{charInfos?.data.name}</legend>

                            <div className="basic">

                                <div className="pic-info">
                                    <img src={charInfos?.data.images.jpg.image_url} loading="lazy" alt="" />
                                    <div className="other">
                                        <div>
                                            <span>Favourites</span>: {charInfos?.data.favorites} Lovers
                                        </div>
                                        <div>
                                            <span>Kanji Name</span>: {charInfos?.data.name_kanji}
                                        </div>
                                        <div>
                                            <span>Nicknames</span>: {charInfos?.data.nicknames.join(" - ")}
                                        </div>
                                        <div>
                                            <a href={charInfos?.data.url} target="_blank">My anime list page</a>
                                        </div>
                                    </div>
                                </div>

                                <div className="about">
                                    <div className="title">About</div>
                                    <div style={{ display: "-webkit-box" }} ref={textBox} className="text" dangerouslySetInnerHTML={{ __html: formatingApiText }}></div>
                                    <div ref={showMoreLess} className="show-more">show more</div>
                                </div>
                            </div>

                            <div className="voice-actors">
                                <div className="title">Voice Actores</div>
                                <div className="holder">
                                    {
                                        charInfos?.data.voices.map(perosnObj => {
                                            return <Link to={perosnObj.person.url} target="_blank" key={Math.random()} className="person">
                                                <div className="person-img">
                                                    <img src={perosnObj.person.images.jpg.image_url} loading="lazy" alt="" />
                                                </div>
                                                <div className="person-name">
                                                    <div className="name">{perosnObj.person.name}</div>
                                                    <div className="lang">{perosnObj.language}</div>
                                                </div>
                                            </Link>
                                        })
                                    }
                                </div>
                            </div>

                            <div className="animes">
                                <div className="title">Animes</div>

                                <div className="holder">
                                    {
                                        charAnimes?.data.map(animeObj => {
                                            return <Link to={`/animes/${animeObj.anime.mal_id}`} key={Math.random()}>
                                                <div className="pic">
                                                    <img src={animeObj.anime.images.jpg.large_image_url} loading="lazy" alt="" />
                                                </div>
                                                <div className="name">
                                                    {animeObj.anime.title}
                                                </div>
                                                <div className="role">Role: {animeObj.role}</div>
                                            </Link>
                                        })
                                    }
                                </div>
                            </div>
                        </fieldset>
                }


            </div>
        </div>
    )
}

export default CharacterInformations