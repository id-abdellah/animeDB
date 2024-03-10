/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";

export default function CharachterCardStructure({ data }) {

    return (
        <Link to={`/characters/${data.mal_id}`} className="char-item" data-charid={data.mal_id}>
            <div className="pic">
                <img src={data.images.jpg.image_url} alt="" />
                <div className="favorites">
                    <span><FontAwesomeIcon icon="fa-solid fa-heart" /></span>
                    <span>{data.favorites}</span>
                </div>
                <div className="char-name">{data.name}</div>
            </div>
        </Link>
    )
}