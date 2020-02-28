
import React from "react"
import TileContainer from "./tile_container";
import GridContainer from "./grid_container"


const DIRECTIONS = {
    "ArrowUp": [1, 0],
    "ArrowDown": [-1, 0],
    "ArrowLeft": [0, -1],
    "ArrowRight": [0, 1],
}

class Board extends React.Component{

    constructor(props){
        super(props)
        this.state = {}
    }

    render(){
        return <div className="board">
            <GridContainer />
            <TileContainer tiles={this.props.tiles}/>
        </div>
    }

}

export default Board