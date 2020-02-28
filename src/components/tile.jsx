import React from "react"

class Tile extends React.Component{

    render(){
        let{ tile, col, row } = this.props
        let x = col * (100 + 10) + 'px'
        let y = row * (100 + 10) + 'px'
        let pos = {transform: `translate3d(${x}, ${y}, 0)`}
        return <div className="tile" style={pos}>
            {tile.tile.value}
        </div>
    }

}

export default Tile