import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';  // Import useNavigate
import './Recommendations.css';

function Recommendations() {
    const location = useLocation();
    const navigate = useNavigate();  // Initialize the navigate function

    const { userPreferences, recommendedPerfumes } = location.state || {};

    // Handle navigating back to the QuestionsForm page
    const handleBackToQuestions = () => {
        navigate('/questions');  // Navigate back to the questions form
    };

    return (
        <div className="recommendations">
            <h2>Your Perfume Recommendations</h2>
            <p>Based on your preferences:</p>
            <div className="user-preferences">
                <p><strong>Favorite Notes:</strong> {userPreferences.favoriteNotes.join(', ')}</p>
                <p><strong>Scent Categories:</strong> {userPreferences.scentCategory.join(', ')}</p>
                <p><strong>Season:</strong> {userPreferences.season}</p>
                <p><strong>Age:</strong> {userPreferences.age}</p>
            </div>
            <div className="recommendations-list">
                {recommendedPerfumes.length > 0 ? (
                    recommendedPerfumes.map((perfume, index) => (
                        <div className="recommendation-card" key={index}>
                            <img src={perfume.image} alt={perfume.name} />
                            <h3>{perfume.name}</h3>
                            <p>{perfume.description}</p>
                            <a href={perfume.purchaseLink} target="_blank" rel="noopener noreferrer">
                                Buy Now
                            </a>
                        </div>
                    ))
                ) : (
                    <p>No recommendations found based on your preferences.</p>
                )}
            </div>

            {/* Button to navigate back to the QuestionsForm */}
            <button onClick={handleBackToQuestions}>Back to Questions</button>
        </div>
    );
}

export default Recommendations;
