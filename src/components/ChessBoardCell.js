import React from 'react';
import './ChessBoard.css';


const ChessBoardCell = ({onCellClick, placement, type}) => (<div className="chessboard-cell" onClick={() => onCellClick(placement)}>
            <div className={'piece '+ type}  />
        </div>)


export default ChessBoardCell;
