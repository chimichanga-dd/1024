import React from "react"

class Tile extends React.Component{

    render(){
        let{ tile, col, row, uid, newTile} = this.props
        
        tile = tile.tile
        newTile = newTile ? "new-tile" : ""

        let containerClasses = [`tile`, `tile-val-${tile.value}`].join(" ")
        let tileClass = [`inner-tile`,`${newTile}`].filter(Boolean).join(" ")

        let x = col * (100 + 10) + 'px'
        let y = row * (100 + 10) + 'px'
        let pos = {transform: `translate3d(${x}, ${y}, 0)`}
        return <div className={containerClasses} style={pos} key={uid}>
            <div className={tileClass}>
                <p>{tile.value}</p>
            </div>
        </div>
    }

}

export default Tile