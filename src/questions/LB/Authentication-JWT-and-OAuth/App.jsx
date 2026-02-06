import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import ProtectedRoute from './components/routes/ProtectedRoute';
import AuthenticatedRoute from './components/routes/AuthenticatedRoute';
import Login from './components/pages/Login';
import Dashboard from './components/pages/Dashboard';
import About from './components/pages/About';
import './styles.css';

const App = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route
            path='/login'
            element={
              <AuthenticatedRoute>
                <Login />
              </AuthenticatedRoute>
            }
          />
          <Route path='/about-us' element={<About />} />
          <Route
            path='/dashboard'
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route path='/' element={<Navigate to='/dashboard' />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
};

export default App;
