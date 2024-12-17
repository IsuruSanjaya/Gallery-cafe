import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import MenuPage from './pages/MenuPage';
import ReservationsPage from './pages/ReservationsPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import Navbar from './components/Navbar';
import AddMenu from './pages/AddMenu ';
import Reservations from './pages/AllReservation';
import ProtectedRoute from './security/ProtectedRoute'; // Import the ProtectedRoute
import Footer from './components/footer';

function App() {
    return (
        <Router>
            <Navbar />
            <Routes>
                {/* Public Routes */}
                <Route path="/" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />

                {/* Protected Routes */}
                <Route
                    path="/home"
                    element={
                        <ProtectedRoute>
                            <HomePage />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/menu"
                    element={
                        <ProtectedRoute>
                            <MenuPage />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/reservations"
                    element={
                        <ProtectedRoute>
                            <ReservationsPage />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/addmenu"
                    element={
                        <ProtectedRoute>
                            <AddMenu />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/allreservation"
                    element={
                        <ProtectedRoute>
                            <Reservations />
                        </ProtectedRoute>
                    }
                />
            </Routes>
            <Footer />

        </Router>
    );
}

export default App;
