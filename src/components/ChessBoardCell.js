import React from 'react';
import './ChessBoard.css'
import king from './assets/king.svg'

const ChessBoardCell = ({onCellClick, placement}) => (
    <div className="chessboard-cell" onClick={() => onCellClick(placement)}>
      {placement}
    </div>
);

export default ChessBoardCell;
