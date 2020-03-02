import React from "react";
import ReactDOM from "react-dom";
import Game from "./components/game"
import Header from "./components/header"


const App = () => {
    return <div className="app">
        <Header />
        <Game />
    </div>
}


document.addEventListener("DOMContentLoaded", () => {
    let gameContainer = document.getElementById("app-container");
    ReactDOM.render(<App />, gameContainer)
})
