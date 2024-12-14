import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar'; // Import the Navbar component
import WelcomePage from './components/WelcomePage';
import LoginForm from './components/LoginForm';
import SignupForm from './components/SignupForm';
import QuestionsForm from './components/QuestionsForm';
import MatchFeedbackPage from './components/MatchFeedbackPage'; // Import the MatchFeedbackPage component
import './App.css';

function App() {
    return (
        <Router>
            <Navbar />  {/* Add Navbar component here */}
            <Routes>
                <Route path="/" element={<WelcomePage />} />
                <Route path="/login" element={<LoginForm />} />
                <Route path="/signup" element={<SignupForm />} />
                <Route path="/questions" element={<QuestionsForm />} />
                <Route path="/match-feedback" element={<MatchFeedbackPage />} />  {/* Updated route */}
            </Routes>
        </Router>
    );
}

export default App;
