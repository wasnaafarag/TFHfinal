import React, { useState } from 'react';
import './MatchFeedbackPage.css';

function MatchFeedbackPage() {
    const [feedback, setFeedback] = useState('');
    const [feedbackSubmitted, setFeedbackSubmitted] = useState(false);

    const handleFeedbackChange = (e) => {
        setFeedback(e.target.value);
    };

    const handleSubmitFeedback = (e) => {
        e.preventDefault();
        // Process feedback here
        console.log(feedback);
        setFeedbackSubmitted(true);  // Show success message or handle redirection
    };

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
            purchaseLink: 'https://www.perfumesclub.us/en/dolce-gabbana/light-blue-eau-de-toilette-spray/p_15210/?origen=busqueda_sem_google_pfc&accion=17628789728&codigoorigen=pmax-shopping&origen=busqueda_sem_google_pfc&accion=17628789728&codigoorigen=pmax-shopping&gad_source=1&gclid=Cj0KCQiA0--6BhCBARIsADYqyL8izWw6DMYMfftWhiiO-yQU7w6fMijX5c9fOYpBnW0sXvk7luSLSv0aAv-2EALw_wcB'
          },
          {
            name: 'Tom Ford Black Orchid',
            image: 'https://thumbs2.imgbox.com/39/a1/0wsOCmEh_t.png',
            notes: ['Black Truffle', 'Vanilla', 'Lotus Wood'],
            scentCategory: ['Woody', 'Luxury'],
            purchaseLink: 'https://floward.com/en-eg/cairo/buy-and-send-tom-ford-black-orchid-edp-unisex-100ml-online-110745.html?gad_source=1&gclid=Cj0KCQiA0--6BhCBARIsADYqyL-PUa4BJOwundUZ-2lDg30OqSH7zhiDt-tKQ_MPzTv3_DDOk8cGrpIaAiJgEALw_wcB'
          },
          {
            name: 'Miss Dior',
            image: 'https://images2.imgbox.com/be/d5/OXqNInWg_o.png',
            notes: ['Powder', 'Vanilla', 'Floral','Sweet'],
            scentCategory: ['Summer', 'Fresh'],
            purchaseLink: 'https://google.com'
          },
          {
            name: 'Babycat YSL',  // Example of an item with missing scentCategory
            image: 'https://thumbs2.imgbox.com/31/a7/pe0JQZKx_t.png',
            notes: ['Amber', 'Vanilla','Fresh Spicy','Leather'],
            scentCategory: ['Winter','Oriental'],  // Missing scent category
            purchaseLink: 'https://www.yslbeauty.com/int/fragrance/unisex-fragrances/le-vestiaire-des-parfums/babycat---le-vestiaire-des-parfums/WW-50920YSL.html'
          },
    ];

    return (
        <div className="match-feedback-container">
            <h2>Your Fragrance Match</h2>
            <div className="perfume">
                {perfumes.map((perfume) => (
                    <div key={perfume.name} className="perfume-item">
                        <img src={perfume.image} alt={perfume.name} />
                        <h3>{perfume.name}</h3>
                        <p>{perfume.notes}</p>
                        <a href={perfume.link} target="_blank" rel="noopener noreferrer">
                            Buy Now
                        </a>
                    </div>
                ))}
            </div>

            <div className="feedback">
                <h3>Leave Your Feedback</h3>
                <textarea
                    value={feedback}
                    onChange={handleFeedbackChange}
                    placeholder="Your feedback here..."
                />
                <button onClick={handleSubmitFeedback}>Submit Feedback</button>
                {feedbackSubmitted && <p>Thank you for your feedback! We look forward to seeing you again soon. ;) </p>}
            </div>
        </div>
    );
}

export default MatchFeedbackPage;

kj