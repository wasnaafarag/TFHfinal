import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './MatchFeedbackPage.css';

function MatchFeedbackPage() {
    const location = useLocation();
    const navigate = useNavigate();

    const { userPreferences, recommendedPerfumes } = location.state || {};

    // State for feedback
    const [feedback, setFeedback] = useState('');

    if (!userPreferences || !recommendedPerfumes) {
        return <div>No preferences or recommendations available.</div>;
    }

    // Handle the feedback form submission
    const handleFeedbackSubmit = (e) => {
        e.preventDefault();
        console.log('Feedback submitted:', feedback);

        // Navigate to the "Thank You" page after feedback submission
        navigate('/thank-you');
    };

    return (
        <div className="match-feedback-page">
            <h2>Provide Your Feedback</h2> {/* Changed heading */}

            {/* Display Recommended Perfumes */}
            {recommendedPerfumes.length > 0 ? (
                <div>
                    {recommendedPerfumes.map((perfume, index) => (
                        <div key={index} className="perfume-item">
                            <h3>{perfume.name}</h3>
                            <p>{perfume.description}</p>
                            <a
                                href={perfume.purchaseLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="buy-link"
                            >
                                Buy Now
                            </a>
                        </div>
                    ))}
                </div>
            ) : (
                <p>No perfumes found based on your preferences.</p>
            )}

            {/* Feedback form */}
            <form onSubmit={handleFeedbackSubmit}>
                <textarea
                    value={feedback}
                    onChange={(e) => setFeedback(e.target.value)}
                    placeholder="Tell us what you think about the recommended perfumes..."
                    rows="4"
                    cols="50"
                    required
                />
                <button type="submit">Submit Feedback</button>
            </form>
        </div>
    );
}

export default MatchFeedbackPage;
