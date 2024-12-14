import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './Recommendations.css';

function Recommendations() {
    const location = useLocation();
    const navigate = useNavigate();

    // Destructure userPreferences from location.state
    const { userPreferences } = location.state || {}; 

    const [recommendedPerfumes, setRecommendedPerfumes] = useState([]);

    // Mock perfumes data
    const allPerfumes = [
        { name: "Gucci Flora", brand: "Gucci", description: "A light floral scent.", notes: ["Floral"], categories: ["Elegant", "Luxury"], image: 'https://thumbs2.imgbox.com/85/94/9ZJEBzv0_t.png', purchaseLink: 'https://www.gucci.com/us/en/st/capsule/gucci-flora-gorgeous-gardenia' },
        { name: "Myrrhe Mystère Eau de Parfum", brand: "Tom Ford", description: "A deep woody fragrance.", notes: ["Woody"], categories: ["Casual", "Luxury"], image: 'https://thumbs2.imgbox.com/83/c7/FAG5tjrX_t.png', purchaseLink: 'https://www.perfumesclub.us/en/dolce-gabbana/light-blue-eau-de-toilette-spray' },
        { name: "Cassili", brand: "BParfums de Marly", description: "A refreshing, clean scent.", notes: ["Fresh"], categories: ["Casual", "Sexy"], image: 'https://thumbs2.imgbox.com/4a/51/GmQ158C4_t.png', purchaseLink: 'https://so-avant-garde.com/products/cassili-eau-de-parfum' },
        { name: "Hudson Valley EDP", brand: "Gissah", description: "A warm, spicy fragrance.", notes: ["Oriental"], categories: ["Sexy", "Luxury"], image: 'https://thumbs2.imgbox.com/27/2b/druHZ9SN_t.png', purchaseLink: 'https://smellofarabia.com/products/hudson-valley-edp' },
        { name: "Replica", brand: "Maison Margiela", description: "A spicy, earthy fragrance for fall.", notes: ["Woody", "Oriental"], categories: ["Sexy", "Luxury"], image: 'https://thumbs2.imgbox.com/c1/30/dpnEts1b_t.png', purchaseLink: 'https://www.sephora.com/product/maison-margiela-replica-autumn-vibes' }
    ];

    // Function to filter perfumes based on user's preferences
    const getRecommendations = (favoriteNotes, scentCategory) => {
        return allPerfumes.filter(perfume => {
            const matchesNotes = perfume.notes.some(note => favoriteNotes.includes(note));
            const matchesCategory = perfume.categories.some(category => scentCategory.includes(category));
            return matchesNotes && matchesCategory;
        });
    };

    // Fetch recommendations based on user preferences
    useEffect(() => {
        if (userPreferences) {
            const { favoriteNotes, scentCategory } = userPreferences;
            const recommendations = getRecommendations(favoriteNotes, scentCategory);
            setRecommendedPerfumes(recommendations);
        }
    }, [userPreferences]);

    // Handle navigating to the MatchFeedbackPage
    const handleGiveFeedback = () => {
        navigate('/match-feedback', {
            state: { userPreferences, recommendedPerfumes }
        });
    };

    // Conditional rendering for when preferences are not passed
    if (!userPreferences) {
        return (
            <div>
                <h2>No preferences found. Please complete the fragrance quiz.</h2>
            </div>
        );
    }

    return (
        <div
            style={{
                backgroundColor: '#f9f3ebe6',
                paddingTop: '80px',
                width: '100%',
                minHeight: '100vh',
                boxSizing: 'border-box'
            }}
        >
            <div
                style={{
                    maxWidth: '1200px',
                    margin: '0 auto',
                    padding: '20px',
                    boxSizing: 'border-box',
                    textAlign: 'center'
                }}
            >
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
                <button onClick={handleGiveFeedback}>Give Your Feedback</button>
            </div>
        </div>
    );
}

export default Recommendations;
