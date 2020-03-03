
import React from "react"

const Header = (props) => {

    let {score, bestScore} = props

    return (
        <div className="game-header">
            <div className="title-and-score">
                <h1 className="title">1024</h1>
                <div className="score-container">
                    <h5 className="score-title">score</h5>
                    <div className="score-number">{score}</div>
                </div>
                <div className="score-container">
                    <h5 className="score-title">best score</h5>
                    <div className="score-number">{bestScore}</div>
                </div>
            </div>
            <div className="desc-and-new-game">
                <p>Join the numbers and get to the <strong>1024</strong> tile!</p>
            </div>
        </div>
    )
}

export default Header