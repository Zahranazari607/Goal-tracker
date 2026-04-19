import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

// Context Providers
import { SettingsProvider } from './context/SettingsContext';
import { GoalProvider } from './context/GoalContext';

// Components & Layout
import Layout from './components/Layout';
import LoginPage from './pages/LoginPage';

// Pages
import Dashboard from './pages/Dashboard';
import GoalsList from './pages/GoalsList';
import NewGoal from './pages/NewGoal';
import GoalDetails from './pages/GoalDetails';
import Categories from './pages/Categories';
import Settings from './pages/Settings';
import NotFound from './pages/NotFound';

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      const parsedUser = JSON.parse(savedUser);
      if (parsedUser.isLoggedIn) {
        setUser(parsedUser);
      }
    }
    setLoading(false);
  }, []);

  const handleLogout = () => {
    const savedUser = JSON.parse(localStorage.getItem('user'));
    const loggedOutUser = { ...savedUser, isLoggedIn: false };
    localStorage.setItem('user', JSON.stringify(loggedOutUser));
    setUser(null);
  };

  if (loading) return null;

  return (
    <SettingsProvider>
      <GoalProvider>
        <BrowserRouter>
          {!user ? (
            <Routes>
              <Route path="*" element={<LoginPage onLogin={(userData) => setUser(userData)} />} />
            </Routes>
          ) : (
            <Layout user={user} onLogout={handleLogout}>
              <Routes>
                <Route path="/" element={<Navigate to="/dashboard" />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/goals" element={<GoalsList user={user} />} />
                <Route path="/goals/new" element={<NewGoal />} />
                <Route path="/goals/:id" element={<GoalDetails />} />
                <Route path="/goals/:id/edit" element={<NewGoal />} /> 
                <Route path="/categories" element={<Categories />} />
                <Route path="/settings" element={<Settings />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Layout>
          )}
        </BrowserRouter>
      </GoalProvider>
    </SettingsProvider>
  );
}

export default App;