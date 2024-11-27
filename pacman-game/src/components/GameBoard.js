// Manages the state of the game such as positions of Pacman and Ghosts, pellets, score and lives

import React, { useState, useEffect } from 'react';
import Maze from './Maze';
import Pacman from './Pacman';
import Ghost from './Ghost';
import { mazeLayout } from '../mazeData';
import './GameBoard.css';

const GameBoard = () => {
    const [pacmanPosition, setPacmanPosition] =useState({ x: 1, y: 1 });
    const [direction, setDirection] = useState({ x: 0, y: 0 });
    const [maze, setMaze] = useState(mazeLayout);
    const [score, setScore] = useState(0);


    useEffect(() => {
        const handleKeyDown = (e) => {
        switch (e.key) {
            case 'ArrowUp':
                setDirection({ x: 0, y: -1 });
                break;
            case 'ArrowDown':
                setDirection({ x: 0, y: 1 });
                break;
            case 'ArrowLeft':
                setDirection({ x: -1, y: 0 });
                break;
            case 'ArrowRight':
                setDirection({ x: 1, y: 0 });
                break;
            default:
                break;
        }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
        const newX = pacmanPosition.x + direction.x;
        const newY = pacmanPosition.y + direction.y;

        if (maze[newY][newX] !== 1) {
            setPacmanPosition({ x: newX, y: newY });

            if (maze[newY][newX] === 2) {
            let newMaze = [...maze];
            newMaze[newY][newX] = 0;
            setMaze(newMaze);
            setScore(score + 10);
            }
        }
        }, 200);

        return () => clearInterval(interval);
    }, [pacmanPosition, direction, maze, score]);

  return (
    <div className='game-board'>
        <Maze maze={maze} />
        <Pacman position={pacmanPosition} />
        <Ghost position={ghostPosition} />
        <div className='score-board'>Score: {score}</div>
    </div>
  );
};

export default GameBoard;

