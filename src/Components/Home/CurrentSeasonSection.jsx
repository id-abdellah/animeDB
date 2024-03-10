import { useFetch } from "../../hooks/useFetch";
import AnimeCardStructure from "../global/AnimeCardStructure";
import SectionsTitle from "../global/SectionsTitle"

function CurrentSeason() {
    const URL = "https://api.jikan.moe/v4/seasons/now?limit=8";
    const animeData = useFetch(URL);
    return (
        <section className="current-season-anime">
            <div className="container">
                <SectionsTitle titleName="Current Season" showViewMore={true} toWhere="seasons" />

                <div className="current-season-holder">
                    {
                        animeData?.data.map(dataObj => {
                            return <AnimeCardStructure key={Math.random()} data={dataObj} />
                        })
                    }
                </div>
            </div>
        </section>
    )
}

export default CurrentSeason