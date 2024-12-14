import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './QuestionsForm.css';

function QuestionsForm() {
    const [preferences, setPreferences] = useState({
        favoriteNotes: [],
        scentCategory: [],
        season: '',
        age: '',
    });
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value, checked } = e.target;

        if (Array.isArray(preferences[name])) {
            if (checked) {
                setPreferences((prev) => ({
                    ...prev,
                    [name]: [...prev[name], value],
                }));
            } else {
                setPreferences((prev) => ({
                    ...prev,
                    [name]: prev[name].filter((item) => item !== value),
                }));
            }
        } else {
            setPreferences((prev) => ({
                ...prev,
                [name]: value,
            }));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const { favoriteNotes, scentCategory, season, age } = preferences;

        const newErrors = {};
        if (favoriteNotes.length === 0) newErrors.favoriteNotes = 'Please select your favorite notes';
        if (scentCategory.length === 0) newErrors.scentCategory = 'Please select scent categories';
        if (!season) newErrors.season = 'Please choose your season preference';
        if (!age || isNaN(age) || age < 18) newErrors.age = 'Please enter a valid age (18 or older)';

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        // Generate recommendations based on user preferences
        const recommendations = getRecommendations(favoriteNotes, scentCategory);

        // Pass both preferences and recommendations to the Recommendations page
        navigate('/recommendations', {
            state: { userPreferences: preferences, recommendedPerfumes: recommendations }
        });
    };

    const getRecommendations = (favoriteNotes, scentCategory) => {
        const allPerfumes = [
            { name: "Gucci Flora", brand: "Gucci", description: "A light floral scent.", notes: ["Floral"], categories: ["Elegant", "Luxury"], image: 'https://thumbs2.imgbox.com/85/94/9ZJEBzv0_t.png', purchaseLink: 'https://www.gucci.com/us/en/st/capsule/gucci-flora-gorgeous-gardenia' },
            { name: "Myrrhe Mystère Eau de Parfum", brand: "Tom Ford", description: "A deep woody fragrance.", notes: ["Woody"], categories: ["Casual", "Luxury"], image: 'https://thumbs2.imgbox.com/83/c7/FAG5tjrX_t.png', purchaseLink: 'https://www.perfumesclub.us/en/dolce-gabbana/light-blue-eau-de-toilette-spray' },
            { name: "Cassili", brand: "BParfums de Marly", description: "A refreshing, clean scent.", notes: ["Fresh"], categories: ["Casual", "Sexy"], image: 'https://thumbs2.imgbox.com/4a/51/GmQ158C4_t.png', purchaseLink: 'https://so-avant-garde.com/products/cassili-eau-de-parfum' },
            { name: "Hudson Valley EDP", brand: "Gissah", description: "A warm, spicy fragrance.", notes: ["Oriental"], categories: ["Sexy", "Luxury"], image: 'https://thumbs2.imgbox.com/27/2b/druHZ9SN_t.png', purchaseLink: 'https://smellofarabia.com/products/hudson-valley-edp' },
            { name: "Replica", brand: "Maison Margiela", description: "A spicy, earthy fragrance for fall.", notes: ["Woody", "Oriental"], categories: ["Sexy", "Luxury"], image: 'https://thumbs2.imgbox.com/c1/30/dpnEts1b_t.png', purchaseLink: 'https://www.sephora.com/product/maison-margiela-replica-autumn-vibes' }
        ];
        
        // Filter perfumes based on favorite notes and scent categories
        return allPerfumes.filter((perfume) => {
            const noteMatch = favoriteNotes.some((note) => perfume.notes.includes(note));
            const categoryMatch = scentCategory.some((category) => perfume.categories.includes(category));
            return noteMatch && categoryMatch;
        });
    };

    return (
        <form className="questions-form" onSubmit={handleSubmit}>
            <h2>Answer the Questions to Find Your Perfect Fragrance</h2>

            <div className="scrollable-question">
                <p>What are your favorite notes?</p>
                <label>
                    <input
                        type="checkbox"
                        value="Floral"
                        name="favoriteNotes"
                        onChange={handleChange}
                    />
                    <img src="https://thumbs2.imgbox.com/6a/67/hzgBQufd_t.png" alt="Floral" className="checkbox-image" />
                    Floral
                </label>
                <label>
                    <input
                        type="checkbox"
                        value="Woody"
                        name="favoriteNotes"
                        onChange={handleChange}
                    />
                    <img src="https://thumbs2.imgbox.com/4d/94/s5fYK8wX_t.png" alt="Woody" className="checkbox-image" />
                    Woody
                </label>
                <label>
                    <input
                        type="checkbox"
                        value="Fresh"
                        name="favoriteNotes"
                        onChange={handleChange}
                    />
                    <img src="https://thumbs2.imgbox.com/9f/14/rqxHuXZh_t.png" alt="Fresh" className="checkbox-image" />
                    Fresh
                </label>
                <label>
                    <input
                        type="checkbox"
                        value="Oriental"
                        name="favoriteNotes"
                        onChange={handleChange}
                    />
                    <img src="https://thumbs2.imgbox.com/d7/82/QOgiryFT_t.png" alt="Oriental" className="checkbox-image" />
                    Oriental
                </label>
                {errors.favoriteNotes && <span className="error">{errors.favoriteNotes}</span>}
            </div>

            <div className="scrollable-question">
                <p>What is your scent category?</p>
                <label>
                    <input
                        type="checkbox"
                        value="Elegant"
                        name="scentCategory"
                        onChange={handleChange}
                    />
                    <img src="https://thumbs2.imgbox.com/47/ea/Of8VoeZI_t.png" alt="Elegant" className="checkbox-image" />
                    Elegant
                </label>
                <label>
                    <input
                        type="checkbox"
                        value="Sexy"
                        name="scentCategory"
                        onChange={handleChange}
                    />
                    <img src="https://thumbs2.imgbox.com/5f/ce/x1TVM8mi_t.png" alt="Sexy" className="checkbox-image" />
                    Sexy
                </label>
                <label>
                    <input
                        type="checkbox"
                        value="Luxury"
                        name="scentCategory"
                        onChange={handleChange}
                    />
                    <img src="https://thumbs2.imgbox.com/11/89/eJWcyBvC_t.png" alt="Luxury" className="checkbox-image" />
                    Luxury
                </label>
                <label>
                    <input
                        type="checkbox"
                        value="Casual"
                        name="scentCategory"
                        onChange={handleChange}
                    />
                    <img src="https://thumbs2.imgbox.com/29/5f/rEnTcokt_t.png" alt="Casual" className="checkbox-image" />
                    Casual
                </label>
                {errors.scentCategory && <span className="error">{errors.scentCategory}</span>}
            </div>

            <div>
                <label>
                    <p>Are you a summer or a winter person?</p>
                    <select
                        name="season"
                        value={preferences.season}
                        onChange={handleChange}
                        required
                    >
                        <option value="">Select</option>
                        <option value="Summer">Summer</option>
                        <option value="Winter">Winter</option>
                    </select>
                    {errors.season && <span className="error">{errors.season}</span>}
                </label>
            </div>

            <div>
                <label>
                    <p>What is your age?</p>
                    <input
                        type="number"
                        name="age"
                        value={preferences.age}
                        onChange={handleChange}
                        required
                    />
                    {errors.age && <span className="error">{errors.age}</span>}
                </label>
            </div>

            <button type="submit">See Recommendations</button>
        </form>
    );
}

export default QuestionsForm;
