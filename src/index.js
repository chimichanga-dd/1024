import React from "react";
import ReactDOM from "react-dom";
import App from "./components/app"


document.addEventListener("DOMContentLoaded", () => {
    let gameContainer = document.getElementById("app-container");
    ReactDOM.render(<App />, gameContainer)
})
