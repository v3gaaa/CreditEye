import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Dashboard from './pages/Dashboard';
import ApplicationReview from './pages/ApplicationReview';
import UserProfile from './pages/UserProfile';
import DocumentUpload from './pages/DocumentUpload';
import OnboardingGuide from './components/OnboardingGuide';
import AddCreditRequest from './pages/AddCreditRequest';

export default function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen bg-gray-100">
        <Header />
        <main className="flex-grow container mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/application/:id" element={<ApplicationReview />} />
            <Route path="/profile" element={<UserProfile />} />
            <Route path="/upload" element={<DocumentUpload />} />
            <Route path="/add-credit-request" element={<AddCreditRequest />} />
          </Routes>
        </main>
        <Footer />
        <OnboardingGuide />
      </div>
    </Router>
  );
}
