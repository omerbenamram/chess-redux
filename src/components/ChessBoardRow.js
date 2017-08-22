import React from 'react';
import './ChessBoard.css'
import * as _ from 'lodash';
import ChessBoardCell from "./ChessBoardCell";
import {columns} from "../constants/index";

const numCellsPerRow = 8;

const ChessBoardRow = ({numRow, onCellClick}) => (
    <div className="chessboard-row">
        {_.range(numCellsPerRow).map(
            (i) => (<ChessBoardCell key={columns[i] + (8 - numRow)} placement= {columns[i] + (8 - numRow)} onCellClick={onCellClick}/>)
        )}
    </div>
);

export default ChessBoardRow;
