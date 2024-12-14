import React from 'react';
import { Link } from 'react-router-dom';
import './WelcomePage.css';
import backgroundImage from '../Images/background.png';

function WelcomePage() {
    return (
        <div className="welcome-container" style={{ backgroundImage: `url(${backgroundImage})` }}>
            <div className="content">
                <h1></h1>
            </div>
        </div>
    );
}

export default WelcomePage;
