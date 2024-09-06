/** @jsxImportSource @emotion/react */
import React from 'react';
import { AppBar, Toolbar, Typography } from '@mui/material';
import { css } from '@emotion/react';
import { Link } from 'react-router-dom';
import styled from '@emotion/styled';

const StyledAppBar = styled(AppBar)({
  backgroundColor: 'black',
});

const linkStyle = css({
  textDecoration: 'none',
  color: 'white',
});

const linkStyle2 = css({
  textDecoration: 'none',
  marginLeft: '2rem',
  color: 'white',
});


export default function Navbar() {
  return (
    <StyledAppBar position="fixed">
      <Toolbar>
        <Link to="/" css={linkStyle}>
          <Typography>Pokedex</Typography>
        </Link>
        <Link to="/mypokemon" css={linkStyle2}>
          <Typography>My Pokemons</Typography>
        </Link>
      </Toolbar>
    </StyledAppBar>
  );
}
