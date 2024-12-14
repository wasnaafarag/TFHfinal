import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './MatchFeedbackPage.css';

function MatchFeedbackPage() {
    const location = useLocation();
    const navigate = useNavigate();

    const { userPreferences, recommendedPerfumes } = location.state || {};

    // Predefined perfumes for future recommendations
    const perfumes = [
        {
            name: 'Chanel No. 5',
            image: 'https://images2.imgbox.com/b4/fb/3fNUkuei_o.png',
            notes: ['Rose', 'Jasmine', 'Vanilla', 'Sandalwood'],
            scentCategory: ['Floral', 'Elegant'],
            purchaseLink: 'https://www.chanel.com/ie/fragrance/chanel-number-5/'
        },
        {
            name: 'Dolce & Gabbana Light Blue',
            image: 'https://images2.imgbox.com/6e/c5/IjdYg4v7_o.png',
            notes: ['Cedarwood', 'Apple', 'Jasmine'],
            scentCategory: ['Citrus', 'Casual'],
            purchaseLink: 'https://www.perfumesclub.us/en/dolce-gabbana/light-blue-eau-de-toilette-spray/p_15210/'
        },
        {
            name: 'Tom Ford Black Orchid',
            image: 'https://thumbs2.imgbox.com/39/a1/0wsOCmEh_t.png',
            notes: ['Black Truffle', 'Vanilla', 'Lotus Wood'],
            scentCategory: ['Woody', 'Luxury'],
            purchaseLink: 'https://floward.com/en-eg/cairo/buy-and-send-tom-ford-black-orchid-edp-unisex-100ml-online-110745.html'
        },
        {
            name: 'Miss Dior',
            image: 'https://images2.imgbox.com/be/d5/OXqNInWg_o.png',
            notes: ['Powder', 'Vanilla', 'Floral', 'Sweet'],
            scentCategory: ['Summer', 'Fresh'],
            purchaseLink: 'https://www.faces.eg/ar/p/dior-miss-dior-eau-de-parfum-009115075915.html'
        },
        {
            name: 'Babycat YSL',
            image: 'https://thumbs2.imgbox.com/31/a7/pe0JQZKx_t.png',
            notes: ['Amber', 'Vanilla', 'Fresh Spicy', 'Leather'],
            scentCategory: ['Winter', 'Oriental'],
            purchaseLink: 'https://www.yslbeauty.com/int/fragrance/unisex-fragrances/le-vestiaire-des-parfums/babycat---le-vestiaire-des-parfums/WW-50920YSL.html'
        }
    ];

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
        <div className="match-feedback-page" style={{ width: '100%', padding: '20px', backgroundColor: '#f9f3ebe6', fontFamily: 'Arial, sans-serif' }}>
            <h2>Provide Your Feedback</h2> {/* Feedback Heading */}

            {/* Feedback form */}
            <form onSubmit={handleFeedbackSubmit} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', margin: '20px 0' }}>
                <textarea
                    value={feedback}
                    onChange={(e) => setFeedback(e.target.value)}
                    placeholder="Tell us what you think about the recommended perfumes..."
                    rows="4"
                    cols="50"
                    required
                    style={{ padding: '12px', marginBottom: '20px', fontSize: '16px', borderRadius: '5px', border: '1px solid #ddd' }}
                />
                <button type="submit" style={{ padding: '12px 24px', backgroundColor: '#6b4f38', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', fontSize: '16px' }}>
                    Submit Feedback
                </button>
            </form>

            {/* Future Perfume Recommendations */}
            <h3>Perfume Recommendations for Future Purchases</h3>
            <div className="future-recommendations" style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
                {perfumes.map((perfume, index) => (
                    <div key={index} className="recommendation-card" style={{ width: '250px', margin: '10px', padding: '20px', backgroundColor: '#fff', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)', textAlign: 'center' }}>
                        <img src={perfume.image} alt={perfume.name} style={{ width: '120px', height: '120px', objectFit: 'cover', borderRadius: '8px', marginBottom: '15px' }} />
                        <h4>{perfume.name}</h4>
                        <p><strong>Notes:</strong> {perfume.notes.join(', ')}</p>
                        <p><strong>Category:</strong> {perfume.scentCategory.join(', ')}</p>
                        <a href={perfume.purchaseLink} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', color: '#6b4f38', fontWeight: 'bold' }}>
                            Buy Now
                        </a>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default MatchFeedbackPage;
