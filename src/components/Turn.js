import React from 'react';
import './ChessBoard.styl'
import {connect} from "react-redux";
import {Container} from "reactstrap";


let Turn = ({turn}) => (
    <Container>
        <div className="turn">
            {
                turn === 'W' ? 'White' : 'Black'
            }
            's turn
        </div>
    </Container>
);

const mapStateToProps = (state) => {
    return {
        turn: state.turn
    }
};

const mapDispatchToProps =(dispatch) => {
    return {}
};

Turn = connect(
    mapStateToProps,
    mapDispatchToProps
)(Turn);

export default Turn;