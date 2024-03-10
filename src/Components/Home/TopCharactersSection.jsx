/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useFetch } from "../../hooks/useFetch";
import SectionsTitle from "../global/SectionsTitle"
import { useEffect, useRef } from "react";
import CharachterCardStructure from "../global/CharactersCardStructure";

export default function TopCharactersSection() {
    const URL = "https://api.jikan.moe/v4/top/characters";

    const characters = useFetch(URL);

    return (
        <section className="top-charachters">
            <div className="container">
                <SectionsTitle titleName="Most Popular Characters" showViewMore={true} toWhere="characters" />

                <div className="characters-holder">
                    {
                        characters?.data.map(objData => {
                            return <CharachterCardStructure key={Math.random()} data={objData} />
                        })
                    }
                </div>
            </div>
        </section>
    )
}


// export default function CharachterCardStructure({ data }) {
//     return (
//         <div className="char-item" data-charid={data.mal_id}>
//             <div className="pic">
//                 <img src={data.images.jpg.image_url} alt="" />
//                 <div className="favorites">
//                     <span><FontAwesomeIcon icon="fa-solid fa-heart" /></span>
//                     <span>{data.favorites}</span>
//                 </div>
//                 <div className="char-name">{data.name}</div>
//             </div>
//         </div>
//     )
// }