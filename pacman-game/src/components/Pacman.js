import React from 'react';
import './Pacman.css';

// Pacman Component, position has two properties, x is the horizontal position of Pacman
// and y is the vertical. Each unit is 20 px
const Pacman = ({ position }) => {
    const style = {
        top: position.y * 20,
        left: position.x * 20,
    };

    return <div className='pacman' style={style}></div>
};

export default Pacman;