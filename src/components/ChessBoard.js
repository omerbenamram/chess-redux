import React from 'react';
import './ChessBoard.styl'
import {cellClicked} from "../actions/index";
import {connect} from "react-redux";
import {Container} from "reactstrap";
import ChessBoardCell from "./ChessBoardCell";


let ChessBoard = ({selected, pieces, onCellClick}) => (
    <Container>
        <div className="chessboard">
            {
                Object.entries(pieces).map(([placement, piece]) => {
                    let selectPiece = ''
                    if (selected.placement === placement){
                         selectPiece = 'selected'
                    }
                    return piece === {} ?
                        <ChessBoardCell key={placement} placement={placement} color='' type='' selectPiece={selectPiece} onCellClick={onCellClick}/>
                        :
                        <ChessBoardCell key={placement} placement={placement} color={piece.color} type={piece.type} selectPiece={selectPiece}
                                        onCellClick={onCellClick}/>
                }
            )}
        </div>
    </Container>
);

const mapStateToProps = (state) => {
    return {
        selected: state.selected,
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