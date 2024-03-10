/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { useFetch } from "../../hooks/useFetch";
import SectionsTitle from "../global/SectionsTitle";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import AnimeCardStructure from "../global/AnimeCardStructure";


function TopAnimeSection() {
    const URL = "https://api.jikan.moe/v4/top/anime?limit=9";
    const animeData = useFetch(URL);

    return (
        <section className="top-anime">
            <div className="container">
                <SectionsTitle titleName="Global Anime Classification" showViewMore={true} toWhere="animes" />

                <div className="top-animes-holder">
                    {animeData?.data.map((obj, i) => {
                        if (i === animeData.data.length - 1) return;
                        return <AnimeCardStructure key={Math.random()} data={obj} />
                    })
                    }
                </div>
            </div>
        </section>
    )
}

export default TopAnimeSection