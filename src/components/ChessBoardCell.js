import React from 'react';
import './ChessBoard.css'
import king from './assets/king.svg'

const ChessBoardCell = ({onCellClick}) => (
    <div className="chessboard-cell" onClick={onCellClick}>
        <img src={king} className="piece"/>
    </div>
);

export default ChessBoardCell;
