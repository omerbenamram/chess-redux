import React from 'react';
import './ChessBoard.css';


const ChessBoardCell = ({onCellClick, placement, color, type, selectPiece}) => (
    <div className='chessboard-cell' id={selectPiece} onClick={() => onCellClick(placement, {color, type})}>
        <div className={color + type}/>
    </div>
);

export default ChessBoardCell;
