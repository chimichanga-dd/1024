
import React from "react";

class GridContainer extends React.Component{

    getGrid(){
        let grid = Array(4).fill().map( (x) => Array(4).fill())
        for(let i=0; i < 4; i++){
            for (let j = 0; j < 4; j++) {
                grid[i][j] = <div className="background-grid-tile"></div>
            }    
        }
        return grid
    }

    render(){
        return <div className="grid-container">{this.getGrid()}</div>
    }

}

export default GridContainer