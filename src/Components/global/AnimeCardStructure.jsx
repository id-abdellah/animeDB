/* eslint-disable react/prop-types */
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Link } from "react-router-dom"

export default function AnimeCardStructure({ data }) {
    return (
        <div className="item" data-animeid={data.mal_id}>
            <Link to={`/animes/${data.mal_id}`}>
                <div className="wrapper">
                    <div className="item-image">
                        <img src={data.images.jpg.large_image_url} loading="lazy" alt="" />
                        <div className="status">
                            <div className="score">
                                <span>
                                    <FontAwesomeIcon icon="fa-solid fa-star" />
                                </span>
                                <span>
                                    {data.score}
                                </span>
                            </div>
                            <div className="released-year">
                                {data.aired.prop.from.year}
                            </div>
                            <div className="rank">
                                #{data.rank}
                            </div>
                        </div>

                    </div>
                    <div className="info">
                        <div className="status">
                            <div className="type">{data.type}</div>
                            <div className="airing">{data.airing ? "continuous" : "Complete"}</div>
                            <div className="episodes">Origin: {data.source}</div>
                        </div>
                        <div className="name">{data.title}</div>
                    </div>
                </div>
            </Link>
        </div>
    )
}