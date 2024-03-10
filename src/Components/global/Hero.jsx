/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import attackOnTitanBig from "./../../Assets/images/hero/attack-on-titan-big.jpg"
import bleachBig from "./../../Assets/images/hero/bleach-big.jpeg"
import demonSlayerBig from "./../../Assets/images/hero/demon-slayer-big.jpg"
import drStoneBig from "./../../Assets/images/hero/dr-stone-big.jpg"
import monsterBig from "./../../Assets/images/hero/monster-big.jpg"
import jjkBig from "./../../Assets/images/hero/jjk-big.jpg"
import attackOnTitanCover from "./../../Assets/images/hero/attack-on-titan-cover.jpg"
import bleachCover from "./../../Assets/images/hero/bleach-cover.jpg"
import demonSlayerCover from "./../../Assets/images/hero/demon-slayer-cover.jpg"
import drStoneCover from "./../../Assets/images/hero/dr-stone-cover.jpeg"
import monsterCover from "./../../Assets/images/hero/monster-cover.jpg"
import jjkCover from "./../../Assets/images/hero/jjk-cover.jpg"
import { useEffect, useState } from "react"


import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

import { library } from '@fortawesome/fontawesome-svg-core'
import { far } from '@fortawesome/free-regular-svg-icons'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { fab } from '@fortawesome/free-brands-svg-icons'
library.add(far, fas, fab);


const BACKGROUNDS_IMAGES = [attackOnTitanBig, bleachBig, demonSlayerBig, drStoneBig, monsterBig, jjkBig];
const COVERS = [attackOnTitanCover, bleachCover, demonSlayerCover, drStoneCover, monsterCover, jjkCover];

export default function Hero() {
    const [backgroundsIndex, setBackgroundsIndex] = useState(0);

    function nextBackground() {
        if (backgroundsIndex === BACKGROUNDS_IMAGES.length - 1) {
            setBackgroundsIndex(0)
            return
        }
        setBackgroundsIndex(prev => prev + 1)
    }
    function prevBackground() {
        if (backgroundsIndex === 0) {
            setBackgroundsIndex(BACKGROUNDS_IMAGES.length)
        }
        setBackgroundsIndex(prev => prev - 1)
    }

    // interval to auto swape between slided
    // useEffect(() => {
    //     const interval = setInterval(() => {
    //         if (backgroundsIndex === BACKGROUNDS_IMAGES.length - 1) {
    //             setBackgroundsIndex(0)
    //             return
    //         }
    //         setBackgroundsIndex(prev => prev + 1)
    //     }, 7000);
    //     return () => clearInterval(interval);
    // }, [backgroundsIndex]);

    return (
        <section className="hero" >
            <div className="hero-images">
                <img src={BACKGROUNDS_IMAGES[backgroundsIndex]} loading="lazy" alt="" draggable="false" />
                <div className="overlay"></div>
                <div className="next-arrow-container">
                    <div onClick={() => nextBackground()} className="arrow next-arrow"><FontAwesomeIcon icon="fa-solid fa-chevron-right" /></div>
                </div>
                <div className="prev-arrow-container">
                    <div onClick={() => prevBackground()} className="arrow prev-arrow"><FontAwesomeIcon icon="fa-solid fa-chevron-left" /></div>
                </div>
                <div className="holderr">
                    <div className="covers-slider">
                        {COVERS.map(
                            (item, index) =>
                                <CoversSlider
                                    key={index}
                                    src={item}
                                    coverIndex={index}
                                    backgroundsIndex={backgroundsIndex}
                                    setBackgroundsIndex={setBackgroundsIndex}
                                />)}
                    </div>
                </div>
            </div>
        </section>
    )
}


function CoversSlider({ src, coverIndex, backgroundsIndex, setBackgroundsIndex }) {
    return (
        <div className="item">
            <img
                src={src}
                alt=""
                className={coverIndex === backgroundsIndex ? `active` : null}
                onClick={() => setBackgroundsIndex(coverIndex)}
                draggable="false"
                loading="lazy"
            />
        </div>
    )
}