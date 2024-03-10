/* eslint-disable react/prop-types */

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Link } from "react-router-dom"

function SectionsTitle({ titleName, showViewMore, toWhere }) {
    return (
        <div className="section-title">
            <div className="wrapper">
                <h2>{titleName}</h2>
                {
                    showViewMore
                        ?
                        <Link to={`/${toWhere}`}>
                            <span>View All</span>
                            <span><FontAwesomeIcon icon="fa-solid fa-arrow-right" /></span>
                        </Link>
                        :
                        null
                }
            </div>
        </div >
    )
}

export default SectionsTitle    