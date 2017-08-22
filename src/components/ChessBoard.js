import React from 'react';
import './ChessBoard.styl'
import * as _ from 'lodash';
import {cellClicked} from "../actions/index";
import {connect} from "react-redux";
import {Container} from "reactstrap";
import ChessBoardRow from "./ChessBoardRow";
import {numRows} from "../constants/index";

let ChessBoard = ({onCellClick}) => (
    <Container>
        <div className="chessboard">
            {_.range(numRows).map(
                (i) => (<ChessBoardRow key={i} numRow={i} onCellClick={onCellClick}/>)
            )}
        </div>
    </Container>
);

const mapStateToProps = (state) => {
    return state
};

const mapDispatchToProps = (dispatch) => ({
    onCellClick: (placement) => {dispatch(cellClicked(placement))}
});
//why does the onCellClick: cellClicked work? when there is no dispatch call?
//also how does it know to get placement?
ChessBoard = connect(
    mapStateToProps,
    {onCellClick: cellClicked}
)(ChessBoard);

export default ChessBoard;
