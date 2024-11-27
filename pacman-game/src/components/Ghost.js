import React from 'react';
import './Ghost.css';

const Ghost = ({ position, color }) => {
    const style = {
        top: position.y * 20,
        left: position.x * 20,
        backgroundColor: color,
    };

    return <div className='ghost' style={style}></div>;
};

export default Ghost;