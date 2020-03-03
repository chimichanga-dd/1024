
import React from "react"
import Tile from "./tile"

class TileContainer extends React.Component{ 

    getTiles(){
        let tiles = []
        this.props.tiles.forEach( (row, idx1) => {
            row.forEach( (tile, idx2) => {
                if(tile){
                    tiles.push({ tile, 
                                 row: idx1,
                                 col: idx2, 
                                 uid: tile.uid, 
                                 newTile: tile.newTile,
                                 mergeTile: tile.canMerge,
                                })
                }
            })
        })
        return tiles.map( (tile) => <Tile
                                        tile={tile}
                                        row={tile.row}
                                        col={tile.col}
                                        key={tile.uid}
                                        uid={tile.uid}
                                        newTile={tile.newTile}
                                        mergeTile={tile.mergeTile}
                                    />
                        )
    }


    render(){
        return <div className="tile-container">
            {this.getTiles()}
        </div>
    }

}

export default TileContainer