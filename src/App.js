import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Pokedex from "./containers/Pokedex";
import Navbar from "./components/Navbar";
import PokemonDetail from "./containers/PokemonDetail";
import MyPokemon from "./containers/MyPokemon";

export default function App() {
  return (
    <Router>
      <Navbar/>
      <Routes>
        <Route path="/" element={<Pokedex />} />
        <Route path="/pokemon/:id" element={<PokemonDetail />} />
        <Route path="/mypokemon" element={<MyPokemon />} />
      </Routes>
    </Router>
  );
}
