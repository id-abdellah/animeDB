import Hero from "../global/Hero"
import CurrentSeason from "./CurrentSeasonSection"
import TopAnimeSection from "./TopAnimeSection"
import TopCharactersSection from "./TopCharactersSection"

function HomePage() {

    // useEffect(() => {
    //     window.onscroll = () => {
    //         console.log(window.scrollY)
    //     };
    // })

    return (
        <>
            <Hero />
            <div className="home">
                <TopAnimeSection />
                <CurrentSeason />
                <TopCharactersSection />
            </div>
        </>
    )
}

export default HomePage