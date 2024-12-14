import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Recommendations.css';

function Recommendations() {
    const [recommendations, setRecommendations] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchRecommendations = async () => {
            const token = localStorage.getItem('token');
            try {
                const response = await fetch('http://localhost:7777/recommendation', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                if (response.ok) {
                    const data = await response.json();
                    setRecommendations(data.recommendedPerfumes);
                } else {
                    alert('Error fetching recommendations');
                }
            } catch (error) {
                console.error('Error:', error);
            }
        };

        fetchRecommendations();
    }, []);

    return (
        <div className="recommendations-container">
            <h2>Your Recommendations</h2>
            <ul>
                {recommendations.map((perfume) => (
                    <li key={perfume.ID} className="recommendation-item">
                        <img src={perfume.image} alt={perfume.name} className="recommendation-image" />
                        <div className="recommendation-details">
                            <h3>{perfume.name}</h3>
                            <p>{perfume.description}</p>
                            <a href={perfume.link} target="_blank" rel="noopener noreferrer" className="buy-link">
                                Buy Now
                            </a>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Recommendations;
