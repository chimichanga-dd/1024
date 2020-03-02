
import React from "react"

class Header extends React.Component {

    constructor(props){
        super(props)

        this.state = {
            score: 0
        }
    }

    componentDidUpdate(prevProps) {
        if ( prevProps.score != this.props.score){
            this.setState({score: this.props.score})
        }
    }

    render(){
        let score = this.state.score

        return (
            <div className="game-header">
                <div className="title-and-score">
                    <h1 className="title">1024</h1>
                    <div className="score-container">
                        <h5 className="score-title">score</h5>
                        <div className="score-number">{score}</div>
                    </div>
                </div>
                <div className="desc-and-new-game">
                    <p>Join the numbers and get to the <strong>1024</strong> tile!</p>
                    <button> DOES NOTHING </button>
                </div>
            </div>
        )
    }
}

export default Header