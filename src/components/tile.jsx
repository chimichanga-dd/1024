import React from "react"

class Tile extends React.Component{

    render(){
        let{ tile, col, row, uid } = this.props
        let x = col * (100 + 10) + 'px'
        let y = row * (100 + 10) + 'px'
        let pos = {transform: `translate3d(${x}, ${y}, 0)`}
        return <div className={`tile tile-val-${tile.tile.value}`} style={pos} key={uid}>
            <p>{tile.tile.value}</p>
        </div>
    }

}

export default Tile