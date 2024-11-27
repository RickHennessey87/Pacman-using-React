import React, { useState, useEffect } from 'react';
import Maze from './Maze';
import Pacman from './Pacman';
import Ghost from './Ghost';
import { mazeLayout } from '../mazeData';
import './GameBoard.css';

// Manages the state of the game such as positions of Pacman and Ghosts, pellets, score and lives

const GameBoard = () => {
    // initializes and keeps track on Pacman's movement
    const [pacmanPosition, setPacmanPosition] =useState({ x: 1, y: 1 });
    // Tracks the direction of Pacman's movement
    const [direction, setDirection] = useState({ x: 0, y: 0 });
    // Used to dynamically update the state of the maze
    const [maze, setMaze] = useState(mazeLayout);
    // Keeps track of player score
    const [score, setScore] = useState(0);


    // used to detect arrow presses in order to move Pacman. 
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


    // Moves Pacman every 200ms based on the direction
    // This useEffect runs whenever pacmanPosition, direction, maze or score changes 
    useEffect(() => {
        // changes Pacman's new position buy adding the direction values to pacmanPosition
        const interval = setInterval(() => {
        const newX = pacmanPosition.x + direction.x;
        const newY = pacmanPosition.y + direction.y;

        // Checks to see Pacman's move is valid, i.e. not a wall
        if (maze[newY][newX] !== 1) {
            setPacmanPosition({ x: newX, y: newY });

            // Checks to see if Pacman picked up a pellet, if so
            // update score by 10 and remove pellet from maze by
            //changing the space into an empty space
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


    // renders the current state of the game
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

