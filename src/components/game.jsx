

import React from "react";

class Game extends React.Component{

    constructor(props){
        super(props)

        this.state = this.startState()
    }

    startState(){
        let tiles = []
        for(let i = 0; i < 4; i++){
            tiles[i] = [];
            for(let j = 0; j < 4; j++){
                tiles[i][j] = null
            }
        }
        return{
            tiles
        }
    }

    render(){
        return <div>
            <p>GAME LOADED</p>
        </div>
    }

}

export default Game