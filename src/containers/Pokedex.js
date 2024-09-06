import { Box, Button, CircularProgress, Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { IMAGE_API_URL, POKEMON_API_URL } from "../config";
import PokemonCard from "../components/PokemonCard";
import styled from "@emotion/styled";

const StyledGrid = styled(Grid)({
  textAlign: "center",
  padding: "70px 10px 0px 10px",
  backgroundColor: "rgb(68, 68, 68)",
});

export default function Pokedex() {
  const [pokemonData, setPokemonData] = useState([]);
  const [offset, setOffset] = useState(20);
  const [loading, setLoading] = useState(false);
  const limit = 20;

  const fetchInitialPokemon = async () => {
    try {
      const response = await axios.get(`${POKEMON_API_URL}?limit=${limit}`);
      if (response.status === 200) {
        const { results } = response.data;
        let newPokemonData = results.map((pokemon, index) => ({
          id: index + 1,
          url: `${IMAGE_API_URL}${index + 1}.png`,
          name: pokemon.name,
        }));
        setPokemonData(newPokemonData);
      }
    } catch (error) {
      console.error("Failed to fetch Pokemon data", error);
    }
  };

  const fetchPokemon = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${POKEMON_API_URL}?limit=${limit}&offset=${offset}`);
      if (response.status === 200) {
        const { results } = response.data;
        let newPokemonData = results.map((pokemon, index) => ({
          id: offset + index + 1,
          url: `${IMAGE_API_URL}${offset + index + 1}.png`,
          name: pokemon.name,
        }));
        setPokemonData((prevData) => [...prevData, ...newPokemonData]);
      }
    } catch (error) {
      console.error("Failed to fetch Pokémon data", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInitialPokemon();
  }, []);

  const loadMorePokemon = () => {
    setOffset((prevOffset) => prevOffset + limit);
    fetchPokemon();
  };

  return (
    <Box backgroundColor="rgb(68, 68, 68)">
      <StyledGrid container spacing={2}>
        {pokemonData.map((pokemon) => (
          <PokemonCard pokemon={pokemon} image={pokemon.url} key={pokemon.id} />
        ))}
      </StyledGrid>
      {loading ? (
        <Box backgroundColor="rgb(68, 68, 68)">
          <StyledGrid container spacing={2} display={"flex"} justifyContent="center" alignItems="center">
            <CircularProgress style={{ marginTop: 20 }} />
          </StyledGrid>
        </Box>
      ) : (
        <Box backgroundColor="rgb(68, 68, 68)">
          <StyledGrid container spacing={2} display={"flex"} justifyContent="center" alignItems="center">
            <Button variant="contained" color="primary" onClick={loadMorePokemon}>
              Load More
            </Button>
          </StyledGrid>
        </Box>
      )}
    </Box>
  );
}
