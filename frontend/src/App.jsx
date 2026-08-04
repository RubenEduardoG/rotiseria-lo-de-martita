import { Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/Header.jsx';
import Home from './pages/Home.jsx';
import Checkout from './pages/Checkout.jsx';
import Admin from './pages/Admin.jsx';
import { useAuth } from './context/AuthContext.jsx';

const App = () => {
  const { isAuthenticated } = useAuth();

  return (
    <div className="app-shell">
      <Header />
      <main className="page-container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route
            path="/admin"
            element={isAuthenticated ? <Admin /> : <Navigate to="/" replace />}
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
    </div>
  );
};

export default App;
