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

    const handleChange = (e) => {
        const { name, value, checked } = e.target;

        // Check if the field should be treated as an array (checkboxes)
        if (Array.isArray(preferences[name])) {
            // If checked, add the value to the array, otherwise remove it
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
            // If it's not an array (like scentVibe, age, season), just set the value
            setPreferences((prev) => ({
                ...prev,
                [name]: value,
            }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { favoriteNotes, usualPerfume, scentVibe, scentCategory, age, season } = preferences;

        // Basic validation: Check if any required fields are missing
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

        const token = localStorage.getItem('token');

        try {
            const response = await fetch('http://localhost:7777/preferences', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(preferences),
            });

            if (response.ok) {
                navigate('/match-feedback'); // Navigate to match-feedback page after successful submission
            } else {
                alert('Error saving preferences');
            }
        } catch (error) {
            console.error('Error:', error);
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
                    Floral
                </label>
                <label>
                    <input
                        type="checkbox"
                        value="Woody"
                        name="favoriteNotes"
                        onChange={handleChange}
                    />
                    Woody
                </label>
                <label>
                    <input
                        type="checkbox"
                        value="Fresh"
                        name="favoriteNotes"
                        onChange={handleChange}
                    />
                    Fresh
                </label>
                <label>
                    <input
                        type="checkbox"
                        value="Oriental"
                        name="favoriteNotes"
                        onChange={handleChange}
                    />
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
                    Chanel No. 5
                </label>
                <label>
                    <input
                        type="checkbox"
                        value="Dior Sauvage"
                        name="usualPerfume"
                        onChange={handleChange}
                    />
                    Dior Sauvage
                </label>
                <label>
                    <input
                        type="checkbox"
                        value="Gucci Bloom"
                        name="usualPerfume"
                        onChange={handleChange}
                    />
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
                    Floral
                </label>
                <label>
                    <input
                        type="checkbox"
                        value="Woody"
                        name="scentCategory"
                        onChange={handleChange}
                    />
                    Woody
                </label>
                <label>
                    <input
                        type="checkbox"
                        value="Fresh"
                        name="scentCategory"
                        onChange={handleChange}
                    />
                    Fresh
                </label>
                <label>
                    <input
                        type="checkbox"
                        value="Oriental"
                        name="scentCategory"
                        onChange={handleChange}
                    />
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
