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
    // Initializes and keeps track on Pacman's lives
    const [lives, setLives] = useState(3);
    // Initializes and keeps track of Ghosts and their movement
    const [ghostPositions, setGhostPositions] = useState([{ x: 6, y: 3 }]);


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

    useEffect(() => {
        const interval = setInterval(() => {
            setGhostPositions((ghosts) => 
                ghosts.map((ghost) => {
                    const directions = [
                        { x: 0, y: -1 },
                        { x: 0, y: 1 },
                        { x: -1, y: 0 },
                        { x: 1, y: 0 },
                    ];
                    const randomDirection = directions[Math.floor(Math.random() * directions.length)];
                    const newX = ghost.x + randomDirection.x;
                    const newY = ghost.y + randomDirection.y;

                    if (maze[newY][newX] !== 1) {
                        return { x: newX, y: newY };
                    }
                    return ghost;
                })
            );
        }, 500);

        return () => clearInterval(interval);
    }, [maze]);

    // Check if Pacman touches Ghost
    useEffect(() => {
        ghostPositions.forEach((ghost) => {
            if (ghost.x === pacmanPosition.x && ghost.y === pacmanPosition.y) {
                setLives(lives - 1);
                setPacmanPosition({ x: 1, y: 1 });
            }
        });
    }, [ghostPositions, pacmanPosition, lives]);

    useEffect(() => {
        if (lives <= 0) {
          alert('Game Over!');
          setLives(3);
          setScore(0);
          setMaze(mazeLayout);
          setPacmanPosition({ x: 1, y: 1 });
        }
      }, [lives]);


    // renders the current state of the game
  return (
    <div className='game-board'>
        <Maze maze={maze} />
        <Pacman position={pacmanPosition} />
        {ghostPositions.map((ghost, index) => (
            <Ghost key={index} position={ghost} color="red" />
        ))}
        <div className='score-board'>
            Score: {score} | Lives: {lives}
        </div>
    </div>
  );
};

export default GameBoard;

