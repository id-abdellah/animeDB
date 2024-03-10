import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";

function Navbar() {

    const nav = useRef(null);
    const navControler = useRef(null);

    useEffect(() => {
        navControler.current.addEventListener("click", () => {
            nav.current.classList.toggle("open")
        })
    }, [])

    return (
        <nav className="" ref={nav}>
            <div className="logo">
                <a href="/">Obito.</a>
            </div>

            <ul className="links">
                <li><Link to="/">Home page</Link></li>
                <li><Link to="/animes">Top animes</Link></li>
                <li><Link to="/characters">Top Characters</Link></li>
            </ul>

            <div ref={navControler} className="open-close opened">
                <FontAwesomeIcon icon="fa-solid fa-chevron-right" />
            </div>
        </nav>
    )
}

export default Navbar