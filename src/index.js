import React from "react";
import ReactDOM from "react-dom";
import Board from "./components/board"



document.addEventListener("DOMContentLoaded", () => {
    let gameContainer = document.getElementById("game-container");
    ReactDOM.render(<Board />, gameContainer)
})
