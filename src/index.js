import React from "react";
import ReactDOM from "react-dom";
import Game from "./components/game"



document.addEventListener("DOMContentLoaded", () => {
    let gameContainer = document.getElementById("app-container");
    ReactDOM.render(<Game />, gameContainer)
})
