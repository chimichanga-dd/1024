

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
        this.createRandomTile()
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

    createRandomTile(){
        let boardCopy = cloneDeep(this.state.tiles)
        let emptyTiles = []

        for (let i = 0; i < 4; i++) {
            let row = boardCopy[i];
            for (let j = 0; j < 4; j++) {
                let spot = row[j]
                if(!spot)
                emptyTiles.push([i,j])
            }
        }

        let randomNumber = this.random(emptyTiles.length)
        
        let [x,y] = emptyTiles[randomNumber]
        boardCopy[x][y] = { 
                            value: 2,
                            col: x,
                            row: y,
                            uid: this.state.tileIdx,
                            canMerge: true
                        }

        this.setState({ tiles: boardCopy, tileIdx: this.state.tileIdx + 1})
    }

    move(dir){
        let moveDir = DIRECTIONS[dir]
        let isMoving = false
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

                currentTile.canMerge = true;

                let nextRow = row + moveDir[1]
                let nextCol = col + moveDir[0]
                let nextTile

                while ((nextRow >=0 && nextRow < 4) && (nextCol >=0 && nextCol < 4)){
                    nextTile = updatedTiles[nextRow][nextCol];
                    if(nextTile){
                        break
                    }
                    nextRow+= moveDir[1]
                    nextCol+= moveDir[0]
                    
                }

                nextRow -= moveDir[1];
                nextCol -= moveDir[0];
                
                if( nextTile && nextTile.canMerge && nextTile.value == currentTile.value ){
                    nextTile.value = nextTile.value * 2;
                    nextTile.canMerge = false;
                    updatedTiles[row][col] = null
                    isMoving = true
                } else {
                    if (nextCol !== col || nextRow !== row) {
                        updatedTiles[nextRow][nextCol] = {
                            value: currentTile.value,
                            row: nextRow,
                            col: nextCol,
                            uid: currentTile.uid,
                            canMerge: true
                        }
                        updatedTiles[row][col] = null
                        isMoving = true
                    }   
                }
            }
        }
    
        if (isMoving){
            this.setState({ tiles: updatedTiles }, () => this.createRandomTile())
            isMoving = false
        }

    }

    handleInput(e){
        e.stopPropagation();
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