
import React from "react"
import Game from "./game"
import Header from "./header"


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
            </div>
        )
    }
    
}

export default App