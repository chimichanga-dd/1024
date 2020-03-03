
import React from "react"
import Game from "./game"
import Header from "./header"
import GitHubLogo from "../images/GitHubMark/GitHub-Mark-64px.png"


class App extends React.Component{

    constructor(props){
        super(props)

        this.state = {
            score: 0, 
            bestScore: this.getBestScore()
        }
    }

    updateScore(gameScore){
        if (!gameScore) {
            this.setState({score: 0})
        } else {
            let newScore = this.state.score + gameScore
            if (newScore > this.state.bestScore){
                localStorage.setItem("bestScore", newScore)
                this.setState({ score: newScore, bestScore: newScore })
            } else {
                this.setState({ score: newScore })
            }
        }
    }

    getBestScore(){
        return localStorage.getItem("bestScore") || 0
    }

    render(){
        return(
            <div className="app">
                <Header score={this.state.score} bestScore={this.state.bestScore}/>
                <Game updateScore={this.updateScore.bind(this)}/>
                <div className="directions">
                    <strong>HOW TO PLAY:</strong> Use your <strong>arrow keys</strong> to move the tiles. When two tiles with the same number touch, they <strong>merge into one!</strong>
                </div>
                <div className="links">
                    <a 
                        target="_blank"
                        rel="noopener noreferrer"
                        href="https://github.com/chimichanga-dd/1024"><img src={GitHubLogo} alt="git hub mark"/>
                    </a>
                </div>
            </div>
        )
    }
    
}

export default App