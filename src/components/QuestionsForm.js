import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './QuestionsForm.css';

function QuestionsForm() {
    const [preferences, setPreferences] = useState({
        favoriteNotes: [],
        usualPerfume: [],
        scentVibe: '',
        scentCategory: [],
        age: '',
        season: '',
    });
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    const perfumes = [
        {
            name: 'Chanel No. 5',
            notes: ['Floral', 'Woody'],
            category: 'Floral',
        },
        {
            name: 'Dior Sauvage',
            notes: ['Woody', 'Fresh'],
            category: 'Woody',
        },
        {
            name: 'Gucci Bloom',
            notes: ['Floral'],
            category: 'Floral',
        },
        // Add more perfumes as needed
    ];

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

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { favoriteNotes, usualPerfume, scentVibe, scentCategory, age, season } = preferences;

        const newErrors = {};
        if (favoriteNotes.length === 0) newErrors.favoriteNotes = 'Please select your favorite notes';
        if (usualPerfume.length === 0) newErrors.usualPerfume = 'Please select your usual perfume';
        if (!scentVibe) newErrors.scentVibe = 'Please choose a scent vibe';
        if (scentCategory.length === 0) newErrors.scentCategory = 'Please select scent categories';
        if (!age || isNaN(age) || age < 18) newErrors.age = 'Please enter a valid age (18 or older)';
        if (!season) newErrors.season = 'Please choose your season preference';

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return; // Stop form submission if there are errors
        }

        // Match user preferences to perfumes
        const matchedPerfumes = perfumes.filter((perfume) => {
            const notesMatch = favoriteNotes.some((note) => perfume.notes.includes(note));
            const categoryMatch = scentCategory.includes(perfume.category);
            const usualPerfumeMatch = usualPerfume.includes(perfume.name);

            return (notesMatch || usualPerfumeMatch) && categoryMatch;
        });

        if (matchedPerfumes.length > 0) {
            // Pass matched perfumes to the next page
            navigate('/match-feedback', { state: { matchedPerfumes } });
        } else {
            alert('No match found for your preferences');
        }
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
                <p>What is your usual perfume go-to?</p>
                <label>
                    <input
                        type="checkbox"
                        value="Chanel No. 5"
                        name="usualPerfume"
                        onChange={handleChange}
                    />
                    <img src="path/to/chanel-image.jpg" alt="Chanel No. 5" className="checkbox-image" />
                    Chanel No. 5
                </label>
                <label>
                    <input
                        type="checkbox"
                        value="Dior Sauvage"
                        name="usualPerfume"
                        onChange={handleChange}
                    />
                    <img src="path/to/dior-image.jpg" alt="Dior Sauvage" className="checkbox-image" />
                    Dior Sauvage
                </label>
                <label>
                    <input
                        type="checkbox"
                        value="Gucci Bloom"
                        name="usualPerfume"
                        onChange={handleChange}
                    />
                    <img src="path/to/gucci-image.jpg" alt="Gucci Bloom" className="checkbox-image" />
                    Gucci Bloom
                </label>
                {errors.usualPerfume && <span className="error">{errors.usualPerfume}</span>}
            </div>

            <div>
                <label>
                    <p>Do you want a similar vibe or a change?</p>
                    <select
                        name="scentVibe"
                        value={preferences.scentVibe}
                        onChange={handleChange}
                        required
                    >
                        <option value="">Select</option>
                        <option value="Similar">Similar</option>
                        <option value="Change">Change</option>
                    </select>
                    {errors.scentVibe && <span className="error">{errors.scentVibe}</span>}
                </label>
            </div>

            <div className="scrollable-question">
                <p>What is your scent category?</p>
                <label>
                    <input
                        type="checkbox"
                        value="Floral"
                        name="scentCategory"
                        onChange={handleChange}
                    />
                    <img src="path/to/floral-image.jpg" alt="Floral" className="checkbox-image" />
                    Floral
                </label>
                <label>
                    <input
                        type="checkbox"
                        value="Woody"
                        name="scentCategory"
                        onChange={handleChange}
                    />
                    <img src="path/to/woody-image.jpg" alt="Woody" className="checkbox-image" />
                    Woody
                </label>
                <label>
                    <input
                        type="checkbox"
                        value="Fresh"
                        name="scentCategory"
                        onChange={handleChange}
                    />
                    <img src="path/to/fresh-image.jpg" alt="Fresh" className="checkbox-image" />
                    Fresh
                </label>
                <label>
                    <input
                        type="checkbox"
                        value="Oriental"
                        name="scentCategory"
                        onChange={handleChange}
                    />
                    <img src="path/to/oriental-image.jpg" alt="Oriental" className="checkbox-image" />
                    Oriental
                </label>
                {errors.scentCategory && <span className="error">{errors.scentCategory}</span>}
            </div>

            <div>
                <label>
                    <p>How old are you?</p>
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

            <button type="submit">Submit</button>
        </form>
    );
}

export default QuestionsForm;
