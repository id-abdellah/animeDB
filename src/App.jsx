/* eslint-disable no-unused-vars */
import { Link, Route, Routes } from "react-router-dom"
import Navbar from "./Components/global/Navbar"
import Hero from "./Components/global/Hero"
import HomePage from "./Components/Home/HomePage"
import GlobalClassificationAnime from "./Components/Top-Anime/GlobalClassificationAnimePage"
import CharactersPage from "./Components/Characters/CharactersPage"
import CharacterInformations from "./Components/character-info/CharacterInformations"
import AnimeInfoPage from "./Components/anime-info-page/AnimeInfoPage"
import Footer from "./Components/global/Footer"
import ScrollToTopButton from "./Components/global/ScrollToTopButton"


function App() {

  return (
    <>
      <Navbar />
      <ScrollToTopButton />
      {/* <Hero /> */}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/animes" element={<GlobalClassificationAnime />} />
        <Route path="/animes/:animeId" element={<AnimeInfoPage />} />
        <Route path="/characters" element={<CharactersPage />} />
        <Route path="/characters/:charId" element={<CharacterInformations />} />
      </Routes>
      <Footer />
    </>
  )
}

export default App