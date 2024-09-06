import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { Input} from "@mui/material";
import { useState } from "react";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function InputModal({ open, onClose, pokemon }) {
  const [nickname, setNickame] = useState("");

  const handleAcceptClick = () => {
    if (pokemon) {
      const savedPokemon = JSON.parse(localStorage.getItem("myPokemon")) || [];
      const data = {
        name: nickname,
        id: pokemon.id,
      };

      const isAlreadyCaught = savedPokemon.some((item) => item.id === data.id && item.name === data.name);

      if (!isAlreadyCaught) {
        savedPokemon.push(data);
        localStorage.setItem("myPokemon", JSON.stringify(savedPokemon));
        alert(`${nickname} successfully added to collection`);
      } else {
        alert(`${pokemon.name} is already caught with this nickname`);
      }
    }

    onClose();
  };

  return (
    <Modal open={open} onClose={onClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Enter nickname
        </Typography>
        <Input type="text" sx={{ mt: 2 }} onChange={(e) => setNickame(e.target.value)} />
        <Button onClick={handleAcceptClick} sx={{ mt: 2 }} disabled={!nickname} href="/mypokemon">
          Confirm
        </Button>
        <Button onClick={onClose} sx={{ mt: 2 }}>
          Close
        </Button>
      </Box>
    </Modal>
  );
}
