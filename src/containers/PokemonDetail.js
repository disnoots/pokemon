import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { POKEMON_API_URL } from "../config";
import { Box, Button, CircularProgress, Grid, Typography } from "@mui/material";
import styled from "@emotion/styled";
import { PokeballIcon } from "../asset";
import { getCardColor } from "../components/CardBackgroundColor";
import PokemonMoveCard from "../components/PokemonMoveCard";
import InputModal from "../components/InputModal";

const StyledBoxContainer = styled(Box)({
  height: "100%",
  color: "white",
  marginTop: "75px",
  textAlign: "center",
  borderRadius: "5px",
  paddingTop: "30px",
});

const StyledTypography = styled(Typography)({
  textTransform: "upperCase",
  fontFamily: "Pokemon Solid",
});

const StyledImg = styled.img({
  width: "170px",
  height: "170px",
});

const StyledBoxInfo = styled(Box)({
  bottom: "60px",
  //position: "absolute",
  width: "100%",
});

const StyledHr = styled.hr({
  height: "0.01mm",
  width: "95%",
});

const StyledButton = styled(Button)({
  height: "60px",
  width: "60px",
  marginTop: "15px",
  background: `url(${PokeballIcon}) no-repeat center center`,
  backgroundSize: "contain",
});

const StyledText = styled(Typography)({
  fontSize: "30px",
  marginBottom: "1rem",
});

const StyledBoxInfoBottom = styled(Box)({
  bottom: "0px",
  //position: "absolute",
  width: "100%",
  display: "flex",
  alignItems: "center",
  flexDirection: "column",
  textAlign: "center",
});

const StyledMovesBox = styled(Box)({});

const StyledMovesGrid = styled(Grid)({
  textAlign: "center",
  padding: "10px 10px 10px 10px",
  width: "100%",
});

export default function PokemonDetail() {
  const { id } = useParams();
  const [pokemon, setPokemon] = useState(null);
  const [color, setColor] = useState("#000000");
  const [isModalOpen, setModalOpen] = useState(false);
  const [random, setRandom] = useState(null);

  useEffect(() => {
    if (id) {
      axios.get(`${POKEMON_API_URL}/${id}`).then((response) => {
        if (response.status === 200) {
          console.log(response.data);
          const fetchedPokemon = response.data;
          setPokemon(fetchedPokemon);

          if (fetchedPokemon.sprites.front_default) {
            const cardBackgroundColor = async () => {
              const color = await getCardColor(fetchedPokemon.sprites.front_default);
              if (color) {
                setColor(color);
              }
            };
            cardBackgroundColor();
          }
        }
      });
    }
  }, [id]);

  const generateRandomBoolean = () => {
    const boolValue = Math.random() >= 0.5;
    setRandom(boolValue);
  };

  const handleButtonClick = () => {
    generateRandomBoolean();
    if (random) {
      alert(`${pokemon.name} was caught!`);
      if (pokemon) {
        setModalOpen(true);
      }
    }
    else
    {
      alert(`${pokemon.name} ran away`);
    }
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  return (
    <>
      {pokemon ? (
        <div>
          <Box backgroundColor="rgb(68, 68, 68)">
            <StyledBoxContainer sx={{ backgroundColor: color }}>
              <StyledTypography variant="h1">{pokemon.name}</StyledTypography>
              <Grid item md={2}>
                <StyledImg src={pokemon.sprites.front_default}></StyledImg>
                <StyledImg src={pokemon.sprites.back_default}></StyledImg>
              </Grid>
              <StyledBoxInfo>
                <StyledHr />
                <Grid container>
                  <Grid item md={1}>
                    <StyledButton onClick={handleButtonClick} />
                  </Grid>
                  <Grid item md={2}>
                    <StyledText>
                      Name
                      <br />
                      {pokemon.name}
                    </StyledText>
                  </Grid>
                  <Grid item md={2}>
                    <StyledText>
                      Height
                      <br />
                      {pokemon.height} m
                    </StyledText>
                  </Grid>
                  <Grid item md={2}>
                    <StyledText>
                      Weight
                      <br />
                      {pokemon.weight} kg
                    </StyledText>
                  </Grid>
                  {pokemon.types.map((pokemonType, index) => {
                    const { name } = pokemonType.type;
                    return (
                      <Grid item md={2}>
                        <StyledText>
                          Type {index + 1}
                          <br />
                          {name}
                        </StyledText>
                      </Grid>
                    );
                  })}
                </Grid>
              </StyledBoxInfo>

              <StyledBoxInfoBottom>
                <StyledHr />
                <StyledText>Moves</StyledText>
                <StyledMovesBox>
                  <StyledMovesGrid container spacing={2}>
                    {pokemon.moves.map((pokemonMoves) => {
                      const { name } = pokemonMoves.move;
                      return PokemonMoveCard({ name });
                    })}
                  </StyledMovesGrid>
                </StyledMovesBox>
              </StyledBoxInfoBottom>
            </StyledBoxContainer>
          </Box>
          <InputModal open={isModalOpen} onClose={handleCloseModal} pokemon={pokemon} />
        </div>
      ) : (
        <Grid justifyContent="center" alignItems="center">
          <CircularProgress style={{ marginTop: 100 }} />
        </Grid>
      )}
    </>
  );
}
