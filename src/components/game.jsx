

import React from "react";
import Board from "./board"
import cloneDeep from 'lodash/clonedeep'

const DIRECTIONS = {
    37: [-1, 0], //left
    38: [0, -1], //up
    39: [1, 0], //right
    40: [0, 1], //down
}

class Game extends React.Component{

    constructor(props){
        super(props)

        this.state = this.startState()
        this.handleInput = this.handleInput.bind(this)
    }

    componentDidMount(){
        this.randomTile()
        setTimeout(() => {
            this.randomTile()
        }, 1);
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
            tiles,
            tileIdx: 0
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
        console.log(this.state)
        let boardCopy = cloneDeep(this.state.tiles)
        boardCopy[x][y] = { value: 2, col: x, row: y, uid: this.state.tileIdx}

        this.setState({ tiles: boardCopy, tileIdx: this.state.tileIdx + 1})
    }

    move(dir){
        let moveDir = DIRECTIONS[dir]
        
        let updatedTiles = cloneDeep(this.state.tiles);

        for(let i = 0; i < 4; i++){
            for(let j = 0; j < 4; j++){
                let row = i
                let col = j;

                //down arrow
                if(dir == 40){
                    row = 4 - i - 1
                }
                //right arrow
                if(dir == 39){
                    col = 4 - j - 1
                }
                
                let currentTile = updatedTiles[row][col]

                if(!currentTile){ continue }

                let nextRow = row + moveDir[1]
                let nextCol = col + moveDir[0]

                while ((nextRow >=0 && nextRow < 4) && (nextCol >=0 && nextCol < 4)){
                    let nextCell = updatedTiles[nextRow][nextCol];
                    if(nextCell){
                        console.log(`nextRow: ${nextRow}, nextCol:${nextCol}`)
                        console.log(nextCell)
                        console.log("broken")
                        break
                    }
                    nextRow+= moveDir[1]
                    nextCol+= moveDir[0]
                    
                }
    
                nextRow -= moveDir[1];
                nextCol -= moveDir[0];
                
                if (nextCol !== col || nextRow !== row){
                    console.log("different column")
                    updatedTiles[nextRow][nextCol] = { value: currentTile.value, 
                                                       row: nextRow,
                                                       col: nextCol, 
                                                       uid: currentTile.uid }
                    updatedTiles[row][col] = null
                }
            }
        }

        
            
            this.setState({ tiles: updatedTiles })
        
        console.log(this.state.tiles)
        
    }

    handleInput(e){
        console.log(e.keyCode)
        this.move(e.keyCode)
        
    }

    render(){
        return <div className="board-container" 
                onKeyDown={this.handleInput}
                tabIndex="0"
            >
            <Board 
                tiles={this.state.tiles}
            />
        </div>
    }

}

export default Game