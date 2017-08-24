import React from 'react';
import './ChessBoard.css';

const ChessBoardCell = ({onCellClick, placement, imgSrc, alt}) => (
    <div className="chessboard-cell" onClick={() => onCellClick(placement)}>
        <img src='' alt={alt}/>
    </div>
);

export default ChessBoardCell;
