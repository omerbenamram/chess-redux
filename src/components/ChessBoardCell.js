import React from 'react';
import './ChessBoard.css';

class ChessBoardCell extends React.Component {

    render = () => {
        const {onCellClick, placement, color, type, selectPiece} = this.props;

        return (<div className='chessboard-cell' id={selectPiece} onClick={() => onCellClick(placement, {color, type})}>
            {placement}
            <div className={'piece '+ color + type}  />
        </div>)
    }
}




export default ChessBoardCell;
