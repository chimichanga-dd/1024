
# 1024
[Live Link](https://ten-twenty-four.herokuapp.com/)

A clone of a clone (2048) of a clone (1024) of a game (threes)

<img src="https://media.giphy.com/media/h5ill3oXrJ2g2Orrej/giphy.gif" alt="demo gif">

### Tech Stack

* React
* Heroku


## Sliding
* Placement of the tiles and sliding via the transform CSS property translate3d

<img src="https://media.giphy.com/media/LQtZ5qnUFHBTifLcy8/giphy.gif" alt="slide gif">

``` javascript
let pos = {transform: `translate3d(${x}, ${y}, 0)`}
<div className={containerClasses} style={pos} key={uid}>
    <div className={tileClass}>
        <p>{tile.value}</p>
    </div>
</div>
```

``` css
.tile{
    transition: transform .15s ease;
}
```

## Merging
* Tiles merge when their values are the same and the direction pushes the two together

<img src="https://media.giphy.com/media/XgAhgfoANGECcaLsfZ/giphy.gif" alt="merge gif">

``` javascript
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
```

## Win or Lose
* Win by creating a 1024 tile
* Lose by filling the board and have no available moves

|      Win      |       Lose       |
| ------------- | ---------------- |
| <img src="https://media.giphy.com/media/QzANvEkbLVGmAkDlGQ/giphy.gif" alt="Win Gif">  | <img src="https://media.giphy.com/media/kDwmaq3O9IeT0grAa2/giphy.gif" alt="Lose Gif">  |





``` javascript
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
            if(tile && tile.value == 1024){
                gameWon = true
            }
        }
    }

    if(!moveable || gameWon){
        window.removeEventListener('keydown', this.handleInput)
    }

    this.setState({moveable, gameWon})
}
```

## Local Storage
* Use local storage to save a users best score
* Update local storage when a new score is higher than the previous best score

<img src="https://media.giphy.com/media/W3Njw2xmZOrhnjShpn/giphy.gif" alt="local storage gif">

``` javascript
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
```
