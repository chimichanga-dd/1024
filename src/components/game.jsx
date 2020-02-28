

import React from "react";
import Board from "./board"

class Game extends React.Component{

    constructor(props){
        super(props)

        this.state = this.startState()
    }

    componentDidMount(){
        this.randomTile()
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

    random(number){
        return Math.floor(Math.random() * number)
    }

    copyArray(i_array){
        return i_array.map(function(arr){
            return arr.slice()
        })
    }

    randomTile(){
        let x = this.random(4)
        let y = this.random(4)
        let boardCopy = this.copyArray(this.state.tiles)
        boardCopy[x][y] = { value: 2, col: x, row: y }
        this.setState({tiles: boardCopy})
    }

    render(){
        return <div className="board-container">
            <Board tiles={this.state.tiles}/>
        </div>
    }

}

export default Game