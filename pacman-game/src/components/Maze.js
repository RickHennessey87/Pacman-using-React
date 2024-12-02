import React from 'react';
import './Maze.css';

// Creates the Maze component using the mazeLayout in mazeData.js

const Maze = ({ maze }) => {
    return (
        // root maze div
        <div className='maze'>

            {/* renders the maze layout. Iterates over each row of the maze. row represents current row, 
            and rowIndex the index of the row which is used as a unique key.  */}

            {maze.map((row, rowIndex) => (
                <div key={rowIndex} className='maze-row'>

                    {/* Iterates over each cell of the current row. cell is the value of the cell, and
                    cellIndex is the index. className is initialized as a empty string but is set depending
                    on the cell value */}

                    {row.map((cell, cellIndex) => {
                        let className = '';

                        if (cell === 1) className = 'wall';
                        else if (cell === 2) className = 'pellet';
                        else if (cell === 3) className = 'power-pellet';

                        // returns a div for each cell with the corresponding classes. className
                        //combines maze-cell with specific class for styling

                        return (
                            <div key={cellIndex} className={`maze-cell ${className}`}></div>
                        );
                    })}
                </div>
            ))}
        </div>
    );
};

export default Maze;