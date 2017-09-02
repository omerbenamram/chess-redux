import React from 'react';
import './ChessBoard.styl'
import * as _ from 'lodash'
import {cellClicked} from "../actions/index";
import {connect} from "react-redux";
import {Container} from "reactstrap";
import ChessBoardCell from "./ChessBoardCell";


let ChessBoard = ({selected, pieces, movable, eatable, onCellClick}) => (
    <Container>
        <div className="chessboard">
            {
                Object.entries(pieces).map(([placement, piece]) => {
                    let selectPiece = '';
                    let isMove = '';
                    let isEatMove = '';
                    if (placement === selected){
                         selectPiece = 'selected'
                    }
                    if(movable.includes(placement)) {
                        isMove = 'move'
                    }
                    else {
                        if(eatable.includes(placement)){
                            isEatMove = 'eat'
                        }
                    }

                    return piece.type === null ?
                        <ChessBoardCell key={placement} placement={placement} move={isMove + isEatMove} color='' type='' selectPiece={selectPiece} onCellClick={onCellClick}/>
                        :
                        <ChessBoardCell key={placement} placement={placement} move={isEatMove} color={piece.color} type={piece.type} selectPiece={selectPiece}
                                        onCellClick={onCellClick}/>
                }
            )}
        </div>
    </Container>
);

const mapStateToProps = (state) => {
    return {
        selected: _.findKey(state.board.pieces, (piece) => { return piece.selected}),
        pieces: state.board.pieces,
        movable: state.board.paths.move,
        eatable: state.board.paths.eat

    }
};


ChessBoard = connect(
    mapStateToProps,
    {onCellClick: cellClicked}
)(ChessBoard);

export default ChessBoard;

