import React, {useState} from 'react';
import Square from './Square';

export default function Board(props){
    const initialSquares = [
        null,null, null,
        null,null, null,
        null,null, null,
      ];
      //const initialSquares = Array(9).fill(null);
      const [squares, setSquares] = useState(initialSquares);
      const [xIsNext, setXIsNext] = useState(true);
    
    
      const handleClickEvent = (i) =>{
    
        //1. hacer una copia de la matriz de estado de cuadrados
        const newSquares = [...squares];
    
        const winnerDeclared = calculateWinner(newSquares);
        const squareFilled = Boolean(newSquares[i]);
        if(winnerDeclared || squareFilled){
          return;
        }
    
        //2. Mutar la copia, configurando el i-ésimo elemento en X
        newSquares[i] = xIsNext ? 'X' : 'O';
    
        //3. Llame a la función setSquares con la copia mutada
        setSquares(newSquares);
        setXIsNext(!xIsNext)
        
      }

      const calculateWinner = (squares) =>{

        const lines = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], //rows
            [0, 3, 6], [1, 4, 7], [2, 5, 8], //columns
            [0, 4, 8], [2 ,4, 6],  //diagonals
        ];
      
        for(let line of lines){
          const [a, b, c] = line;
      
          if(squares[a] && squares[a] === squares[b] && squares[a] === squares[c]){
      
            return squares[a];
          }
        }
        return null;
      
      }
    
      const renderSquare = (i) =>{
        return (
            <Square value={squares[i]} onClickEvent={() => handleClickEvent(i) }/>
        ) ;
      }
    
      const winner = calculateWinner(squares);
      const status = winner ?
      `Winner: ${winner}` : 
      `Next player is: ${xIsNext ? 'X' : 'O'}`;
    
      return (
        <div>
          <div className="status">{status}</div>
          <div className="board-row">
            {renderSquare(0)}{renderSquare(1)}{renderSquare(2)}
          </div>
          <div className="board-row">
          {renderSquare(3)}{renderSquare(4)}{renderSquare(5)}
          </div>
          <div className="board-row">
          {renderSquare(6)}{renderSquare(7)}{renderSquare(8)}
          </div>
        </div>
      );
}
