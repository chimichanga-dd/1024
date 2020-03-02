
import React from "react"
import Game from "./game"
import Header from "./header"
import GitHubLogo from "../images/GitHubMark/GitHub-Mark-64px.png"


class App extends React.Component{

    constructor(props){
        super(props)

        this.state = {
            score: 0
        }
    }

    updateScore(gameScore){
        if (!gameScore) {
            this.setState({score: 0})
        } else {
            this.setState({ score: this.state.score + gameScore });
        }
    }

    render(){
        return(
            <div className="app">
                <Header score={this.state.score}/>
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