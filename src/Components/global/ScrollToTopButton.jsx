import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useRef } from "react";

function ScrollToTopButton() {

    const button = useRef(null);

    useEffect(() => {
        window.addEventListener("scroll", () => {
            let scrollValue = window.scrollY;
            if (scrollValue >= 1000) {
                button.current.style.display = "grid";
            } else {
                button.current.style.display = "none";
            }
        })
        button.current.addEventListener("click", () => {
            window.scrollTo({ behavior: "smooth", top: 0 })
        })
    }, [])

    return (
        <div ref={button} id="scroll-to-top-button"><FontAwesomeIcon icon="fa-solid fa-arrow-up" /></div>
    )
}

export default ScrollToTopButton