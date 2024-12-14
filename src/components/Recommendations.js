import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './Recommendations.css';

function Recommendations() {
    const [matchedPerfumes, setMatchedPerfumes] = useState([]);
    const location = useLocation();
    const navigate = useNavigate();

    // Fetch user preferences from location.state
    const { userPreferences } = location.state || {};

    console.log('User Preferences:', userPreferences); // Log user preferences

    // Predefined list of perfumes
    const perfumes = [
        {
            name: 'Gucci Flora',
            image: 'https://thumbs2.imgbox.com/85/94/9ZJEBzv0_t.png',
            notes: ['Floral'],
            scentCategory: ['Elegant', 'Luxury'],
            description: 'A light floral scent perfect for elegant occasions.',
            purchaseLink: 'https://www.gucci.com/us/en/st/capsule/gucci-flora-gorgeous-gardenia',
        },
        {
            name: 'Myrrhe Mystère Eau de Parfum',
            image: 'https://thumbs2.imgbox.com/83/c7/FAG5tjrX_t.png',
            notes: ['Woody'],
            scentCategory: ['Casual', 'Luxury'],
            description: 'A deep woody fragrance for a casual, everyday feel.',
            purchaseLink: 'https://www.perfumesclub.us/en/dolce-gabbana/light-blue-eau-de-toilette-spray',
        },
        {
            name: 'Cassili Parfums de Marly',
            image: 'https://thumbs2.imgbox.com/4a/51/GmQ158C4_t.png',
            notes: ['Fresh'],
            scentCategory: ['Casual', 'Elegant'],
            description: 'A refreshing, clean scent perfect for a summer day.',
            purchaseLink: 'https://so-avant-garde.com/products/cassili-eau-de-parfum',
        },
        {
            name: 'Gissah—Hudson Valley EDP',
            image: 'https://thumbs2.imgbox.com/27/2b/druHZ9SN_t.png',
            notes: ['Oriental'],
            scentCategory: ['Sexy', 'Luxury'],
            description: 'A warm, spicy fragrance with oriental undertones.',
            purchaseLink: 'https://smellofarabia.com/products/hudson-valley-edp',
        },
        {
            name: 'Replica Maison Margiela',
            image: 'https://thumbs2.imgbox.com/c1/30/dpnEts1b_t.png',
            notes: ['Woody', 'Oriental'],
            scentCategory: ['Sexy', 'Luxury'],
            description: 'A spicy, earthy fragrance perfect for fall.',
            purchaseLink: 'https://www.sephora.com/product/maison-margiela-replica-autumn-vibes',
        },
    ];

    // Match logic: Filters perfumes based on user preferences
    useEffect(() => {
        if (userPreferences) {
            console.log('Matching perfumes based on:', userPreferences);
            const matches = perfumes.filter((perfume) => {
                const hasMatchingNotes = userPreferences.favoriteNotes
                    ? userPreferences.favoriteNotes.some((note) => perfume.notes.includes(note))
                    : true;

                const hasMatchingCategory = userPreferences.scentCategory
                    ? userPreferences.scentCategory.some((category) =>
                          perfume.scentCategory.includes(category)
                      )
                    : true;

                // Return perfumes that match at least one note OR one category
                return hasMatchingNotes || hasMatchingCategory;
            });

            setMatchedPerfumes(matches);
        }
    }, [userPreferences]);

    const handleFeedbackRedirect = () => {
        // Navigate to the MatchFeedbackPage and pass the matched perfumes and user preferences
        navigate('/match-feedback', { state: { userPreferences, matchedPerfumes } });
    };

    return (
        <div className="recommendations-container">
            <h2>Your Perfume Match</h2>

            {matchedPerfumes.length > 0 ? (
                <ul>
                    {matchedPerfumes.map((perfume, index) => (
                        <li key={index} className="recommendation-item">
                            <img
                                src={perfume.image}
                                alt={perfume.name}
                                className="recommendation-image"
                            />
                            <div className="recommendation-details">
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
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No match found based on your preferences. Please try again!</p>
            )}

            {/* Button to navigate to the MatchFeedbackPage */}
            <button onClick={handleFeedbackRedirect}>
                Go to Feedback and Match
            </button>
        </div>
    );
}

export default Recommendations;
