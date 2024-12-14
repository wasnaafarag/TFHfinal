import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Thankyou.css';

function ThankYouPage() {
    const navigate = useNavigate();

    // Redirect back to the homepage or feedback page
    const handleGoBack = () => {
        navigate('/');
    };

    return (
        <div className="thank-you-page" style={{ fontFamily: 'Arial, sans-serif' }}>
            <div className="thank-you-container">
                <img
                    src='https://thumbs2.imgbox.com/2f/8a/mcCugxWk_t.png'
                    alt="Thank You"
                    className="thank-you-image"
                />
                <h2 className="thank-you-title">Thank You!</h2>
                <p className="thank-you-message">
                    Your feedback is highly appreciated and will help us improve our recommendations.
                </p>
                <button className="thank-you-button" onClick={handleGoBack}>
                    Go Back to Home
                </button>
            </div>
        </div>
    );
}

export default ThankYouPage;
