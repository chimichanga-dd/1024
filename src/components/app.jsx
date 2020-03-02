
import React from "react"
import Game from "./game"
import Header from "./header"


class App extends React.Component{

    constructor(props){
        super(props)

        this.state = {
            score: null
        }
    }

    updateScore(gameScore){
        this.setState({ score: this.state.score + gameScore });
    }

    render(){
        return(
            <div className="app">
                <Header score={this.state.score}/>
                <Game updateScore={this.updateScore.bind(this)}/>
            </div>
        )
    }
    
}

export default App