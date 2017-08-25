import React from 'react';
import './ChessBoard.styl'
import {cellClicked} from "../actions/index";
import {connect} from "react-redux";
import {Container} from "reactstrap";
import ChessBoardCell from "./ChessBoardCell";


let ChessBoard = ({pieces, onCellClick}) => (
    <Container>
        <div className="chessboard">
            {
                Object.entries(pieces).map(([placement, piece]) => {
                    return piece === {} ?
                        <ChessBoardCell key={placement} placement={placement} type='' onCellClick={onCellClick}/>
                        :
                        <ChessBoardCell key={placement} placement={placement} type={piece.color + piece.type}
                                        onCellClick={onCellClick}/>
                }
            )}
        </div>
    </Container>
);

const mapStateToProps = (state) => {
    console.log(state.pieces)
    return {
        pieces: state.pieces

    }
};

// const mapDispatchToProps = (dispatch) => ({
//     onCellClick: (placement) => {dispatch(cellClicked(placement))}
// });

//why does the onCellClick: cellClicked work? when there is no dispatch call?
//also how does it know to get placement?
ChessBoard = connect(
    mapStateToProps,
    {onCellClick: cellClicked}
)(ChessBoard);

export default ChessBoard;

// <img src={pieces['A2'].imgSrc} alt={pieces['A2'].type}></img>