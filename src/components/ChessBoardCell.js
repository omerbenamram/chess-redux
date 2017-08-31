import React from 'react';
import './ChessBoard.css';


const ChessBoardCell = ({onCellClick, placement, color, type, move,  selectPiece}) => (
    <div className='chessboard-cell' id={selectPiece + move} onClick={() => onCellClick(placement, {color, type})}>
        <div className={color + type}/>
    </div>
);

export default ChessBoardCell;
