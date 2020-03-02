

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
        this.createRandomTiles(2)
        window.addEventListener('keydown', this.handleInput)
    }

    componentWillUnmount(){
        window.removeEventListener('keydown', this.handleInput)
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
            tileIdx: 0,
            moveable: true,
            gameWon: false,
            score: 0,
        }
    }

    random(number){
        return Math.floor(Math.random() * number)
    }

    createRandomTiles(numOfTiles = 1){
        let boardCopy = cloneDeep(this.state.tiles)
        let tileIdx = this.state.tileIdx
        let emptyTiles = []

        for (let i = 0; i < 4; i++) {
            let row = boardCopy[i];
            for (let j = 0; j < 4; j++) {
                let spot = row[j]
                if(!spot)
                emptyTiles.push([i,j])
            }
        }

        for( let i = 0; i < numOfTiles; i++){
            let randomValue = Math.random() < .9 ? 2 : 4;
            let randomNumber = this.random(emptyTiles.length)
            let [x, y] = emptyTiles[randomNumber]
            boardCopy[x][y] = {
                value: randomValue,
                col: x,
                row: y,
                uid: tileIdx,
                canMerge: true
            }
            //remove newly added tile from list of empty tiles
            emptyTiles.splice(randomNumber, 1);
            tileIdx+= 1
        }

        

        this.setState(
            { tiles: boardCopy, tileIdx},
            () => this.setGameStatus()
        )
    }

    move(dir){
        let moveDir = DIRECTIONS[dir]
        let moved = false
        let updatedTiles = cloneDeep(this.state.tiles);
        let updateScore = this.props.updateScore;

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
                    moved = true
                    //use callback from app to update app state then header score
                    updateScore(nextTile.value)
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
                        moved = true
                    }   
                }
            }
        }
    
        if (moved) {
            this.setState(
                { tiles: updatedTiles },
                () => { this.createRandomTiles()}
            )
            moved = false
        }

    }

    canMove(){
        let tiles = this.state.tiles;

        for (let i = 0; i < 4; i++) {
            for (let j = 0; j < 4; j++) {
                let currentTile, rightTile, belowTile

                currentTile = tiles[i][j]

                if(!currentTile){
                    return true
                }

                if (j < 3){
                    rightTile = tiles[i][j + 1]
                    if (currentTile && rightTile && currentTile.value == rightTile.value) {
                        return true
                    }
                }

                if(i < 3){
                    belowTile = tiles[i + 1][j]
                    if(currentTile && belowTile && currentTile.value == belowTile.value){
                        return true
                    }
                }
            }
        }
        return false
    }

    setGameStatus(){
        let moveable = true
        if (!this.canMove()) {
            moveable = false
        }

        let tiles = this.state.tiles
        let gameWon = false
        for (let i = 0; i < 4; i++) {
            for (let j = 0; j < 4; j++) {
                let tile = tiles[i][j]
                if(tile && tile.value == 16){
                    gameWon = true
                }
            }
        }

        if(!moveable || gameWon){
            window.removeEventListener('keydown', this.handleInput)
        }

        this.setState({moveable, gameWon})
    }

    gameMessage(){
        let message
        if( this.state.gameWon){
            message = "You win"
        }else if (!this.state.moveable){
            message = "You lose"
        }else {
            return null
        }

        return(<div className="message-modal">
            <p>{message}</p>
            <button onClick={ () => this.newGame()}>Try again</button>
        </div>)
    }

    newGame(){
        this.props.updateScore()
        this.setState(this.startState(), () => this.createRandomTiles(2))

        //remove event listener if it exists - no harm if it doesn't
        window.removeEventListener('keydown', this.handleInput)
        //add event listener back to the window for a new game
        window.addEventListener('keydown', this.handleInput)
    }

    handleInput(e){
        e.stopPropagation();
        this.move(e.keyCode)
    }

    render(){

        return <div className="game-container">
            <button 
                className="new-game button"
                onClick={() => this.newGame()}                
            >New Game</button>
            {this.gameMessage()}
            <Board 
                tiles={this.state.tiles}
            />
        </div>
    }

}

export default Game