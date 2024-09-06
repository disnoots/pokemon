import { Box, Grid, Typography } from "@mui/material";
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

export default function MyPokemon() {
  const [pokemonData, setPokemonData] = useState([]);
  const [isData, setIsData] = useState(true);

  const fetchPokemon = async () => {
    setIsData(false);
    const savedIds = JSON.parse(localStorage.getItem("myPokemon")) || [];

    if (savedIds && savedIds.length > 0) {
      try {
        const pokemonDataPromises = savedIds.map(async (savedData) => {
          const response = await axios.get(`${POKEMON_API_URL}/${savedData.id}`);
          if (response.status === 200) {
            const { name, id } = response.data;
            return {
              name: name,
              id: id,
              nickname: savedData.name,
              url: `${IMAGE_API_URL}${id}.png`,
            };
          }
          return null;
        });

        const resolvedPokemonData = await Promise.all(pokemonDataPromises);
        setPokemonData(resolvedPokemonData.filter((data) => data !== null));
      } catch (error) {
        console.error("Failed to fetch Pokémon data", error);
      } finally {
        setIsData(true);
      }
    }
  };

  useEffect(() => {
    fetchPokemon();
  }, []);

  return (
    <>
      <Box backgroundColor="rgb(68, 68, 68)">
        {!isData ? (
          <StyledGrid container spacing={2} display={"flex"} justifyContent="center" alignItems="center" minHeight="100vh">
            <Typography color={"white"}>You don't have any pokemons</Typography>
          </StyledGrid>
        ) : (
          <StyledGrid container spacing={2}>
            {pokemonData.map((pokemon) => (
              <PokemonCard key={pokemon.id} pokemon={pokemon} image={pokemon.url} />
            ))}
          </StyledGrid>
        )}
      </Box>
    </>
  );
}
