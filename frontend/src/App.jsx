import { Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Header from './components/Header.jsx';
import Home from './pages/Home.jsx';
import Checkout from './pages/Checkout.jsx';
import Admin from './pages/Admin.jsx';
import ChatWidget from './components/ChatWidget.jsx';
import Pizzas from './pages/Pizzas.jsx';
import Hamburguesas from './pages/Hamburguesas.jsx';
import Empanadas from './pages/Empanadas.jsx';
import Guarniciones from './pages/Guarniciones.jsx';
import Milanesas from './pages/Milanesas.jsx';
import Pastas from './pages/Pastas.jsx';
import { useAuth } from './context/AuthContext.jsx';

const App = () => {
  const { isAuthenticated } = useAuth();

  return (
    <div className="app-shell">
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 1800,
          style: {
            background: '#1e1e1e',
            color: '#fff',
            border: '1px solid #333',
            borderRadius: '10px',
          },
        }}
      />
      <Header />
      <main className="page-container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/pizzas" element={<Pizzas />} />
          <Route path="/hamburguesas" element={<Hamburguesas />} />
          <Route path="/empanadas" element={<Empanadas />} />
          <Route path="/guarniciones" element={<Guarniciones />} />
          <Route path="/milanesas" element={<Milanesas />} />
          <Route path="/pastas" element={<Pastas />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route
            path="/admin"
            element={isAuthenticated ? <Admin /> : <Navigate to="/" replace />}
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
      <ChatWidget />
    </div>
  );
};

export default App;
