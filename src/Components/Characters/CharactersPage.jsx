/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { useFetch } from "../../hooks/useFetch";
import CharachterCardStructure from "../global/CharactersCardStructure";
import Loader from "../global/Loader";

export default function CharactersPage() {

    const [pagination, setPagination] = useState(1);
    const [charactersData, setCharactersData] = useState([]);
    const URL = `https://api.jikan.moe/v4/top/characters?page=${pagination}`;
    const getData = useFetch(URL);

    useEffect(() => {
        if (getData) {
            setCharactersData([
                ...charactersData,
                ...getData.data
            ])
        }
    }, [getData])

    return (
        <div className="characters-page">
            <div className="container">
                <div className="page-title">
                    <h2>Characters</h2>
                </div>

                {
                    charactersData.length === 0
                        ?
                        <>
                            <Loader />
                            <div style={{ height: "110vh" }}></div>
                        </>
                        :
                        <div className="chars-holder">
                            {
                                charactersData.map(dataObj => {
                                    return <CharachterCardStructure key={Math.random()} data={dataObj} />
                                })
                            }
                        </div>

                }

                {
                    charactersData.length !== 0
                        ?
                        <div className="load-more">
                            <button onClick={() => setPagination(prev => prev + 1)}>Load More Characters</button>
                        </div>
                        : null
                }
            </div>
        </div>
    )
}
