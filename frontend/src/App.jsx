// src/App.jsx
import { useState, createContext, useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';

// Create a simple auth context
const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [toast, setToast] = useState({ show: false, message: '', type: 'success' });

  const showToast = (message, type = 'success') => {
    setToast({ show: true, message, type });
    setTimeout(() => setToast({ show: false, message: '', type }), 3000);
  };

  const handleLogin = () => {
    setIsAuthenticated(true);
    showToast('Login successful!', 'success');
  };

  const handleLogout = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/v1/auth/logout', {
        method: 'POST',
        credentials: 'include'
      });
      if (res.ok) {
        setIsAuthenticated(false);
        showToast('Logged out successfully', 'info');
      }
    } catch (err) {
      showToast('Logout failed', 'error');
    }
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login: handleLogin, logout: handleLogout, showToast }}>
      <Router>
        <div className="min-h-screen bg-gray-50">
          {/* Toast */}
          {toast.show && (
            <div
              className={`fixed top-4 right-4 px-4 py-2 rounded shadow-lg text-white z-50 ${
                toast.type === 'error' ? 'bg-red-500' :
                toast.type === 'info' ? 'bg-blue-500' : 'bg-green-500'
              }`}
            >
              {toast.message}
            </div>
          )}

          {/* Navbar */}
          <nav className="bg-white shadow">
            <div className="max-w-6xl mx-auto px-4 py-3 flex justify-between items-center">
              <Link to="/" className="text-xl font-bold text-blue-600">TaskApp</Link>
              <div>
                {isAuthenticated ? (
                  <button
                    onClick={handleLogout}
                    className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                  >
                    Logout
                  </button>
                ) : (
                  <div className="space-x-4">
                    <Link to="/login" className="text-blue-600 hover:underline">Login</Link>
                    <Link to="/register" className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700">Sign Up</Link>
                  </div>
                )}
              </div>
            </div>
          </nav>

          {/* Routes */}
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </div>
      </Router>
    </AuthContext.Provider>
  );
}

export default App;