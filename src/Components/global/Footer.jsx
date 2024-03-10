import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

function Footer() {
    return (
        <footer>
            <div className="container">
                <div>
                    <span>Made with</span>
                    <span><FontAwesomeIcon icon="fa-solid fa-heart" /></span>
                    <span>By <a href="https://github.com/id-abdellah" target="_target">Mohamed</a></span>
                </div>

                <ul className="contact-links">
                    <li><a rel="noreferrer" target="_blank" href="https://twitter.com/med_idabdellah"><FontAwesomeIcon icon="fa-brands fa-x-twitter" /></a></li>
                    <li><a rel="noreferrer" target="_blank" href="https://github.com/id-abdellah"><FontAwesomeIcon icon="fa-brands fa-github" /></a></li>
                    <li><a rel="noreferrer" target="_blank" href="https://web.facebook.com/master.mohamed.16100921?locale=ar_AR"><FontAwesomeIcon icon="fa-brands fa-facebook" /></a></li>
                </ul>
            </div>
        </footer>
    )
}

export default Footer